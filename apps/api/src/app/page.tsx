export default function ApiPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          ContaFácil Paraguay - API
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
          <div className="mt-8 p-4 bg-white rounded-lg shadow">
            <h3 className="font-semibold text-gray-900 mb-2">Endpoints Disponibles:</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• <code className="bg-gray-100 px-1 rounded">GET /api/health</code> - Health check</li>
              <li>• <code className="bg-gray-100 px-1 rounded">GET /api/auth/user</code> - Usuario autenticado</li>
              <li>• <code className="bg-gray-100 px-1 rounded">GET /api/modulos/active</code> - Módulos activos</li>
              <li>• <code className="bg-gray-100 px-1 rounded">GET /api/pos</code> - Módulo POS</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
} 