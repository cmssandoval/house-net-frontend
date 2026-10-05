import { useState } from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

import Sidebar from '../components/Sidebar';
import InventoryTable from '../components/InventoryTable';
import TableFilters from '../components/TableFilters';

import type { Filtro, Item } from '../types/ComponentTypes';

const filtros: Filtro[] = ['Todo', 'Comida', 'Aseo'];

const inventarioInicial: Item[] = [
  { id: 1, nombre: 'Té verde', categoria: 'Comida', cantidad: 4 },
  { id: 2, nombre: 'Detergente', categoria: 'Aseo', cantidad: 2 },
];

const Casa = () => {
  const [ filtro, setFiltro ] = useState<Filtro>('Todo');
  const [ inventario, setInventario ] = useState<Item[]>(inventarioInicial);

  const itemsMostrados =
    filtro === 'Todo'
      ? inventario
      : inventario.filter((item) => item.categoria === filtro);

  return (
    <>
      <Container fluid>
        <Row>
          <Col className="p-0 col-sm-4 col-md-3 col-xl-2">
            <Sidebar />
          </Col>
          <Col className="p-4 col-sm-8 col-md-9 col-xl-10">
            <Container className='mb-4 d-flex align-items-center gap-3'>
              <h2 className="fw-bold d-inline">Casa</h2>
              <TableFilters
                filtros={filtros}
                filtro={filtro}
                onChange={setFiltro}
              />
            </Container>
            <Container>
              <Row>
                <InventoryTable
                  itemsMostrados={itemsMostrados}
                />
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Casa;