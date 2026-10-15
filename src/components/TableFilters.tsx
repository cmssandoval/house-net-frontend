import Form from 'react-bootstrap/Form';
import type { Filtro, TableFiltersProps } from '../types/ComponentTypes';

const TableFilters = ({ filtros, filtro, onChange }: TableFiltersProps) => {
  return (
    <Form.Select
      value={ filtro }
      onChange={( event ) => onChange( event.target.value as Filtro )}
      className="d-inline w-auto"
      aria-label="Seleccionar filtro"
    >
      {filtros.map(( filtro ) => (
        <option key={ filtro } value={ filtro }>
          { filtro }
        </option>
      ))}
    </Form.Select>
  );
};

export default TableFilters;