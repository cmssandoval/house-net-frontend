import { useEffect, useState } from 'react';

import Container from 'react-bootstrap/Container';

import TableFilters from '@/components/TableFilters.tsx';
import InventoryTable from '@/components/InventoryTable.tsx';
import SearchForm from '@/components/SearchForm.tsx';

import type { Filter, Item } from '@/types/inventory.ts';
import AddProductModal from '@/components/AddProductModal.tsx';
import apiClient from '@/config/axiosConfig.ts';

const filters: Filter[] = ['Todo', 'Comida', 'Aseo'];

const Inventory = () => {
  const [filter, setFilter] = useState<Filter>('Todo');
  const [inventory, setInventory] = useState<Item[]>([]);

  const shownItems =
    filter === 'Todo'
      ? inventory
      : inventory.filter((item) => item.category.name === filter);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await apiClient('/inventory');
        setInventory(response.data);
      } catch (error) {
        console.log(error);
        alert('Error al obtener los productos...');
      }
    };

    getData();
  }, []);

  return (
    <Container className="inventory-page">
      <header className="inventory-heading">
        <h1 className="inventory-title">Inventario</h1>
      </header>
      <div className="inventory-toolbar">
        <TableFilters
          filters={filters}
          filter={filter}
          onChange={setFilter}
        />
        <div className="inventory-controls">
          <SearchForm />
          <AddProductModal />
        </div>
      </div>
      <div className="inventory-content">
        <InventoryTable
          shownItems={shownItems}
        />
      </div>
    </Container>
  );
};

export default Inventory;
