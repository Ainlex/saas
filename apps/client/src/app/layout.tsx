import type { Metadata } from 'next';
import { APP_NAME } from '@contafacil/shared';
import './globals.css';

export const metadata: Metadata = {
  title: APP_NAME,
  description: 'Plataforma de contabilidad para Paraguay',
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