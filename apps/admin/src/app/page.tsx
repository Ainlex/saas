import { APP_NAME } from '@contafacil/shared';

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {APP_NAME} - Admin
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Panel de administración SaaS
        </p>
        <div className="space-y-4">
          <p className="text-gray-500">
            🔧 Panel Admin - Puerto 3001
          </p>
          <p className="text-sm text-gray-400">
            Gestión de usuarios, empresas y configuración
          </p>
        </div>
      </div>
    </div>
  );
} 