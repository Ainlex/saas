import type { Metadata } from 'next';
import { APP_NAME } from '@contafacil/shared';
import './globals.css';

export const metadata: Metadata = {
  title: `${APP_NAME} - Admin`,
  description: 'Panel de administración SaaS',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
} 