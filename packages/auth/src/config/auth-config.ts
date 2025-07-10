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
        console.log('🔑 Intentando login con:', credentials);

        if (!credentials?.email || !credentials?.password) {
          console.log('❌ Faltan credenciales');
          return null;
        }
        
        try {
          // VALIDAR: Verificar que prisma.usuario exista antes de usar
          if (!prisma.usuario) {
            console.log('❌ prisma.usuario no existe');
            throw new Error('prisma.usuario no existe')
          }
          
          console.log('🔍 Buscando usuario con email:', credentials.email);
          const usuario = await prisma.usuario.findUnique({
            where: { email: credentials.email },
            include: { 
              empresa: true,
              rol: true 
            }
          })
          
          console.log('👤 Usuario encontrado:', usuario);

          if (!usuario) {
            console.log('❌ Usuario no encontrado');
            return null;
          }
          
          if (!usuario.activo) {
            console.log('❌ Usuario inactivo');
            return null;
          }

          // 🚨 Validar empresa activa
          if (!usuario.empresa?.activo) {
            console.log('❌ Empresa inactiva');
            return null;
          }

          // ✅ Validar password con bcrypt
          const validPassword = await bcrypt.compare(credentials.password, usuario.password);
          if (!validPassword) {
            console.log('❌ Contraseña incorrecta');
            return null;
          }
          
          console.log('✅ Usuario y contraseña válidos, retornando datos');
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
      console.log('🛡️ [SESSION CALLBACK] Email:', email);
      console.log('🛡️ [SESSION CALLBACK] Usuario:', usuario);
      console.log('🛡️ [SESSION CALLBACK] Empresa:', usuario?.empresa);
      if (!usuario || !usuario.empresa || !usuario.empresa.activo) {
        console.log('❌ [SESSION CALLBACK] Sesión invalidada para:', email);
        throw new Error('Empresa no activa');
      }
      session.user.empresaId = usuario.empresaId;
      session.user.rol = usuario.rol?.nombre || '';
      console.log('✅ [SESSION CALLBACK] Sesión válida para:', email);
      return session;
    }
  },
  pages: {
    signIn: '/login'
  }
} 