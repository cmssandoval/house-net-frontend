import { useCallback, useEffect, useState } from 'react';

import Container from 'react-bootstrap/Container';

import TableFilters from '@/components/TableFilters.tsx';
import InventoryTable from '@/components/InventoryTable.tsx';
import SearchForm from '@/components/SearchForm.tsx';

import type { Item } from '@/types/inventory.ts';
import AddProductModal from '@/components/AddProductModal.tsx';
import apiClient from '@/config/axiosConfig.ts';

const fetchInventory = async () => {
  const response = await apiClient.get<Item[]>('/inventory');
  return response.data;
};

const Inventory = () => {
  const [filter, setFilter] = useState('Todo');
  const [searchValue, setSearchValue] = useState('');
  const [inventory, setInventory] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadInventory = useCallback(async () => {
    try {
      setInventory(await fetchInventory());
    } catch (error) {
      console.error(error);
      alert('Error al obtener los productos...');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    let active = true;

    fetchInventory()
      .then((items) => {
        if (active) setInventory(items);
      })
      .catch((error: unknown) => {
        if (active) {
          console.error(error);
          alert('Error al obtener los productos...');
        }
      })
      .finally(() => {
        if (active) setIsLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const filters = ['Todo', ...new Set(inventory.map((item) => item.category.name))];
  const normalizedSearch = searchValue.trim().toLocaleLowerCase();
  const shownItems = inventory.filter((item) => {
    const matchesCategory = filter === 'Todo' || item.category.name === filter;
    const matchesSearch = item.productName.toLocaleLowerCase().includes(normalizedSearch);
    return matchesCategory && matchesSearch;
  });

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
          <SearchForm onSearch={setSearchValue} />
          <AddProductModal onProductAdded={loadInventory} />
        </div>
      </div>
      <div className="inventory-content">
        <InventoryTable
          shownItems={shownItems}
          isLoading={isLoading}
        />
      </div>
    </Container>
  );
};

export default Inventory;
