import { prisma } from '@/lib/prisma'

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
  })
}

export { getClientDetails, getClients }
