'use client';

import { useState } from 'react';
import { Button } from '@contafacil/ui';

interface Empresa {
  id: string;
  nombre: string;
  ruc: string;
  direccion: string;
  telefono: string;
  email: string;
  activo: boolean;
  fechaCreacion: string;
  _count: {
    usuarios: number;
    modulosActivos: number;
  };
}

interface EmpresaTableProps {
  empresas: Empresa[];
  onEdit: (empresa: Empresa) => void;
  onRefresh: () => void;
}

export function EmpresaTable({ empresas, onEdit, onRefresh }: EmpresaTableProps) {
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const handleToggle = async (empresa: Empresa) => {
    const action = empresa.activo ? 'desactivar' : 'activar';
    if (!confirm(`¿Estás seguro de ${action} la empresa "${empresa.nombre}"?`)) {
      return;
    }
    setUpdatingId(empresa.id);
    try {
      const response = await fetch(`/api/admin/empresas/${empresa.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ activo: !empresa.activo })
      });
      if (response.ok) {
        onRefresh();
      } else {
        alert(`Error al ${action} empresa`);
      }
    } catch (error) {
      alert('Error de conexión');
    } finally {
      setUpdatingId(null);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-PY', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">
          Empresas Registradas ({empresas.length})
        </h3>
      </div>

      {empresas.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-4xl mb-4">🏢</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No hay empresas registradas
          </h3>
          <p className="text-gray-600">
            Crea la primera empresa para comenzar
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Empresa
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  RUC
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contacto
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Usuarios/Módulos
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fecha Registro
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {empresas.map((empresa) => (
                <tr key={empresa.id} className={`hover:bg-gray-50 ${!empresa.activo ? 'bg-gray-100' : ''}`}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {empresa.nombre}
                      </div>
                      <div className="text-sm text-gray-500 truncate max-w-xs">
                        {empresa.direccion}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {empresa.ruc}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{empresa.email}</div>
                    <div className="text-sm text-gray-500">{empresa.telefono}</div>
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
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    <div>{empresa._count.usuarios} usuarios</div>
                    <div>{empresa._count.modulosActivos} módulos</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {formatDate(empresa.fechaCreacion)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => onEdit(empresa)}
                      >
                        Editar
                      </Button>
                      <Button
                        size="sm"
                        variant={empresa.activo ? 'danger' : 'primary'}
                        onClick={() => handleToggle(empresa)}
                        disabled={updatingId === empresa.id}
                      >
                        {updatingId === empresa.id 
                          ? (empresa.activo ? 'Desactivando...' : 'Activando...')
                          : empresa.activo ? 'Desactivar' : 'Activar'}
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
} 