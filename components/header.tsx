import { checkUser } from '@/lib/check-user'

export default async function Header() {
  const user = await checkUser()

  return null
}
