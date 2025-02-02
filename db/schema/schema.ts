import { sql } from 'drizzle-orm'
import type { AdapterAccountType } from 'next-auth/adapters'

import {
  pgSchema,
  text,
  integer,
  primaryKey,
  timestamp,
  boolean,
} from 'drizzle-orm/pg-core'
import * as t from 'drizzle-orm/pg-core'
import { timestamps } from '../helpers'

export const base = pgSchema('drizzle')
export const propertyStatus = t.pgEnum('property_status', [
  'Active',
  'Maintenance',
  'Rented',
  'Sold',
])

export const users = base.table('user', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text('name'),
  email: text('email').unique(),
  emailVerified: timestamp('emailVerified', { mode: 'date' }),
  image: text('image'),
  ...timestamps,
})

export const accounts = base.table(
  'account',
  {
    userId: text('userId')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    type: text('type').$type<AdapterAccountType>().notNull(),
    provider: text('provider').notNull(),
    providerAccountId: text('providerAccountId').notNull(),
    refresh_token: text('refresh_token'),
    access_token: text('access_token'),
    expires_at: integer('expires_at'),
    token_type: text('token_type'),
    scope: text('scope'),
    id_token: text('id_token'),
    session_state: text('session_state'),
  },
  account => [
    {
      compoundKey: primaryKey({
        columns: [account.provider, account.providerAccountId],
      }),
    },
  ],
)

export const sessions = base.table('session', {
  sessionToken: text('sessionToken').primaryKey(),
  userId: text('userId')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  expires: timestamp('expires', { mode: 'date' }).notNull(),
})

export const verificationTokens = base.table(
  'verificationToken',
  {
    identifier: text('identifier').notNull(),
    token: text('token').notNull(),
    expires: timestamp('expires', { mode: 'date' }).notNull(),
  },
  verificationToken => [
    {
      compositePk: primaryKey({
        columns: [verificationToken.identifier, verificationToken.token],
      }),
    },
  ],
)

export const authenticators = base.table(
  'authenticator',
  {
    credentialID: text('credentialID').notNull().unique(),
    userId: text('userId')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    providerAccountId: text('providerAccountId').notNull(),
    credentialPublicKey: text('credentialPublicKey').notNull(),
    counter: integer('counter').notNull(),
    credentialDeviceType: text('credentialDeviceType').notNull(),
    credentialBackedUp: boolean('credentialBackedUp').notNull(),
    transports: text('transports'),
  },
  authenticator => [
    {
      compositePK: primaryKey({
        columns: [authenticator.userId, authenticator.credentialID],
      }),
    },
  ],
)
export const clients = base.table('clients', {
  id: t
    .uuid()
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  full_name: t.varchar({ length: 50 }).notNull(),
  email_address: t.varchar().unique(),
  contact: t.varchar(),
  manager: t.text().references(() => users.id),
  ...timestamps,
})

export const property = base.table('property', {
  id: t
    .uuid()
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  type: t.varchar().notNull(),
  name: t.varchar(),
  location: t.varchar().notNull(),
  rent_per_month: t.numeric({ precision: 2 }).default('0.00'),
  rent_cycle: t.integer().default(30),
  property_value: t.decimal({ precision: 1 }),
  status: propertyStatus().default('Active'),
  user_id: t.text().references(() => users.id),
  ...timestamps,
})

export const gallery = base.table('gallery', {
  id: t.serial().primaryKey(),
  parent_id: t.text().default(sql`gen_random_uuid()`),
  path: t.text().notNull(),
  ...timestamps,
})

export const payments = base.table('payments', {
  id: t
    .uuid()
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  amount: t.numeric({ precision: 2 }).notNull(),
  user_id: t.text().references(() => users.id),
  contract_id: t.text(),
  ...timestamps,
})
