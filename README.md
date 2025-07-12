# SmashLabs - Themed Rage Room Experience

A Next.js application for SmashLabs, featuring themed rage rooms with immersive physics-based experiences.

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/Blackbird-71-ux/Smashlabs.git
cd Smashlabs
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set Up Environment Variables
```bash
# Copy the template file
cp dev.env.template dev.env

# Edit dev.env with your actual credentials
# IMPORTANT: Never commit dev.env to git!
```

### 4. Run the Development Server
```bash
npm run dev
```

## 🔒 Security & Environment Variables

### ⚠️ IMPORTANT: Never commit secrets to git!

1. **Use the template**: Copy `dev.env.template` to `dev.env`
2. **Fill in your credentials**: Add your real database URLs, API keys, etc.
3. **Keep it private**: The `dev.env` file is gitignored and should never be committed

### Required Environment Variables

```env
# Database
MONGODB_URI=your-mongodb-connection-string

# Authentication
JWT_SECRET=your-super-secure-jwt-secret-minimum-32-characters
API_SECRET_KEY=your-api-secret-key

# Email (optional)
EMAIL_HOST=your-email-host
EMAIL_USER=your-email
EMAIL_PASS=your-email-password
```

### MongoDB Atlas Setup

1. Create a free MongoDB Atlas account
2. Create a new cluster
3. Create a database user with read/write permissions
4. Get your connection string from the "Connect" button
5. Replace `YOUR_DB_USER`, `YOUR_DB_PASSWORD`, and `YOUR_CLUSTER` in the connection string

## 🎮 Features

- **Theory of Relativity Room**: Physics-themed rage room with black hole effects
- **Quantum Theory Room**: Subatomic particle collision chamber
- **Cyberpunk Dystopian Room**: Neon-soaked corporate rebellion experience
- **Responsive Design**: Works on all devices
- **Booking System**: Integrated booking and contact forms

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: JWT

## 📝 License

This project is licensed under the MIT License.

## 🔧 Development

### Project Structure
```
src/
├── app/                 # Next.js app router pages
├── components/          # React components
├── lib/                # Utility functions
└── types/              # TypeScript types
```

### Available Scripts

```bash
npm run dev         # Start development server
npm run build       # Build for production
npm run start       # Start production server
npm run lint        # Run ESLint
npm test           # Run tests
```

## 🚀 Deployment

See `DEPLOYMENT_GUIDE.md` for detailed deployment instructions.

**Remember**: Always use environment variables for sensitive data and never commit secrets to your repository! 
