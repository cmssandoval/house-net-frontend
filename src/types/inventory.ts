export type Category = 'Comida' | 'Aseo';
export type Location = 'Cocina' | 'Despensa' | 'Baño';
export type Filter = 'Todo' | Category | Location;

export interface Item {
    id: number;
    name: string;
    imageUrl: string;
    category: Category;
    location: Location;
    stock: number;
}

export interface InventoryTableProps {
    shownItems: Item[];
}

export interface TableFiltersProps {
    filters: Filter[];
    filter: Filter;
    onChange: (filter: Filter) => void;
}