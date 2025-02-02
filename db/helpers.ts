import { timestamp } from 'drizzle-orm/pg-core'
import { sql } from 'drizzle-orm'

export const timestamps = {
  updated_at: timestamp()
    .defaultNow()
    .$onUpdate(() => sql`now()`),
  created_at: timestamp().defaultNow().notNull(),
}

export const propertyTypes = [
  'Condo',
  'Apartment',
  'Duplex',
  'Townhouse',
  'Studio',
  'Penthouse',
  'Mansion',
  'Single-Family Home',
]
