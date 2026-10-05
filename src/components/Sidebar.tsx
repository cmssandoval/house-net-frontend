import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="d-flex">
      <div className="sidebar w-100">
        <h4 className="p-3 mb-0">Organizador</h4>

        <Link to="/"          > Dashboard </Link>
        <Link to="/casa"      > Casa </Link>
        <Link to="/tareas"    > Tareas </Link>
        <Link to="/proyectos" > Proyectos </Link>
        <Link to="/recursos"  > Recursos </Link>
        <Link to="/metas"     > Metas </Link>
        <Link to="/notas"     > Notas </Link>
        <Link to="/ajustes"   > Ajustes </Link>
      </div>
    </div>
  );
};

export default Sidebar;