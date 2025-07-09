import type { Metadata } from 'next';
import { APP_NAME } from '@contafacil/shared';

export const metadata: Metadata = {
  title: `${APP_NAME} - API`,
  description: 'API unificada para la plataforma',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>
        {children}
      </body>
    </html>
  )
} 