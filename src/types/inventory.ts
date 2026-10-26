export type Category = 'Comida' | 'Aseo';
export type Location = 'Cocina' | 'Despensa' | 'Baño';
export type Filter = 'Todo' | Category | Location;

interface ApiCatLoc {
    id: number;
    name: string;
}

export interface Item {
    id: number;
    productName: string;
    imageUrl: string;
    category: ApiCatLoc;
    location: ApiCatLoc;
    stock: number;
    unit: string;
}

export interface InventoryTableProps {
    shownItems: Item[];
}

export interface TableFiltersProps {
    filters: Filter[];
    filter: Filter;
    onChange: (filter: Filter) => void;
}