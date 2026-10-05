import { Link } from "react-router-dom";
import Col from 'react-bootstrap/Col';

const Sidebar = () => {
  return (
    <Col className="nav-list p-0 col-sm-4 col-md-3 col-xl-2">
        <h4 className="p-3 mb-0">Organizador</h4>

        <Link to="/"          > Dashboard </Link>
        <Link to="/casa"      > Casa </Link>
        <Link to="/tareas"    > Tareas </Link>
        <Link to="/proyectos" > Proyectos </Link>
        <Link to="/recursos"  > Recursos </Link>
        <Link to="/metas"     > Metas </Link>
        <Link to="/notas"     > Notas </Link>
        <Link to="/ajustes"   > Ajustes </Link>
    </Col >
  );
};

export default Sidebar;