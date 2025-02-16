'use server'

import { ActionResponse } from '@/app/auth/actions'
import { prisma } from '@/lib/prisma'
import { createContractSchema } from '@/schemas'
import { Types } from '@/types'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

const getAssetContracts = async (assetId: string, limit?: number) => {
  return prisma.contract.findMany({
    where: {
      propertyId: assetId,
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: limit ?? 5,
    include: {
      client: true,
    },
  })
}

const getAllContracts = async (userId: string, limit?: number) => {
  return prisma.contract.findMany({
    where: { createdBy: userId },
    take: limit ?? 10,
    include: {
      client: true,
      property: true,
    },
  })
}

const createContract = async (data: any): Promise<ActionResponse> => {
  try {
    const validation = createContractSchema.safeParse(data)

    if (validation.success) {
      const response = await prisma.contract.create({
        data: { ...validation.data, createdBy: data.createdBy },
      })
      await prisma.property.update({
        where: {
          id: validation.data.propertyId,
        },
        data: {
          status: 'Rented',
        },
      })
      revalidatePath('/contracts')
      return {
        type: 'success',
        message: 'Contract created successfully',
        data: response.id,
      }
    }
    return {
      message: 'Error: validation error',
      type: 'error',
    }
  } catch (error) {
    return {
      type: 'error',
      error: 'Prisma error',
      message: 'Prisma error',
    }
  }
}

const editContract = async (data: any, id: string): Promise<ActionResponse> => {
  try {
    const validation = createContractSchema.safeParse(data)

    if (validation.success) {
      const response = await prisma.contract.update({
        where: {
          id,
        },
        data: { ...validation.data, createdBy: data.createdBy },
      })

      revalidatePath('/contracts')
      return {
        type: 'success',
        message: 'Contract updated successfully',
        data: response.id,
      }
    }
    return {
      message: 'Error: validation error',
      type: 'error',
    }
  } catch (error) {
    return {
      type: 'error',
      error: 'Prisma error',
      message: 'Prisma error',
    }
  }
}

const updateContractStatus = async (values: {
  id: string
  propertyId: string
  status: Types.ContractStatus
}): Promise<ActionResponse> => {
  try {
    await prisma.contract.update({
      where: {
        id: values.id,
      },
      data: {
        status: values.status,
      },
    })

    await prisma.property.update({
      where: {
        id: values.propertyId,
      },
      data: {
        status: 'Active',
      },
    })

    revalidatePath('/contracts')

    return {
      type: 'success',
      message: 'contract updated successfully',
    }
  } catch (error) {
    return {
      error: 'Prisma error',
      type: 'error',
      message: 'unable to update contract',
    }
  }
}

export {
  getAssetContracts,
  getAllContracts,
  createContract,
  editContract,
  updateContractStatus,
}
