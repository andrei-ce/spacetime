import { cookies } from 'next/headers'
import decode from 'jwt-decode'

interface User {
  sub: string
  name: string
  avatarUrl: string
}

export default function getUser(): User {
  const token = cookies().get('NWLtoken')?.value

  if (!token) {
    throw new Error('Unauthenticated')
  }

  const user: User = decode(token)
  return user
}
