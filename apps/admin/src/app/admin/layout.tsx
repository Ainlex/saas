'use client';

import { AdminNavigation } from '../components/AdminNavigation';
import { AdminHeader } from '../components/AdminHeader';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />
      <div className="flex">
        <AdminNavigation />
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
} 