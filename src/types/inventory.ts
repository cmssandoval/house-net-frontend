export interface ApiCatLoc {
    id: number;
    name: string;
}

export interface Item {
    id: number;
    productName: string;
    imageUrl: string | null;
    category: ApiCatLoc;
    location: ApiCatLoc;
    stock: number;
    unit: string;
}

export interface InventoryTableProps {
    shownItems: Item[];
    isLoading: boolean;
}

export interface TableFiltersProps {
    filters: string[];
    filter: string;
    onChange: (filter: string) => void;
}