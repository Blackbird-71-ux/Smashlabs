const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const User = require('../models/User');
const { generateToken, ROLES } = require('../middleware/auth');

// Mock app for testing
const express = require('express');
const authRoutes = require('../routes/auth');
const { requestId, requestLogger } = require('../middleware/requestLogger');

const app = express();
app.use(express.json());
app.use(requestId);
app.use('/api/auth', authRoutes);

// Setup test environment
let mongoServer;

beforeAll(async () => {
  // Start in-memory MongoDB instance
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  
  // Connect to the in-memory database
  await mongoose.connect(mongoUri);
});

afterAll(async () => {
  // Cleanup and close connections
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
});

beforeEach(async () => {
  // Clear all collections before each test
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany({});
  }
});

describe('Authentication API', () => {
  const testUser = {
    name: 'Test User',
    email: 'test@example.com',
    password: 'TestPassword123!',
    confirmPassword: 'TestPassword123!',
    phone: '1234567890'
  };

  describe('POST /api/auth/register', () => {
    it('should register a new user successfully', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send(testUser)
        .expect(201);

      expect(response.body).toMatchObject({
        success: true,
        message: expect.stringContaining('registered successfully'),
        data: {
          user: {
            name: testUser.name,
            email: testUser.email,
            role: ROLES.CUSTOMER,
            isActive: true,
            isEmailVerified: false
          },
          requiresVerification: true
        }
      });

      // Verify user was created in database
      const user = await User.findOne({ email: testUser.email });
      expect(user).toBeTruthy();
      expect(user.name).toBe(testUser.name);
    });

    it('should reject registration with invalid email', async () => {
      const invalidUser = { ...testUser, email: 'invalid-email' };
      
      const response = await request(app)
        .post('/api/auth/register')
        .send(invalidUser)
        .expect(400);

      expect(response.body).toMatchObject({
        success: false,
        message: 'Validation failed',
        errors: expect.arrayContaining([
          expect.objectContaining({
            msg: 'Please provide a valid email address'
          })
        ])
      });
    });

    it('should reject registration with weak password', async () => {
      const weakPasswordUser = { ...testUser, password: '123', confirmPassword: '123' };
      
      const response = await request(app)
        .post('/api/auth/register')
        .send(weakPasswordUser)
        .expect(400);

      expect(response.body).toMatchObject({
        success: false,
        message: 'Validation failed'
      });
    });

    it('should reject registration with mismatched passwords', async () => {
      const mismatchedUser = { ...testUser, confirmPassword: 'DifferentPassword123!' };
      
      const response = await request(app)
        .post('/api/auth/register')
        .send(mismatchedUser)
        .expect(400);

      expect(response.body).toMatchObject({
        success: false,
        message: 'Validation failed',
        errors: expect.arrayContaining([
          expect.objectContaining({
            msg: 'Passwords do not match'
          })
        ])
      });
    });

    it('should reject duplicate email registration', async () => {
      // First registration
      await request(app)
        .post('/api/auth/register')
        .send(testUser)
        .expect(201);

      // Attempt duplicate registration
      const response = await request(app)
        .post('/api/auth/register')
        .send(testUser)
        .expect(409);

      expect(response.body).toMatchObject({
        success: false,
        message: 'User with this email already exists'
      });
    });
  });

  describe('POST /api/auth/login', () => {
    beforeEach(async () => {
      // Create a test user before each login test
      const user = new User(testUser);
      await user.save();
    });

    it('should login successfully with valid credentials', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: testUser.email,
          password: testUser.password
        })
        .expect(200);

      expect(response.body).toMatchObject({
        success: true,
        message: 'Login successful',
        data: {
          user: {
            email: testUser.email,
            name: testUser.name,
            role: ROLES.CUSTOMER
          },
          accessToken: expect.any(String),
          refreshToken: expect.any(String),
          expiresIn: '15m'
        }
      });

      // Verify tokens are valid
      expect(response.body.data.accessToken).toMatch(/^eyJ/); // JWT format
      expect(response.body.data.refreshToken).toMatch(/^eyJ/); // JWT format
    });

    it('should reject login with invalid email', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'nonexistent@example.com',
          password: testUser.password
        })
        .expect(401);

      expect(response.body).toMatchObject({
        success: false,
        message: 'Invalid credentials'
      });
    });

    it('should reject login with invalid password', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: testUser.email,
          password: 'wrongpassword'
        })
        .expect(401);

      expect(response.body).toMatchObject({
        success: false,
        message: 'Invalid credentials'
      });
    });

    it('should increment login attempts on failed login', async () => {
      // Make multiple failed login attempts
      for (let i = 0; i < 3; i++) {
        await request(app)
          .post('/api/auth/login')
          .send({
            email: testUser.email,
            password: 'wrongpassword'
          })
          .expect(401);
      }

      const user = await User.findOne({ email: testUser.email }).select('+loginAttempts');
      expect(user.loginAttempts).toBe(3);
    });

    it('should lock account after 5 failed attempts', async () => {
      // Make 5 failed login attempts
      for (let i = 0; i < 5; i++) {
        await request(app)
          .post('/api/auth/login')
          .send({
            email: testUser.email,
            password: 'wrongpassword'
          });
      }

      // Next attempt should return account locked error
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: testUser.email,
          password: testUser.password // Even with correct password
        })
        .expect(423);

      expect(response.body).toMatchObject({
        success: false,
        message: expect.stringContaining('Account temporarily locked')
      });
    });

    it('should reject login for inactive user', async () => {
      // Deactivate user
      await User.findOneAndUpdate(
        { email: testUser.email },
        { isActive: false }
      );

      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: testUser.email,
          password: testUser.password
        })
        .expect(401);

      expect(response.body).toMatchObject({
        success: false,
        message: 'Account is inactive'
      });
    });
  });

  describe('POST /api/auth/refresh', () => {
    let refreshToken;
    let user;

    beforeEach(async () => {
      // Create user and login to get refresh token
      user = new User(testUser);
      await user.save();

      const loginResponse = await request(app)
        .post('/api/auth/login')
        .send({
          email: testUser.email,
          password: testUser.password
        });

      refreshToken = loginResponse.body.data.refreshToken;
    });

    it('should refresh access token successfully', async () => {
      const response = await request(app)
        .post('/api/auth/refresh')
        .send({ refreshToken })
        .expect(200);

      expect(response.body).toMatchObject({
        success: true,
        message: 'Token refreshed successfully',
        data: {
          accessToken: expect.any(String),
          expiresIn: '15m'
        }
      });

      // New token should be different
      expect(response.body.data.accessToken).toMatch(/^eyJ/);
    });

    it('should reject refresh with invalid token', async () => {
      const response = await request(app)
        .post('/api/auth/refresh')
        .send({ refreshToken: 'invalid-token' })
        .expect(401);

      expect(response.body).toMatchObject({
        success: false,
        message: 'Invalid refresh token'
      });
    });

    it('should reject refresh without token', async () => {
      const response = await request(app)
        .post('/api/auth/refresh')
        .send({})
        .expect(401);

      expect(response.body).toMatchObject({
        success: false,
        message: 'Refresh token required'
      });
    });
  });

  describe('POST /api/auth/logout', () => {
    let accessToken;
    let refreshToken;

    beforeEach(async () => {
      // Create user and login
      const user = new User(testUser);
      await user.save();

      const loginResponse = await request(app)
        .post('/api/auth/login')
        .send({
          email: testUser.email,
          password: testUser.password
        });

      accessToken = loginResponse.body.data.accessToken;
      refreshToken = loginResponse.body.data.refreshToken;
    });

    it('should logout successfully', async () => {
      const response = await request(app)
        .post('/api/auth/logout')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ refreshToken })
        .expect(200);

      expect(response.body).toMatchObject({
        success: true,
        message: 'Logout successful'
      });
    });

    it('should require authentication for logout', async () => {
      const response = await request(app)
        .post('/api/auth/logout')
        .send({ refreshToken })
        .expect(401);

      expect(response.body).toMatchObject({
        success: false,
        message: 'Access token required'
      });
    });
  });

  describe('GET /api/auth/profile', () => {
    let accessToken;
    let user;

    beforeEach(async () => {
      // Create user and login
      user = new User(testUser);
      await user.save();

      const loginResponse = await request(app)
        .post('/api/auth/login')
        .send({
          email: testUser.email,
          password: testUser.password
        });

      accessToken = loginResponse.body.data.accessToken;
    });

    it('should get user profile successfully', async () => {
      const response = await request(app)
        .get('/api/auth/profile')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200);

      expect(response.body).toMatchObject({
        success: true,
        data: {
          name: testUser.name,
          email: testUser.email,
          role: ROLES.CUSTOMER,
          isActive: true
        }
      });

      // Should not include sensitive fields
      expect(response.body.data).not.toHaveProperty('password');
      expect(response.body.data).not.toHaveProperty('refreshTokens');
    });

    it('should require authentication for profile', async () => {
      const response = await request(app)
        .get('/api/auth/profile')
        .expect(401);

      expect(response.body).toMatchObject({
        success: false,
        message: 'Access token required'
      });
    });

    it('should reject invalid token', async () => {
      const response = await request(app)
        .get('/api/auth/profile')
        .set('Authorization', 'Bearer invalid-token')
        .expect(403);

      expect(response.body).toMatchObject({
        success: false,
        message: 'Invalid or expired token'
      });
    });
  });

  describe('Rate Limiting', () => {
    it('should enforce rate limits on registration', async () => {
      // Make multiple registration attempts quickly
      const promises = [];
      for (let i = 0; i < 6; i++) {
        promises.push(
          request(app)
            .post('/api/auth/register')
            .send({
              ...testUser,
              email: `test${i}@example.com`
            })
        );
      }

      const responses = await Promise.all(promises);
      
      // At least one should be rate limited
      const rateLimitedResponses = responses.filter(res => res.status === 429);
      expect(rateLimitedResponses.length).toBeGreaterThan(0);
    });
  });
});

