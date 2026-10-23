import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
const Home = () => {

  return (
    <Container className='px-1 my-4'>
      <Card className='p-4 my-4 card-custom gap-3'>
        <h1>Bienvenido a House Net</h1>
        <p>Esta es una aplicación web destinada a la gestión del hogar, con funciones como inventario, calendario y recursos compartidos,
          además de secciones como tareas y notas personales.
        </p>
        <p>
          <Link to='/register'>Regístrate</Link> o <Link to='/login'> Inicia sesión</Link> para acceder a las funciones de la casa.
          </p>
        <p>También puedes leer <Link to='/public-resources'>los recursos públicos</Link>.</p>
      </Card>
    </Container>
  );
};

export default Home;