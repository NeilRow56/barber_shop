import { User } from '@prisma/client'

export function combineName(user: User) {
  const { firstName, lastName } = user
  return `${firstName} ${lastName}`
}
