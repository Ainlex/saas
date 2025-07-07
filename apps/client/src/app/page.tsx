import { APP_NAME } from '@contafacil/shared';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {APP_NAME}
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Plataforma de contabilidad para Paraguay
        </p>
        <div className="space-y-4">
          <p className="text-gray-500">
            🏢 Aplicación Cliente - Puerto 3000
          </p>
          <p className="text-sm text-gray-400">
            Monorepo configurado con Turborepo + pnpm
          </p>
        </div>
      </div>
    </div>
  );
} 