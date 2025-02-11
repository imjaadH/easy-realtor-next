'use server'

import { ActionResponse } from '@/app/auth/actions'
import { prisma } from '@/lib/prisma'
import { createClientSchema } from '@/schemas'
import { revalidatePath } from 'next/cache'

const getClientDetails = async (id: string) => {
  return await prisma.clients.findUnique({
    where: {
      id,
    },
  })
}

const getClients = async (creator: string, limit?: number) => {
  return prisma.clients.findMany({
    where: {
      manager: creator,
    },
    take: limit ?? 5,
    orderBy: {
      createdAt: 'desc',
    },
  })
}

const createClient = async (data: any): Promise<ActionResponse> => {
  try {
    const validation = createClientSchema.safeParse(data)
    console.log(validation)

    if (validation.success) {
      const response = await prisma.clients.create({
        data: validation.data,
      })
      revalidatePath('/clients')
      return {
        type: 'success',
        message: 'Client created successfully',
      }
    }

    return {
      message: 'Unble to create client',
      error: 'validation failed',
      type: 'error',
    }
  } catch (error) {
    console.log(error)

    return {
      message: 'Unble to create client',
      error: 'Unable to create client',
      type: 'error',
    }
  }
}

export { getClientDetails, getClients, createClient }
