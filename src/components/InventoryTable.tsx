import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import type { InventoryTableProps, Item } from '../types/ComponentTypes';
import Row from 'react-bootstrap/Row';

const InventoryTable = ({ itemsMostrados }: InventoryTableProps) => {
  return (
    <Row>
      <Card className='p-2 card-custom'>
        <Table className='text-center'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Producto</th>
              <th>Categoría</th>
              <th>Cantidad</th>
            </tr>
          </thead>
          <tbody>
            {itemsMostrados.map((item: Item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.nombre}</td>
                <td>{item.categoria}</td>
                <td>{item.cantidad}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </Row>
  );
};

export default InventoryTable;