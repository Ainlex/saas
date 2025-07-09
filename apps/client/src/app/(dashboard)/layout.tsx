'use client';
import { ModularNavigation } from '../components/ModularNavigation';
import { AppHeader } from '../components/AppHeader';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <AppHeader />
      <div className="flex">
        <ModularNavigation />
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
} 