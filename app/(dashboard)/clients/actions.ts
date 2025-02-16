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
const updateClient = async (data: any, id: string): Promise<ActionResponse> => {
  try {
    const validation = createClientSchema.safeParse(data)
    if (validation.success) {
      await prisma.clients.update({
        where: {
          id,
        },
        data: validation.data,
      })

      revalidatePath('/clients')
      return {
        type: 'success',
        message: 'client updated',
      }
    }

    return {
      type: 'error',
      error: 'Validation failed',
      message: 'Error occured',
    }
  } catch (error) {
    return {
      type: 'error',
      error: 'Prisma operation error',
      message: 'Error occured',
    }
  }
}

const getDashboardClients = async (creator: string, limit?: number) => {
  return await prisma.clients.findMany({
    take: limit ?? 5,
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      Contract: {
        take: 1,
        where: {
          status: 'Active',
        },
        include: {
          property: true,
        },
      },
    },
  })
}

export {
  getClientDetails,
  getClients,
  createClient,
  updateClient,
  getDashboardClients,
}
