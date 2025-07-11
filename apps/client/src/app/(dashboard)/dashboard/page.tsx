'use client';

import { useAuth } from '@contafacil/ui';
import { useEffect, useState } from 'react';

export default function DashboardPage() {
  const { user } = useAuth();
  const empresaId = user?.empresaId;
  const [modulos, setModulos] = useState([]);
  const [stats, setStats] = useState({
    totalModulos: 0,
    modulosActivos: 0,
    ultimaActividad: null as Date | null
  });

  useEffect(() => {
    if (empresaId) {
      fetchDashboardData();
    }
  }, [empresaId]);

  const fetchDashboardData = async () => {
    try {
      const response = await fetch('/api/modulos/active');
      if (response.ok) {
        const data = await response.json();
        setModulos(data.modulos || []);
        setStats({
          totalModulos: 6, // Total disponibles
          modulosActivos: data.modulos?.length || 0,
          ultimaActividad: new Date()
        });
      }
    } catch (error) {
      console.error('Error cargando dashboard:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Dashboard Principal
        </h1>
        <p className="text-gray-600">
          Bienvenido a ContaFácil Paraguay, {user?.name}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900">Módulos Activos</h3>
          <p className="text-3xl font-bold text-primary-blue">
            {stats.modulosActivos}
          </p>
          <p className="text-sm text-gray-500">
            de {stats.totalModulos} disponibles
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900">Empresa</h3>
          <p className="text-lg font-medium text-gray-700">
            {user?.empresaId}
          </p>
          <p className="text-sm text-gray-500">
            Rol: {user?.rol}
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900">Estado</h3>
          <p className="text-lg font-medium text-green-600">
            ✅ Operativo
          </p>
          <p className="text-sm text-gray-500">
            Sistema funcionando correctamente
          </p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Tus Módulos Disponibles
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {modulos.map((modulo: any) => (
            <div 
              key={modulo.id}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{modulo.icono}</span>
                <div>
                  <h4 className="font-medium text-gray-900">{modulo.nombre}</h4>
                  <p className="text-sm text-gray-500">{modulo.descripcion}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {modulos.length === 0 && (
          <p className="text-center text-gray-500 py-8">
            No tienes módulos activos. Contacta al administrador.
          </p>
        )}
      </div>
    </div>
  );
} 