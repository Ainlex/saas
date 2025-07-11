'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface Modulo {
  id: string;
  nombre: string;
  slug: string;
  descripcion: string;
  icono: string;
  color: string;
}

export function ModularNavigation() {
  const { data: session } = useSession();
  const user = session?.user;
  const empresaId = user?.empresaId;
  const [modulos, setModulos] = useState<Modulo[]>([]);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    if (empresaId) {
      fetchModulosActivos();
    }
  }, [empresaId]);

  const fetchModulosActivos = async () => {
    try {
      const response = await fetch('/api/modulos/active');
      if (response.ok) {
        const data = await response.json();
        setModulos(data.modulos || []);
      }
    } catch (error) {
      console.error('Error cargando módulos:', error);
    } finally {
      setLoading(false);
    }
  };

  // Crear lista de items disponibles (filtrar antes del render)
  const availableMenuItems = [
    { slug: 'dashboard', nombre: 'Dashboard', icono: '📊', ruta: '/dashboard' },
    ...modulos.map(modulo => ({
      slug: modulo.slug,
      nombre: modulo.nombre,
      icono: modulo.icono,
      ruta: `/${modulo.slug}`
    }))
  ];

  if (loading) {
    return (
      <aside className="w-64 bg-white shadow-sm border-r border-gray-200">
        <div className="p-4">
          <div className="animate-pulse space-y-3">
            {[1, 2, 3].map(i => (
              <div key={`skeleton-${i}`} className="h-10 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </aside>
    );
  }

  return (
    <aside className="w-64 bg-white shadow-sm border-r border-gray-200">
      <div className="p-4">
        <nav className="space-y-2">
          {availableMenuItems.map((item) => {
            const isActive = item.slug === 'dashboard' 
              ? pathname === item.ruta 
              : pathname.startsWith(item.ruta);

            return (
              <Link
                key={item.slug}
                href={item.ruta}
                className={`
                  flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors
                  ${isActive 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  }
                `}
              >
                <span className="text-xl">{item.icono}</span>
                <span className="font-medium">{item.nombre}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
} 