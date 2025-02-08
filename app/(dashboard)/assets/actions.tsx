'use server'

import { ActionResponse } from '@/app/auth/actions'
import { prisma } from '@/lib/prisma'
import { createAssetSchema } from '@/schemas'
import { revalidatePath } from 'next/cache'

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

export { createAsset }
