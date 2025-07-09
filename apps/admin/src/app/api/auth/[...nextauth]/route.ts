import NextAuth from 'next-auth'
import { authOptions } from '@contafacil/auth/config'

const handler = NextAuth({
  ...authOptions,
  cookies: {
    sessionToken: {
      name: 'contafacil-admin-session',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
      }
    }
  }
})

export { handler as GET, handler as POST } 