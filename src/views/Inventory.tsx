import { useEffect, useState } from 'react';

import Container from 'react-bootstrap/Container';

import TableFilters from '../components/TableFilters';
import InventoryTable from '../components/InventoryTable';
import SearchForm from '../components/SearchForm';

import type { Filter, Item } from '../types/inventory.ts';
import AddProductModal from '../components/AddProductModal.tsx';

const filters: Filter[] = ['Todo', 'Comida', 'Aseo'];

const Inventory = () => {
  const [filter, setFilter] = useState<Filter>('Todo');
  const [inventory, setInventory] = useState<Item[]>([]);

  const shownItems =
    filter === 'Todo'
      ? inventory
      : inventory.filter((item) => item.category === filter);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/inventory/');
        const data = await response.json();
        setInventory(data);
      } catch (error) {
        console.log(error);
        alert('Error al obtener los productos...');
      }
    };

    getData();
  }, []);

  return (
    <>
      <h2 className="fw-bold d-inline">Inventario</h2>
      <Container className='px-1 my-4 p-0 d-flex justify-content-around gap-4'>
        <TableFilters
          filters={filters}
          filter={filter}
          onChange={setFilter}
        />
        <Container className='d-flex justify-content-around gap-3'>
          <SearchForm />
          <AddProductModal />
        </Container>
      </Container>
      <Container>
        <InventoryTable
          shownItems={shownItems}
        />
      </Container>
    </>
  );
};

export default Inventory;