import { defineConfig } from 'drizzle-kit'

require('dotenv').config({
  path: ['.env.local', '.env'],
})

export default defineConfig({
  dialect: 'postgresql',
  schema: './db/schema/schema.ts',

  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
})
