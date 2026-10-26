import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Row from 'react-bootstrap/Row';
import type { InventoryTableProps, Item } from '@/types/inventory.ts';

const InventoryTable = ({ shownItems }: InventoryTableProps) => {
  return (
    <Row>
      <Card className='p-2 card-custom'>
        <Table responsive className='text-center'>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Imagen</th>
              <th>Categoría</th>
              <th>Ubicación</th>
              <th>Stock</th>
            </tr>
          </thead>
          <tbody>
            {shownItems.map((item: Item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.imageUrl}</td>
                <td>{item.category.name}</td>
                <td>{item.location.name}</td>
                <td>{item.stock}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </Row>
  );
};

export default InventoryTable;