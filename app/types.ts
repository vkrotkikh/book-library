export interface BookTypes {
    id: string;
    name: string;
    category: string;
    price: number;
    description?: string;
  }

  
export type NewBookTypes = Omit<BookTypes, 'id'>;