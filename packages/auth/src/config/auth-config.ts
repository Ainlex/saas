import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { prisma } from '@contafacil/database'
import bcrypt from 'bcryptjs';

// Extender tipos de NextAuth
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

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        
        try {
          // VALIDAR: Verificar que prisma.usuario exista antes de usar
          if (!prisma.usuario) {
            throw new Error('prisma.usuario no existe')
          }
          
          const usuario = await prisma.usuario.findUnique({
            where: { email: credentials.email },
            include: { 
              empresa: true,
              rol: true 
            }
          })

          if (!usuario) {
            return null;
          }
          
          if (!usuario.activo) {
            return null;
          }

          // 🚨 Validar empresa activa
          if (!usuario.empresa?.activo) {
            return null;
          }

          // ✅ Validar password con bcrypt
          const validPassword = await bcrypt.compare(credentials.password, usuario.password);
          if (!validPassword) {
            return null;
          }
          return {
            id: usuario.id,
            email: usuario.email,
            name: usuario.nombre,
            empresaId: usuario.empresaId,
            rol: usuario.rol.nombre
          }
        } catch (error) {
          console.error('💥 Error en authorize:', error);
          throw error;
        }
      }
    })
  ],
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.empresaId = user.empresaId
        token.rol = user.rol
      }
      return token
    },
    async session({ session, token }) {
      const email = session.user.email || '';
      const usuario = await prisma.usuario.findUnique({
        where: { email },
        include: { empresa: true, rol: true }
      }) as import('@contafacil/database').UserWithEmpresa | null;
      if (!usuario || !usuario.empresa || !usuario.empresa.activo) {
        throw new Error('Empresa no activa');
      }
      session.user.empresaId = usuario.empresaId;
      session.user.rol = usuario.rol?.nombre || '';
      return session;
    }
  },
  pages: {
    signIn: '/login'
  }
} 