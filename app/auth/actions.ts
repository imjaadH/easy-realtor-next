'use server'
import { redirect } from 'next/navigation'
import bcrypt from 'bcrypt'
import { prisma } from '@/lib/prisma'

export type ActionResponse = {
  message: string
  type: 'success' | 'error'
  data?: string
  error?: string
}

const createUser = async (formData: any): Promise<ActionResponse> => {
  const { email, password } = formData
  try {
    const existingUser = await prisma.user.findFirst({
      where: {
        email: email as string,
      },
    })

    if (existingUser) {
      return {
        error: 'Failed to perform this action',
        message: 'this user already exists',
        type: 'error',
      }
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    await prisma.user.create({
      data: { email, name: email.split('@')[0], password: hashedPassword },
    })
    return {
      message: 'User created successfully',
      type: 'success',
    }
  } catch (error) {
    return {
      error: 'Failed to perform this action',
      message: 'Failed to create user',
      type: 'error',
    }
  }
}

export { createUser }
