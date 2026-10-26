export type Category = 'Comida' | 'Aseo';
export type Location = 'Cocina' | 'Despensa' | 'Baño';
export type Filter = 'Todo' | Category | Location;

interface ApiCatLoc {
    id: number;
    name: string;
}



export interface Item {
    id: number;
    name: string;
    imageUrl: string;
    category: ApiCatLoc;
    location: ApiCatLoc;
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