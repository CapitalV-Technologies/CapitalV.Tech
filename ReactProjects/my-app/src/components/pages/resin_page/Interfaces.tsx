interface ItemDataRow {
        temperature: number;
        [key: string]: any;
    }

interface Resin_t {
        name: string; 
        id: string;
    }

interface Property_t {
        name: string; 
    }

interface Data_t {
    x: number,
    y: any
}

export type { ItemDataRow, Resin_t, Property_t, Data_t}