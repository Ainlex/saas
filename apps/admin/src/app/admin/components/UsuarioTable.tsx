'use client';

import { useState } from 'react';
import { Button } from '@contafacil/ui';

interface Usuario {
  id: string;
  nombre: string;
  apellido: string;
  email: string;
  activo: boolean;
  empresa: {
    id: string;
    nombre: string;
    ruc: string;
  };
  rol: {
    id: string;
    nombre: string;
    descripcion: string;
  };
}

interface UsuarioTableProps {
  usuarios: Usuario[];
  onEdit: (usuario: Usuario) => void;
  onRefresh: () => void;
}

export function UsuarioTable({ usuarios, onEdit, onRefresh }: UsuarioTableProps) {
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const handleToggleStatus = async (usuario: Usuario) => {
    const action = usuario.activo ? 'desactivar' : 'activar';
    if (!confirm(`¿Estás seguro de ${action} al usuario "${usuario.nombre} ${usuario.apellido}"?`)) {
      return;
    }

    setUpdatingId(usuario.id);
    
    try {
      const response = await fetch(`/api/admin/usuarios/${usuario.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ activo: !usuario.activo })
      });

      if (response.ok) {
        onRefresh();
      } else {
        alert(`Error ${action}ando usuario`);
      }
    } catch (error) {
      alert('Error de conexión');
    } finally {
      setUpdatingId(null);
    }
  };

  const getRolBadgeColor = (rolNombre: string) => {
    switch (rolNombre) {
      case 'ADMIN':
        return 'bg-purple-100 text-purple-800';
      case 'CONTADOR':
        return 'bg-blue-100 text-blue-800';
      case 'VENDEDOR':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">
          Usuarios Registrados ({usuarios.length})
        </h3>
      </div>

      {usuarios.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-4xl mb-4">👥</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No hay usuarios registrados
          </h3>
          <p className="text-gray-600">
            Crea el primer usuario para comenzar
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Usuario
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Empresa
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rol
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {usuarios.map((usuario) => (
                <tr key={usuario.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {usuario.nombre} {usuario.apellido}
                      </div>
                      <div className="text-sm text-gray-500">
                        {usuario.email}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{usuario.empresa.nombre}</div>
                    <div className="text-sm text-gray-500">{usuario.empresa.ruc}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${getRolBadgeColor(usuario.rol.nombre)}`}>
                      {usuario.rol.nombre}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      usuario.activo 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {usuario.activo ? 'Activo' : 'Inactivo'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => onEdit(usuario)}
                      >
                        Editar
                      </Button>
                      <Button
                        size="sm"
                        variant={usuario.activo ? "danger" : "primary"}
                        onClick={() => handleToggleStatus(usuario)}
                        disabled={updatingId === usuario.id}
                      >
                        {updatingId === usuario.id 
                          ? 'Procesando...' 
                          : usuario.activo ? 'Desactivar' : 'Activar'
                        }
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