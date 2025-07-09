'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { LoadingSpinner } from '@contafacil/ui';

export default function HomePage() {
  const { status } = useSession();

  if (status === 'loading') return <div className="min-h-screen flex items-center justify-center"><LoadingSpinner /></div>;
  if (status === 'authenticated') redirect('/dashboard');
  if (status === 'unauthenticated') redirect('/login');
  return null;
} 