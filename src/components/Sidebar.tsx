import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext.ts';
import ThemeToggle from '@/components/ThemeToggle.tsx';
import appRoutes from '@/config/appRoutes.tsx';

const iconByPath: Record<string, string> = {
  '/': 'M3 10.5 12 3l9 7.5M5.5 9v11h13V9M9 20v-6h6v6',
  '/tablero': 'M3 10.5 12 3l9 7.5M5.5 9v11h13V9M9 20v-6h6v6',
  '/inventario': 'M4 7.5 12 3l8 4.5v9L12 21l-8-4.5zM4 7.5l8 4.5 8-4.5M12 12v9',
  '/public-tools': 'M14.5 6.5a4 4 0 0 0-5.3 5.3L4 17v3h3l5.2-5.2a4 4 0 0 0 5.3-5.3L15 12l-3-3z',
  '/public-resources': 'M5 4.5A2.5 2.5 0 0 1 7.5 2H20v17H7.5A2.5 2.5 0 0 0 5 21.5zM5 4.5v17M9 6h7M9 9h7',
  more: 'M5 12h.01M12 12h.01M19 12h.01',
};

const NavigationIcon = ({ path }: { path: string }) => (
  <svg
    aria-hidden="true"
    className="mobile-tab-icon"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="1.7"
  >
    <path d={iconByPath[path] ?? 'M4 6h16M4 12h16M4 18h16'} />
  </svg>
);

const Sidebar = () => {
  const { role, logout } = useAuth();
  const { pathname } = useLocation();
  const [openMorePath, setOpenMorePath] = useState<string | null>(null);
  const navigationRoutes = appRoutes.filter((route) => route.roles.includes(role));
  const mobileTabs = navigationRoutes.filter((route) => route.mobileTab);
  const moreRoutes = navigationRoutes.filter((route) => !route.mobileTab);
  const moreOpen = openMorePath === pathname;
  const moreIsActive = moreRoutes.some(
    (route) =>
      (pathname === route.path || pathname.startsWith(`${route.path}/`)),
  );

  return (
    <>
      <aside className="app-sidebar d-none d-lg-flex">
        <div className="sidebar-brand">
          <NavLink to={role === 'guest' ? '/' : '/tablero'}>House Net</NavLink>
          <span>El hogar, en un solo lugar</span>
        </div>

        <nav className="sidebar-links" aria-label="Navegación principal">
          {navigationRoutes.map((route) => (
            <NavLink
              key={route.path}
              to={route.path}
              end={route.path === '/'}
              className={({ isActive }) => `sidebar-link${isActive ? ' is-active' : ''}`}
            >
              {route.label}
            </NavLink>
          ))}
          {role !== 'guest' && (
            <button className="sidebar-link sidebar-logout" type="button" onClick={logout}>
              Cerrar sesión
            </button>
          )}
        </nav>

        <div className="sidebar-footer">
          <ThemeToggle />
          <small className="sidebar-build">build {__BUILD__}</small>
        </div>
      </aside>

      <div className="mobile-navigation d-lg-none">
        <header className="mobile-topbar">
          <div className="mobile-brand-group">
            <NavLink className="mobile-brand" to={role === 'guest' ? '/' : '/tablero'}>
              House Net
            </NavLink>
            <span>El hogar, en un solo lugar</span>
          </div>
          <ThemeToggle />
        </header>

        <nav className="mobile-tabs" aria-label="Navegación principal">
          {mobileTabs.map((route) => (
            <NavLink
              key={route.path}
              to={route.path}
              end={route.path === '/'}
              onClick={() => setOpenMorePath(null)}
              className={({ isActive }) => `mobile-tab${isActive ? ' is-active' : ''}`}
            >
              <NavigationIcon path={route.path} />
              <span>{route.label}</span>
            </NavLink>
          ))}
          {(moreRoutes.length > 0 || role !== 'guest') && (
            <div className="mobile-more">
              <button
                type="button"
                className={`mobile-tab mobile-more-button${moreOpen || moreIsActive ? ' is-active' : ''}`}
                aria-expanded={moreOpen}
                aria-controls="mobile-more-menu"
                onClick={() => setOpenMorePath(moreOpen ? null : pathname)}
              >
                <NavigationIcon path="more" />
                <span>Más</span>
              </button>
              {moreOpen && (
                <div className="mobile-more-menu" id="mobile-more-menu">
                  {moreRoutes.map((route) => (
                    <NavLink
                      key={route.path}
                      to={route.path}
                      onClick={() => setOpenMorePath(null)}
                      className={({ isActive }) => `mobile-more-link${isActive ? ' is-active' : ''}`}
                    >
                      {route.label}
                    </NavLink>
                  ))}
                  {role !== 'guest' && (
                    <button
                      className="mobile-more-link"
                      type="button"
                      onClick={() => {
                        setOpenMorePath(null);
                        void logout();
                      }}
                    >
                      Cerrar sesión
                    </button>
                  )}
                </div>
              )}
            </div>
          )}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
