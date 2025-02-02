import NextAuth, { NextAuthConfig } from 'next-auth'
import { ZodError } from 'zod'
import Google from 'next-auth/providers/google'
import GitHub from 'next-auth/providers/github'
import Credentials from 'next-auth/providers/credentials'
import { DrizzleAdapter } from '@auth/drizzle-adapter'

import { signInSchema } from '@/schemas'
import { db } from '@/db'
import {
  accounts,
  users,
  sessions,
  verificationTokens,
} from '@/db/schema/schema'

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }),
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
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
