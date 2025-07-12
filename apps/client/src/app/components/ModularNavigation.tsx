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

interface SubOpcion {
  nombre: string;
  ruta: string;
  activo: boolean;
}

export function ModularNavigation() {
  const { data: session } = useSession();
  const user = session?.user;
  const empresaId = user?.empresaId;
  const [modulos, setModulos] = useState<Modulo[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set());
  const pathname = usePathname();

  // Sub-opciones del módulo contabilidad
  const subOpcionesContabilidad: SubOpcion[] = [
    { nombre: "Plan de Cuentas", ruta: "/contabilidad/plan-cuentas", activo: true },
    { nombre: "Asientos Contables", ruta: "#", activo: false },
    { nombre: "Libros Contables", ruta: "#", activo: false },
    { nombre: "Estados Financieros", ruta: "#", activo: false }
  ];

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

  const toggleModule = (slug: string) => {
    setExpandedModules(prev => {
      const newSet = new Set(prev);
      if (newSet.has(slug)) {
        newSet.delete(slug);
      } else {
        newSet.add(slug);
      }
      return newSet;
    });
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
            
            const isExpanded = expandedModules.has(item.slug);
            const isContabilidad = item.slug === 'contabilidad';

            return (
              <div key={item.slug}>
                {isContabilidad ? (
                  // Módulo Contabilidad con sub-opciones
                  <div>
                    <button
                      onClick={() => toggleModule(item.slug)}
                      className={`
                        w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors
                        ${isActive 
                          ? 'bg-blue-600 text-white' 
                          : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                        }
                      `}
                    >
                      <span className="text-xl">{item.icono}</span>
                      <span className="font-medium">{item.nombre}</span>
                    </button>
                    
                    {isExpanded && (
                      <div className="ml-6 mt-2 space-y-1">
                        {subOpcionesContabilidad.map((subOpcion, index) => {
                          const isSubActive = pathname === subOpcion.ruta;
                          
                          return (
                            <Link
                              key={index}
                              href={subOpcion.activo ? subOpcion.ruta : '#'}
                              className={`
                                block px-4 py-2 rounded-lg transition-colors text-sm
                                ${subOpcion.activo 
                                  ? isSubActive
                                    ? 'bg-blue-500 text-white'
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                  : 'text-gray-400 cursor-not-allowed'
                                }
                              `}
                              onClick={(e) => {
                                if (!subOpcion.activo) {
                                  e.preventDefault();
                                }
                              }}
                            >
                              {subOpcion.nombre}
                              {!subOpcion.activo && (
                                <span className="ml-2 text-xs text-gray-400">(próximamente)</span>
                              )}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                ) : (
                  // Otros módulos sin sub-opciones
                  <Link
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
                )}
              </div>
            );
          })}
        </nav>
      </div>
    </aside>
  );
} 