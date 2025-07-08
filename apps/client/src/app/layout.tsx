import './globals.css'
import SessionProviderWrapper from './SessionProviderWrapper'

export const metadata = {
  title: 'ContaFácil Paraguay',
  description: 'Sistema contable modular para PyMEs',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>
        <SessionProviderWrapper>
          {children}
        </SessionProviderWrapper>
      </body>
    </html>
  )
} 