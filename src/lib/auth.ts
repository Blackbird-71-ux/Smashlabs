import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { connectDB } from './mongodb'
const User = require('../../models/User')

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        await connectDB()
        
        const user = await User.findOne({ email: credentials.email })
        
        if (!user) {
          return null
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password as string
        )

        if (!isPasswordValid) {
          return null
        }

        return {
          id: user._id.toString(),
          email: user.email as string,
          name: user.name as string
        }
      }
    })
  ],
  session: {
    strategy: 'jwt' as const,
  },
  pages: {
    signIn: '/auth/signin',
    signUp: '/auth/signup',
  },
  secret: process.env.NEXTAUTH_SECRET,
}

export default NextAuth(authOptions)