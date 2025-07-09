export default function InventarioPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Gestión de Inventario
        </h1>
        <p className="text-gray-600">
          Control de stock y productos
        </p>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-sm text-center">
        <div className="text-6xl mb-4">📦</div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Módulo Inventario Disponible
        </h3>
        <p className="text-gray-600 mb-4">
          El módulo de Inventario está activo y listo para implementar.
        </p>
        <div className="text-sm text-gray-500">
          Próximamente: Gestión completa de productos y stock
        </div>
      </div>
    </div>
  );
} 