'use server'

import { ActionResponse } from '@/app/auth/actions'
import { prisma } from '@/lib/prisma'
import { createAssetSchema } from '@/schemas'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

const createAsset = async (data: any): Promise<ActionResponse> => {
  try {
    const validation = createAssetSchema.safeParse(data)

    if (validation.success) {
      const response = await prisma.property.create({
        data: validation.data,
      })
      revalidatePath('/assets')

      return {
        type: 'success',
        message: 'Property created successfully',
        data: response.id,
      }
    }
    return {
      message: 'Error: validation error',
      type: 'error',
    }
  } catch (error) {
    return {
      error: 'Failed to create property',
      message: 'Failed to create property',
      type: 'error',
    }
  }
}
const saveMediaPaths = async (
  data: string[],
  id: string,
): Promise<ActionResponse> => {
  try {
    await Promise.all(
      data.map(async path => {
        const response = await prisma.gallery.create({
          data: {
            parentId: id,
            path: path,
          },
        })
        return response
      }),
    )
    revalidatePath('/assets')
    redirect('/assets')
  } catch (error) {
    return {
      error: 'Failed to save gallery',
      message: 'Failed to save gallery',
      type: 'error',
    }
  }
}

const getAssetDetails = async (id: string) => {
  try {
    const asset = await prisma.property.findFirst({
      where: {
        id,
      },
    })
    const activeTenant = await prisma.contract.findFirst({
      where: {
        status: 'Active',
        propertyId: id,
      },
      include: {
        client: true,
      },
    })
    const images = await prisma.gallery.findMany({
      where: {
        parentId: id,
      },
    })
    return {
      asset,
      images,
      activeTenant,
    }
  } catch (error) {
    return {
      error: 'Failed to get property',
      message: 'Failed to get property',
      type: 'error',
    }
  }
}

const getAllAssets = async (id: string, limit?: number) => {
  return prisma.property.findMany({
    where: {
      userId: id,
    },
    take: limit ?? 10,
    orderBy: {
      updatedAt: 'desc',
    },
  })
}

export { createAsset, saveMediaPaths, getAssetDetails, getAllAssets }
