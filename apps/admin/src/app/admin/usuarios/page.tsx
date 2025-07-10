'use client';

import { useState, useEffect } from 'react';
import { Button } from '@contafacil/ui';
import { UsuarioForm } from '../components/UsuarioForm';
import { UsuarioTable } from '../components/UsuarioTable';

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

interface Empresa {
  id: string;
  nombre: string;
  ruc: string;
}

interface Rol {
  id: string;
  nombre: string;
  descripcion: string;
}

export default function UsuariosPage() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [empresas, setEmpresas] = useState<Empresa[]>([]);
  const [roles, setRoles] = useState<Rol[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingUsuario, setEditingUsuario] = useState<Usuario | null>(null);
  const [selectedEmpresa, setSelectedEmpresa] = useState<string>('');

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchUsuarios();
  }, [selectedEmpresa]);

  const fetchData = async () => {
    try {
      const [usuariosRes, empresasRes, rolesRes] = await Promise.all([
        fetch('/api/admin/usuarios'),
        fetch('/api/admin/empresas'),
        fetch('/api/admin/roles')
      ]);

      if (usuariosRes.ok) {
        const usuariosData = await usuariosRes.json();
        setUsuarios(usuariosData.usuarios || []);
      }

      if (empresasRes.ok) {
        const empresasData = await empresasRes.json();
        setEmpresas(empresasData.empresas || []);
      }

      if (rolesRes.ok) {
        const rolesData = await rolesRes.json();
        setRoles(rolesData.roles || []);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUsuarios = async () => {
    try {
      const url = selectedEmpresa 
        ? `/api/admin/usuarios?empresaId=${selectedEmpresa}`
        : '/api/admin/usuarios';
      
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setUsuarios(data.usuarios || []);
      }
    } catch (error) {
      console.error('Error fetching usuarios:', error);
    }
  };

  const handleCreateUsuario = () => {
    setEditingUsuario(null);
    setShowForm(true);
  };

  const handleEditUsuario = (usuario: Usuario) => {
    setEditingUsuario(usuario);
    setShowForm(true);
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setEditingUsuario(null);
    fetchUsuarios();
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingUsuario(null);
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Gestión de Usuarios
          </h1>
          <p className="text-gray-600">
            Administra los usuarios del sistema
          </p>
        </div>
        <Button
          onClick={handleCreateUsuario}
          className="admin-primary"
        >
          Nuevo Usuario
        </Button>
      </div>

      {/* Filtro por empresa */}
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="flex items-center space-x-4">
          <label className="text-sm font-medium text-gray-700">
            Filtrar por empresa:
          </label>
          <select
            value={selectedEmpresa}
            onChange={(e) => setSelectedEmpresa(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm"
          >
            <option value="">Todas las empresas</option>
            {empresas.map((empresa) => (
              <option key={empresa.id} value={empresa.id}>
                {empresa.nombre} ({empresa.ruc})
              </option>
            ))}
          </select>
          {selectedEmpresa && (
            <span className="text-sm text-gray-500">
              {usuarios.length} usuario(s) encontrado(s)
            </span>
          )}
        </div>
      </div>

      {showForm ? (
        <UsuarioForm
          usuario={editingUsuario}
          empresas={empresas}
          roles={roles}
          onSuccess={handleFormSuccess}
          onCancel={handleFormCancel}
        />
      ) : (
        <UsuarioTable
          usuarios={usuarios}
          onEdit={handleEditUsuario}
          onRefresh={fetchUsuarios}
        />
      )}
    </div>
  );
} 