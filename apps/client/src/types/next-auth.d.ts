import 'next-auth'

declare module "next-auth" {
  interface User {
    empresaId?: string
    rol?: string
  }
  
  interface Session {
    user: {
      id?: string
      name?: string | null
      email?: string | null
      image?: string | null
      empresaId?: string
      rol?: string
    }
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    empresaId?: string
    rol?: string
  }
} 