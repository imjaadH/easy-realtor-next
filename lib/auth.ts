import NextAuth, { NextAuthConfig } from 'next-auth'
import Google from 'next-auth/providers/google'
import GitHub from 'next-auth/providers/github'
import Credentials from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@auth/prisma-adapter'
import bcrypt from 'bcrypt'

import { prisma } from './prisma'

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },

      authorize: async credentials => {
        let user = null
        const { email, password } = credentials

        var result = await prisma.user.findFirst({
          where: {
            email: email as string,
          },
        })
        user = result

        if (!user) {
          // No user found, so this is their first attempt to login
          throw new Error('Invalid credentials.')
        }

        const passwordMatched = await bcrypt.compare(
          password as string,
          user.password!,
        )
        if (!passwordMatched) {
          throw new Error('Invalid credentials.')
        }
        return user
      },
    }),
    GitHub,
    Google({
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
        },
      },
    }),
  ],

  callbacks: {
    async signIn({ profile, account, user }) {
      // create new database user for new social signups
      console.log(profile)
      console.log(user)

      return true
    },
    async session({ session, token }) {
      return { ...session, id: token.sub }
    },
  },
})
