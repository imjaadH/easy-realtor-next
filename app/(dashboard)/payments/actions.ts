'use server'
import { ActionResponse } from '@/app/auth/actions'
import { prisma } from '@/lib/prisma'
import { createPaymentSchema } from '@/schemas'
import { revalidatePath } from 'next/cache'

const getAllPayments = async (userId: string, limit?: number) => {
  return prisma.payment.findMany({
    where: { userId: userId },
    take: limit ?? 10,
    include: {
      contract: {
        include: {
          property: true,
        },
      },
    },
  })
}
const editPayment = async (data: any, id: string): Promise<ActionResponse> => {
  try {
    const validation = createPaymentSchema.safeParse(data)

    if (validation.success) {
      const response = await prisma.payment.update({
        where: {
          id,
        },
        data: { ...validation.data },
      })

      revalidatePath('/payments')
      return {
        type: 'success',
        message: 'Payment updated successfully',
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
const createPayment = async (data: any): Promise<ActionResponse> => {
  try {
    const validation = createPaymentSchema.safeParse(data)
    console.log(validation.data)

    if (validation.success) {
      const response = await prisma.payment.create({
        data: { ...validation.data, userId: validation.data.userId! },
      })
      revalidatePath('/payments')
      return {
        type: 'success',
        message: 'payment created successfully',
        data: response.id,
      }
    }
    return {
      message: 'Error: validation error',
      type: 'error',
    }
  } catch (error) {
    console.log(error)

    return {
      type: 'error',
      error: 'Prisma error',
      message: 'Prisma error',
    }
  }
}

export { createPayment, getAllPayments, editPayment }
