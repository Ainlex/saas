'use client';

import { useState } from 'react';
import { Button, Input } from '@contafacil/ui';

interface UsuarioFormData {
  nombre: string;
  apellido: string;
  email: string;
  empresaId: string;
  rolId: string;
  activo: boolean;
  newPassword?: string;
}

interface UsuarioFormProps {
  usuario?: any;
  empresas: any[];
  roles: any[];
  onSuccess: () => void;
  onCancel: () => void;
}

export function UsuarioForm({ usuario, empresas, roles, onSuccess, onCancel }: UsuarioFormProps) {
  const [formData, setFormData] = useState<UsuarioFormData>({
    nombre: usuario?.nombre || '',
    apellido: usuario?.apellido || '',
    email: usuario?.email || '',
    empresaId: usuario?.empresa?.id || '',
    rolId: usuario?.rol?.id || '',
    activo: usuario?.activo ?? true,
    newPassword: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [tempPassword, setTempPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = 'Nombre es requerido';
    }

    if (!formData.apellido.trim()) {
      newErrors.apellido = 'Apellido es requerido';
    }

    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.email = 'Email inválido';
    }

    if (!formData.empresaId) {
      newErrors.empresaId = 'Empresa es requerida';
    }

    if (!formData.rolId) {
      newErrors.rolId = 'Rol es requerido';
    }

    if (!usuario && !formData.newPassword && formData.newPassword !== undefined) {
      // Para usuarios nuevos, se genera automáticamente si no se proporciona
    } else if (formData.newPassword && formData.newPassword.length < 8) {
      newErrors.newPassword = 'Contraseña debe tener al menos 8 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    
    try {
      const url = usuario 
        ? `/api/admin/usuarios/${usuario.id}`
        : '/api/admin/usuarios';
      
      const method = usuario ? 'PUT' : 'POST';
      
      const submitData = { ...formData };
      if (!submitData.newPassword) {
        delete submitData.newPassword;
      }

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(submitData)
      });

      if (response.ok) {
        const result = await response.json();
        
        // Mostrar contraseña temporal si es usuario nuevo
        if (result.tempPassword) {
          setTempPassword(result.tempPassword);
          setTimeout(() => {
            onSuccess();
          }, 3000); // Mostrar por 3 segundos
        } else {
          onSuccess();
        }
      } else {
        const error = await response.json();
        if (error.details) {
          const zodErrors: Record<string, string> = {};
          error.details.forEach((detail: any) => {
            zodErrors[detail.path[0]] = detail.message;
          });
          setErrors(zodErrors);
        } else {
          setErrors({ general: error.error || 'Error guardando usuario' });
        }
      }
    } catch (error) {
      setErrors({ general: 'Error de conexión' });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof UsuarioFormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  if (tempPassword) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="text-center">
          <div className="text-4xl mb-4">✅</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Usuario creado exitosamente
          </h3>
          <p className="text-gray-600 mb-4">
            Contraseña temporal generada:
          </p>
          <div className="bg-gray-100 p-4 rounded-lg mb-4">
            <code className="text-lg font-mono">{tempPassword}</code>
          </div>
          <p className="text-sm text-gray-500">
            Guarda esta contraseña y envíala al usuario. Esta ventana se cerrará automáticamente.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900">
          {usuario ? 'Editar Usuario' : 'Nuevo Usuario'}
        </h3>
        <p className="text-sm text-gray-600">
          {usuario ? 'Modifica los datos del usuario' : 'Crea un nuevo usuario del sistema'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Nombre"
            value={formData.nombre}
            onChange={(e) => handleInputChange('nombre', e.target.value)}
            error={errors.nombre}
            required
            disabled={loading}
          />

          <Input
            label="Apellido"
            value={formData.apellido}
            onChange={(e) => handleInputChange('apellido', e.target.value)}
            error={errors.apellido}
            required
            disabled={loading}
          />

          <Input
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            error={errors.email}
            required
            disabled={loading || !!usuario} // No editar email existente
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Empresa *
            </label>
            <select
              value={formData.empresaId}
              onChange={(e) => handleInputChange('empresaId', e.target.value)}
              className={`w-full border rounded-md px-3 py-2 ${
                errors.empresaId ? 'border-red-300' : 'border-gray-300'
              }`}
              disabled={loading}
              required
            >
              <option value="">Selecciona una empresa</option>
              {empresas.map((empresa) => (
                <option key={empresa.id} value={empresa.id}>
                  {empresa.nombre} ({empresa.ruc})
                </option>
              ))}
            </select>
            {errors.empresaId && (
              <p className="text-red-600 text-sm mt-1">{errors.empresaId}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Rol *
            </label>
            <select
              value={formData.rolId}
              onChange={(e) => handleInputChange('rolId', e.target.value)}
              className={`w-full border rounded-md px-3 py-2 ${
                errors.rolId ? 'border-red-300' : 'border-gray-300'
              }`}
              disabled={loading}
              required
            >
              <option value="">Selecciona un rol</option>
              {roles.map((rol) => (
                <option key={rol.id} value={rol.id}>
                  {rol.nombre} - {rol.descripcion}
                </option>
              ))}
            </select>
            {errors.rolId && (
              <p className="text-red-600 text-sm mt-1">{errors.rolId}</p>
            )}
          </div>

          {usuario && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nueva Contraseña (opcional)</label>
              <div className="flex items-center gap-2">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="input input-bordered w-full"
                  value={formData.newPassword || ''}
                  onChange={e => handleInputChange('newPassword', e.target.value)}
                  disabled={loading}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className="text-xs text-blue-600 underline"
                  onClick={() => setShowPassword(v => !v)}
                  tabIndex={-1}
                >
                  {showPassword ? 'Ocultar' : 'Ver'}
                </button>
              </div>
              {errors.newPassword && <div className="text-red-600 text-xs mt-1">{errors.newPassword}</div>}
            </div>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="activo"
            checked={formData.activo}
            onChange={(e) => handleInputChange('activo', e.target.checked)}
            disabled={loading}
            className="rounded border-gray-300"
          />
          <label htmlFor="activo" className="text-sm font-medium text-gray-700">
            Usuario activo
          </label>
        </div>

        {!usuario && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              💡 Si no especificas una contraseña, se generará automáticamente una contraseña temporal que deberás enviar al usuario.
            </p>
          </div>
        )}

        {errors.general && (
          <div className="text-red-600 text-sm">
            {errors.general}
          </div>
        )}

        <div className="flex justify-end space-x-3">
          <Button
            type="button"
            variant="secondary"
            onClick={onCancel}
            disabled={loading}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            className="admin-primary"
            disabled={loading}
          >
            {loading ? 'Guardando...' : usuario ? 'Actualizar' : 'Crear Usuario'}
          </Button>
        </div>
      </form>
    </div>
  );
} 