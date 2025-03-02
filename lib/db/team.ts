import 'server-only'
import { prisma } from './prisma'

export async function getTeam(limit?: number) {
  return await prisma.provider.findMany({
    include: { user: true },
    orderBy: { createdAt: 'desc' },
    ...(limit ? { take: limit } : {})
  })
}
