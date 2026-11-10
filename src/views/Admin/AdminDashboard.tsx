import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import InventoryAdmin from '@/views/Admin/InventoryAdmin';
import UsersAdmin from '@/views/Admin/UsersAdmin';

type AdminSection = 'overview' | 'tables' | 'users';

const AdminDashboard = () => {
  const [section, setSection] = useState<AdminSection>('overview');

  if (section === 'tables') {
    return <InventoryAdmin onBack={() => setSection('overview')} />;
  }

  if (section === 'users') {
    return <UsersAdmin onBack={() => setSection('overview')} />;
  }

  return (
    <main className="admin-page admin-dashboard">
      <header className="admin-dashboard-heading">
        <p className="eyebrow">House Net</p>
        <h1 className="admin-page-title">Administración</h1>
        <p>Gestiona las opciones de la casa desde aquí.</p>
      </header>
      <Container className="admin-content">
        <section className="admin-dashboard-section" aria-labelledby="admin-tools-heading">
          <div className="admin-dashboard-section-heading">
            <h2 id="admin-tools-heading">Herramientas de administración</h2>
            <p>Las opciones disponibles para organizar la aplicación.</p>
          </div>
          <div className="admin-tool-grid">
            <button
              className="admin-tool-card"
              type="button"
              onClick={() => setSection('tables')}
            >
              <span className="admin-tool-eyebrow">INVENTARIO</span>
              <span className="admin-tool-title">Categorías y ubicaciones</span>
              <span className="admin-tool-description">
                Añade o elimina opciones que se usan en los productos del hogar.
              </span>
              <span className="admin-tool-action">Administrar <span aria-hidden="true">→</span></span>
            </button>
            <button
              className="admin-tool-card"
              type="button"
              onClick={() => setSection('users')}
            >
              <span className="admin-tool-eyebrow">ACCESO</span>
              <span className="admin-tool-title">Usuarios</span>
              <span className="admin-tool-description">
                Consulta la vista de administración de las cuentas del hogar.
              </span>
              <span className="admin-tool-action">Administrar <span aria-hidden="true">→</span></span>
            </button>
            <div className="admin-tool-card admin-tool-card-disabled" aria-disabled="true">
              <span className="admin-tool-eyebrow">PRÓXIMAMENTE</span>
              <span className="admin-tool-title">Ajustes del hogar</span>
              <span className="admin-tool-description">
                Preferencias compartidas y opciones generales de la aplicación.
              </span>
              <span className="admin-tool-status">En preparación</span>
            </div>
            <div className="admin-tool-card admin-tool-card-disabled" aria-disabled="true">
              <span className="admin-tool-eyebrow">PRÓXIMAMENTE</span>
              <span className="admin-tool-title">Mantenimiento</span>
              <span className="admin-tool-description">
                Herramientas para revisar y mantener el espacio compartido.
              </span>
              <span className="admin-tool-status">En preparación</span>
            </div>
          </div>
        </section>
      </Container>
    </main>
  );
};


export default AdminDashboard;