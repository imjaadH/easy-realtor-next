'use server'

import { ActionResponse } from '@/app/auth/actions'
import { prisma } from '@/lib/prisma'
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

export { getAssetContracts }
