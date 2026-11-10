import { Link } from 'react-router-dom';

const NotFound = () => (
  <section className="not-found-page" aria-labelledby="not-found-title">
    <div className="not-found-card">
      <span className="not-found-code">ERROR 404</span>
      <h1 className="not-found-title" id="not-found-title">
        Uy, este espacio no existe.
      </h1>
      <p className="not-found-description">
        No encontramos la página que buscabas. Puede que el enlace haya cambiado
        o ya no esté disponible.
      </p>
      <Link className="not-found-home-link" to="/">
        Volver al inicio
      </Link>
    </div>
  </section>
);

export default NotFound;
