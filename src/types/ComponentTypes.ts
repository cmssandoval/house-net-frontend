export type Categoria = 'Comida' | 'Aseo';
export type Filtro = 'Todo' | Categoria;

export interface Item {
    id: number;
    nombre: string;
    categoria: Categoria;
    cantidad: number;
}

export interface InventoryTableProps {
    itemsMostrados: Item[];
}

export interface TableFiltersProps {
    filtros: Filtro[];
    filtro: Filtro;
    onChange: (filtro: Filtro) => void;
}