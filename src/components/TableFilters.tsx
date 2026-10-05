import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';

import type { TableFiltersProps } from '../types/ComponentTypes';

const TableFilters = ({ filtros, filtro, onChange }: TableFiltersProps) => {
  return (
    <ButtonGroup className='d-inline'>
      {filtros.map((f) => (
        <ToggleButton
          key={f}
          id={`radio-${f}`}
          type="radio"
          variant='outline-secondary'
          name="filtro"
          value={f}
          checked={filtro === f}
          onChange={() => onChange(f)}
        > {f} </ToggleButton>
      ))}
    </ButtonGroup>
  );
};

export default TableFilters;