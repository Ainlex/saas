import { APP_NAME } from '@contafacil/shared';

export default function ApiPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {APP_NAME} - API
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          API unificada para la plataforma
        </p>
        <div className="space-y-4">
          <p className="text-gray-500">
            🔌 API Server - Puerto 3002
          </p>
          <p className="text-sm text-gray-400">
            Endpoints para autenticación, usuarios y contabilidad
          </p>
        </div>
      </div>
    </div>
  );
} 