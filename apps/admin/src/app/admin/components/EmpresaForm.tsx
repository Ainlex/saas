'use client';

import React, { useState } from 'react';
import { Button, Input, Card } from '@contafacil/ui';

interface Empresa {
  id?: string;
  nombre: string;
  ruc: string;
  direccion: string;
  telefono: string;
  email: string;
  activo: boolean;
}

interface EmpresaFormProps {
  empresa?: Empresa | null;
  onSuccess: () => void;
  onCancel: () => void;
}

const validateRuc = (ruc: string) => /^\d{6,8}-\d{1}$/.test(ruc);
const validateEmail = (email: string) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
const validateTelefono = (tel: string) => {
  // Permitir 0987312325, 595987312325 o el formato internacional con espacios
  const cleaned = tel.replace(/[^0-9]/g, '');
  if ((cleaned.length === 10 && cleaned.startsWith('0')) ||
      (cleaned.length === 12 && cleaned.startsWith('595'))) {
    return true;
  }
  // También acepta el formato internacional con espacios
  return /^\+595\s\d{2,3}\s\d{3}\s\d{3,4}$/.test(tel);
};

const normalizeTelefono = (tel: string) => {
  // Si es 0987312325 → +595 987 312 325
  // Si es 595987312325 → +595 987 312 325
  let cleaned = tel.replace(/[^0-9]/g, '');
  if (cleaned.length === 10 && cleaned.startsWith('0')) {
    // 0987312325
    return `+595 ${cleaned.slice(1,4)} ${cleaned.slice(4,7)} ${cleaned.slice(7)}`;
  }
  if (cleaned.length === 12 && cleaned.startsWith('595')) {
    // 595987312325
    return `+595 ${cleaned.slice(3,6)} ${cleaned.slice(6,9)} ${cleaned.slice(9)}`;
  }
  return tel; // Si ya está en formato correcto o no reconocible
};

export function EmpresaForm({ empresa, onSuccess, onCancel }: EmpresaFormProps) {
  const [form, setForm] = useState<Empresa>({
    nombre: empresa?.nombre || '',
    ruc: empresa?.ruc || '',
    direccion: empresa?.direccion || '',
    telefono: empresa?.telefono || '',
    email: empresa?.email || '',
    activo: empresa?.activo ?? true,
    id: empresa?.id
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.nombre) errs.nombre = 'Nombre requerido';
    if (!validateRuc(form.ruc)) errs.ruc = 'RUC inválido (ej: 12345678-1)';
    if (form.email && !validateEmail(form.email)) errs.email = 'Email inválido';
    if (form.telefono && !validateTelefono(form.telefono)) errs.telefono = 'Teléfono inválido (ej: +595 21 123 456)';
    return errs;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setLoading(true);
    try {
      const method = form.id ? 'PUT' : 'POST';
      const url = form.id ? `/api/admin/empresas/${form.id}` : '/api/admin/empresas';
      const formToSend = {
        ...form,
        telefono: normalizeTelefono(form.telefono)
      };
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formToSend)
      });
      if (res.ok) {
        onSuccess();
      } else {
        const data = await res.json();
        setErrors({ general: data.message || 'Error al guardar empresa' });
      }
    } catch (err) {
      setErrors({ general: 'Error de red' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-xl mx-auto p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <h2 className="text-lg font-bold mb-2">{form.id ? 'Editar Empresa' : 'Nueva Empresa'}</h2>
        {errors.general && <div className="text-red-600">{errors.general}</div>}
        <Input label="Nombre" name="nombre" value={form.nombre} onChange={handleChange} error={errors.nombre} required />
        <Input label="RUC" name="ruc" value={form.ruc} onChange={handleChange} error={errors.ruc} required />
        <Input label="Dirección" name="direccion" value={form.direccion} onChange={handleChange} />
        <Input label="Teléfono" name="telefono" value={form.telefono} onChange={handleChange} error={errors.telefono} />
        <Input label="Email" name="email" value={form.email} onChange={handleChange} error={errors.email} />
        <div className="flex gap-2 mt-4">
          <Button type="submit" disabled={loading} className="admin-primary">
            {loading ? 'Guardando...' : 'Guardar'}
          </Button>
          <Button type="button" variant="secondary" onClick={onCancel} disabled={loading}>
            Cancelar
          </Button>
        </div>
      </form>
    </Card>
  );
} 