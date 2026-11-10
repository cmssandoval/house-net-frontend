import { Link } from 'react-router-dom';

const Dashboard = () => {
  const today = new Intl.DateTimeFormat('es', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }).format(new Date());

  return (
    <div className="dashboard-page">
      <header className="dashboard-intro">
        <p className="eyebrow">La casa, en un solo lugar</p>
        <p className="dashboard-date">Hoy · {today}</p>
        <h1>¿Qué hacemos hoy?</h1>
        <p className="dashboard-lede">
          Lo que usamos y organizamos en casa, todo junto.
        </p>
      </header>

      <div className="dashboard-grid">
        <div className="dashboard-primary">
          <section className="dashboard-card dashboard-focus" aria-labelledby="today-heading">
            <p className="eyebrow">En el día a día</p>
            <h2 id="today-heading">Todo listo para organizarse.</h2>
            <p>
              Estamos preparando el resumen de tareas y fechas. Mientras tanto,
              puedes echar un vistazo a estas secciones.
            </p>
            <div className="dashboard-inline-links">
              <Link to="/tareas">Ir a tareas</Link>
              <Link to="/calendario">Ver calendario</Link>
            </div>
          </section>

          <section className="dashboard-section" aria-labelledby="quick-links-heading">
            <div className="dashboard-section-heading">
              <div>
                <p className="eyebrow">Accesos rápidos</p>
                <h2 id="quick-links-heading">¿Qué estás buscando?</h2>
              </div>
            </div>
            <div className="quick-link-grid">
              <Link className="quick-link-card" to="/inventario">
                <span className="quick-link-kicker">Lo que hay en casa</span>
                <span className="quick-link-title">Inventario</span>
                <span className="quick-link-description">
                  Consulta y organiza las cosas del hogar.
                </span>
                <span className="quick-link-arrow" aria-hidden="true">↗</span>
              </Link>
              <Link className="quick-link-card" to="/public-tools">
                <span className="quick-link-kicker">Para resolver algo</span>
                <span className="quick-link-title">Herramientas</span>
                <span className="quick-link-description">
                  Un espacio para pequeñas herramientas de uso diario.
                </span>
                <span className="quick-link-arrow" aria-hidden="true">↗</span>
              </Link>
              <Link className="quick-link-card" to="/public-resources">
                <span className="quick-link-kicker">Para tener a mano</span>
                <span className="quick-link-title">Recursos</span>
                <span className="quick-link-description">
                  Un lugar para reunir recursos útiles para todos en casa.
                </span>
                <span className="quick-link-arrow" aria-hidden="true">↗</span>
              </Link>
            </div>
          </section>
        </div>

        <aside className="dashboard-aside" aria-label="Novedades del hogar">
          <section className="dashboard-card dashboard-activity">
            <p className="eyebrow">Novedades</p>
            <h2>Aquí aparecerá lo nuevo.</h2>
            <p>
              Cuando alguien comparta o actualice algo, lo verás aquí.
            </p>
          </section>
          <section className="dashboard-note">
            <p className="eyebrow">Un espacio de todos</p>
            <p>
              Para tener cerca las cosas que hacen funcionar la casa.
            </p>
          </section>
        </aside>
      </div>
    </div>
  );
};

export default Dashboard;
