import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import type { InventoryTableProps, Item } from '../types/inventory.ts';
import Row from 'react-bootstrap/Row';

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
                <td>{item.category}</td>
                <td>{item.location}</td>
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