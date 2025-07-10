'use client';

import { useState, useEffect } from 'react';
import { Button } from '@contafacil/ui';
import { EmpresaForm } from '../components/EmpresaForm';
import { EmpresaTable } from '../components/EmpresaTable';

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

export default function EmpresasPage() {
  const [empresas, setEmpresas] = useState<Empresa[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingEmpresa, setEditingEmpresa] = useState<Empresa | null>(null);

  useEffect(() => {
    fetchEmpresas();
  }, []);

  const fetchEmpresas = async () => {
    try {
      const response = await fetch('/api/admin/empresas');
      if (response.ok) {
        const data = await response.json();
        setEmpresas(data.empresas || []);
      } else {
        console.error('Error fetching empresas');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateEmpresa = () => {
    setEditingEmpresa(null);
    setShowForm(true);
  };

  const handleEditEmpresa = (empresa: Empresa) => {
    setEditingEmpresa(empresa);
    setShowForm(true);
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setEditingEmpresa(null);
    fetchEmpresas();
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingEmpresa(null);
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
            Gestión de Empresas
          </h1>
          <p className="text-gray-600">
            Administra las empresas registradas en el sistema
          </p>
        </div>
        <Button
          onClick={handleCreateEmpresa}
          className="admin-primary"
        >
          Nueva Empresa
        </Button>
      </div>

      {showForm ? (
        <EmpresaForm
          empresa={editingEmpresa}
          onSuccess={handleFormSuccess}
          onCancel={handleFormCancel}
        />
      ) : (
        <EmpresaTable
          empresas={empresas}
          onEdit={handleEditEmpresa}
          onRefresh={fetchEmpresas}
        />
      )}
    </div>
  );
} 