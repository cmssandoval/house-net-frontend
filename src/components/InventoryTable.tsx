import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Row from 'react-bootstrap/Row';
import type { InventoryTableProps } from '@/types/inventory.ts';

const InventoryTable = ({ shownItems, isLoading }: InventoryTableProps) => {
  return (
    <Row className="inventory-table-row">
      <Card className="inventory-table-card card-custom">
        <Table responsive className="inventory-table mb-0">
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
            {isLoading ? (
              <tr>
                <td className="inventory-table-empty" colSpan={5}>Cargando inventario...</td>
              </tr>
            ) : shownItems.length === 0 ? (
              <tr>
                <td className="inventory-table-empty" colSpan={5}>
                  No hay productos que coincidan.
                </td>
              </tr>
            ) : (
            shownItems.map((item) => (
              <tr key={item.id}>
                <td>{item.productName}</td>
                <td>
                  {item.imageUrl ? (
                    <img
                      className="inventory-product-image"
                      src={item.imageUrl}
                      alt={item.productName}
                    />
                  ) : (
                    <span className="inventory-image-placeholder">Sin imagen</span>
                  )}
                </td>
                <td>{item.category.name}</td>
                <td>{item.location.name}</td>
                <td>{`${item.stock} ${item.unit}`}</td>
              </tr>
            ))
            )}
          </tbody>
        </Table>
      </Card>
    </Row>
  );
};

export default InventoryTable;