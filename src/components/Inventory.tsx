import { useEffect, useState } from 'react';

import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

import TableFilters from './TableFilters';
import InventoryTable from './InventoryTable';
import SearchForm from './SearchForm';

import type { Filtro, Item } from '../types/ComponentTypes';

const filtros: Filtro[] = ['Todo', 'Comida', 'Aseo'];

const Inventory = () => {
  const [filtro, setFiltro] = useState<Filtro>('Todo');
  const [inventario, setInventario] = useState<Item[]>([]);

  const itemsMostrados =
    filtro === 'Todo'
      ? inventario
      : inventario.filter((item) => item.categoria === filtro);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch('/test-data.json');
        const data = await response.json();
        setInventario(data);
      } catch (error) {
        console.log(error);
        alert('Error al obtener los productos...');
      }
    };

    getData();
  }, []);

  return (
    <Col className="p-4 px-lg-5 col-12 col-lg-9 col-xl-10">
      <Container className='mb-4 d-flex align-items-center gap-4'>
        <h2 className="fw-bold d-inline">Casa</h2>
        <TableFilters
          filtros={filtros}
          filtro={filtro}
          onChange={setFiltro}
        />
        <SearchForm />
      </Container>
      <Container>
        <InventoryTable
          itemsMostrados={itemsMostrados}
        />
      </Container>
    </Col>
  );
};

export default Inventory;