import NextAuth from 'next-auth'
import { authOptions } from '@contafacil/auth/config'

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST } 