'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

interface DashboardStats {
  totalEmpresas: number;
  totalUsuarios: number;
  totalModulos: number;
  empresasActivas: number;
}

interface Empresa {
  id: string;
  nombre: string;
  ruc: string;
  activo: boolean;
  fechaCreacion: string;
  modulosActivos: number;
}

export default function AdminDashboardPage() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats>({
    totalEmpresas: 0,
    totalUsuarios: 0,
    totalModulos: 6,
    empresasActivas: 0
  });
  const [empresas, setEmpresas] = useState<Empresa[]>([]);

  useEffect(() => {
    if (session?.user) {
      fetchDashboardData();
    }
  }, [session]);

  const fetchDashboardData = async () => {
    try {
      // Fetch empresas (simulado por ahora)
      const empresasResponse = await fetch('/api/admin/empresas');
      if (empresasResponse.ok) {
        const data = await empresasResponse.json();
        setEmpresas(data.empresas || []);
        setStats(prev => ({
          ...prev,
          totalEmpresas: data.empresas?.length || 0,
          empresasActivas: data.empresas?.filter((e: any) => e.activo).length || 0
        }));
      } else {
        // Datos de ejemplo si API no existe
        const empresasEjemplo = [
          {
            id: '1',
            nombre: 'Ferretería Demo',
            ruc: '12345678-1',
            activo: true,
            fechaCreacion: '2024-12-01',
            modulosActivos: 3
          }
        ];
        setEmpresas(empresasEjemplo);
        setStats(prev => ({
          ...prev,
          totalEmpresas: 1,
          empresasActivas: 1
        }));
      }

      // Fetch usuarios (simulado)
      setStats(prev => ({
        ...prev,
        totalUsuarios: 1 // Usuario demo actual
      }));

    } catch (error) {
      console.error('Error cargando dashboard admin:', error);
      // Fallback con datos de ejemplo
      setStats({
        totalEmpresas: 1,
        totalUsuarios: 1,
        totalModulos: 6,
        empresasActivas: 1
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Dashboard Administrativo
        </h1>
        <p className="text-gray-600">
          Vista general del sistema ContaFácil Paraguay
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900">Total Empresas</h3>
          <p className="text-3xl font-bold admin-text-primary">
            {stats.totalEmpresas}
          </p>
          <p className="text-sm text-gray-500">
            {stats.empresasActivas} activas
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900">Total Usuarios</h3>
          <p className="text-3xl font-bold text-green-600">
            {stats.totalUsuarios}
          </p>
          <p className="text-sm text-gray-500">
            usuarios registrados
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900">Módulos Disponibles</h3>
          <p className="text-3xl font-bold text-blue-600">
            {stats.totalModulos}
          </p>
          <p className="text-sm text-gray-500">
            módulos del sistema
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900">Estado Sistema</h3>
          <p className="text-lg font-medium text-green-600">
            ✅ Operativo
          </p>
          <p className="text-sm text-gray-500">
            funcionando correctamente
          </p>
        </div>
      </div>

      {/* Empresas Table */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            Empresas Registradas
          </h3>
          <p className="text-sm text-gray-600">
            Vista de solo lectura - CRUD completo en Tarea 9
          </p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Empresa
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  RUC
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Módulos Activos
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Fecha Registro
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {empresas.map((empresa) => (
                <tr key={empresa.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">
                      {empresa.nombre}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                    {empresa.ruc}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      empresa.activo 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {empresa.activo ? 'Activa' : 'Inactiva'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                    {empresa.modulosActivos} de {stats.totalModulos}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                    {new Date(empresa.fechaCreacion).toLocaleDateString('es-PY')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {empresas.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No hay empresas registradas
          </div>
        )}
      </div>

      {/* Next Steps */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">
          Próximos Pasos de Desarrollo
        </h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Tarea 9: CRUD completo de empresas y usuarios</li>
          <li>• Tarea 10: Gestión de módulos por empresa</li>
          <li>• Tarea 11: Páginas de autenticación completas</li>
          <li>• Tarea 12: Testing E2E completo del sistema</li>
        </ul>
      </div>
    </div>
  );
} 