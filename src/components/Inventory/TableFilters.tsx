import Form from 'react-bootstrap/Form';
import type { Filter, TableFiltersProps } from '@/types/inventory.ts';

const TableFilters = ({ filters, filter, onChange }: TableFiltersProps) => {
  return (
    <Form.Select
      name='filter'
      value={ filter }
      onChange={( event ) => onChange( event.target.value as Filter )}
      className="d-inline w-auto shadow-sm"
      aria-label="Seleccionar filtro"
    >
      {filters.map(( filter ) => (
        <option key={ filter } value={ filter }>
          { filter }
        </option>
      ))}
    </Form.Select>
  );
};

export default TableFilters;