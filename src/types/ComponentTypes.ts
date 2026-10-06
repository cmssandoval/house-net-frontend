export type Categoria = 'Comida' | 'Aseo';
export type Ubicacion = 'Cocina' | 'Despensa' | 'Baño';
export type Filtro = 'Todo' | Categoria | Ubicacion;

export interface Item {
    id: number;
    imagen_url: string;
    nombre: string;
    categoria: Categoria;
    ubicacion: Ubicacion;
    stock: number;
}

export interface InventoryTableProps {
    itemsMostrados: Item[];
}

export interface TableFiltersProps {
    filtros: Filtro[];
    filtro: Filtro;
    onChange: (filtro: Filtro) => void;
}