'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function AdminNavigation() {
  const pathname = usePathname();

  const menuItems = [
    { 
      slug: 'dashboard', 
      nombre: 'Dashboard', 
      icono: '📊', 
      ruta: '/admin',
      descripcion: 'Vista general del sistema'
    },
    { 
      slug: 'empresas', 
      nombre: 'Empresas', 
      icono: '🏢', 
      ruta: '/admin/empresas',
      descripcion: 'Gestión de empresas (próximamente)'
    },
    { 
      slug: 'usuarios', 
      nombre: 'Usuarios', 
      icono: '👥', 
      ruta: '/admin/usuarios',
      descripcion: 'Gestión de usuarios (próximamente)'
    },
    { 
      slug: 'modulos', 
      nombre: 'Módulos', 
      icono: '🧩', 
      ruta: '/admin/modulos',
      descripcion: 'Gestión de módulos (próximamente)'
    },
    { 
      slug: 'analytics', 
      nombre: 'Analytics', 
      icono: '📈', 
      ruta: '/admin/analytics',
      descripcion: 'Métricas del sistema (próximamente)'
    }
  ];

  return (
    <aside className="w-64 bg-white shadow-sm border-r border-gray-200">
      <div className="p-4">
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const isActive = item.ruta === '/admin' 
              ? pathname === '/admin'
              : pathname.startsWith(item.ruta);
            
            return (
              <Link
                key={item.slug}
                href={item.ruta}
                className={`
                  flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors
                  ${isActive 
                    ? 'admin-primary text-white' 
                    : 'text-gray-700 hover:bg-gray-100'
                  }
                `}
              >
                <span className="text-xl">{item.icono}</span>
                <div>
                  <div className="font-medium">{item.nombre}</div>
                  <div className={`text-xs ${isActive ? 'text-gray-200' : 'text-gray-500'}`}>
                    {item.descripcion}
                  </div>
                </div>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
} 