describe('User Model', () => {
  const userData = {
    name: 'Test User',
    email: 'test@example.com',
    password: 'TestPassword123!',
    role: ROLES.CUSTOMER
  };

  it('should hash password before saving', async () => {
    const user = new User(userData);
    await user.save();

    expect(user.password).not.toBe(userData.password);
    expect(user.password).toMatch(/^\$2[ab]\$12\$/); // bcrypt hash pattern
  });

  it('should compare passwords correctly', async () => {
    const user = new User(userData);
    await user.save();

    const isValid = await user.comparePassword(userData.password);
    const isInvalid = await user.comparePassword('wrongpassword');

    expect(isValid).toBe(true);
    expect(isInvalid).toBe(false);
  });

  it('should generate verification token', async () => {
    const user = new User(userData);
    const token = user.generateEmailVerificationToken();

    expect(token).toBeTruthy();
    expect(typeof token).toBe('string');
    expect(token.length).toBe(64); // 32 bytes in hex
    expect(user.emailVerificationToken).toBe(token);
    expect(user.emailVerificationExpires).toBeInstanceOf(Date);
  });

  it('should generate password reset token', async () => {
    const user = new User(userData);
    const token = user.generatePasswordResetToken();

    expect(token).toBeTruthy();
    expect(typeof token).toBe('string');
    expect(token.length).toBe(64); // 32 bytes in hex
    expect(user.passwordResetToken).toBe(token);
    expect(user.passwordResetExpires).toBeInstanceOf(Date);
  });

  it('should manage refresh tokens', async () => {
    const user = new User(userData);
    await user.save();

    const token1 = 'refresh_token_1';
    const token2 = 'refresh_token_2';

    // Add tokens
    await user.addRefreshToken(token1);
    await user.addRefreshToken(token2);

    expect(user.refreshTokens).toHaveLength(2);
    expect(user.refreshTokens.some(t => t.token === token1)).toBe(true);
    expect(user.refreshTokens.some(t => t.token === token2)).toBe(true);

    // Remove specific token
    await user.removeRefreshToken(token1);
    expect(user.refreshTokens).toHaveLength(1);
    expect(user.refreshTokens.some(t => t.token === token1)).toBe(false);

    // Remove all tokens
    await user.removeAllRefreshTokens();
    expect(user.refreshTokens).toHaveLength(0);
  });

  it('should find user by email', async () => {
    const user = new User(userData);
    await user.save();

    const foundUser = await User.findByEmail(userData.email);
    expect(foundUser).toBeTruthy();
    expect(foundUser.email).toBe(userData.email);

    const notFound = await User.findByEmail('nonexistent@example.com');
    expect(notFound).toBeNull();
  });
}); 