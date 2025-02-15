import { Types } from '@/types'
import { z } from 'zod'

export const credentialUserSchema = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .min(1, 'Email is required')
    .email('Invalid email'),
  password: z
    .string({ required_error: 'Password is required' })
    .min(1, 'Password is required')
    .min(8, 'Password must be more than 8 characters')
    .max(32, 'Password must be less than 32 characters'),
})

export const createAssetSchema = z.object({
  userId: z.string().optional(),
  type: z.nativeEnum(Types.PropertyType),
  name: z.string().min(5),
  location: z.string().min(5),
  propertyValue: z.coerce.number().optional(),
  rentCycle: z.number().optional(),
  status: z.nativeEnum(Types.PropertyStatus).optional(),
})

export const createClientSchema = z.object({
  name: z.string().min(5),
  email: z.string().email(),
  contact: z.string().min(5),
  manager: z.string().optional(),
})

export const createContractSchema = z.object({
  clientId: z.string(),
  createdBy: z.string().optional(),
  propertyId: z.string(),
  startDate: z.date(),
  endDate: z.date(),
  description: z.string(),
  costPerMonth: z.coerce.number().optional(),
})

export const createPaymentSchema = z.object({
  amount: z.coerce.number({ required_error: 'amount is required' }),
  userId: z.string().optional(),
  contractId: z.string({ required_error: 'valid contract is required' }),
})
