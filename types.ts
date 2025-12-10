export type Language = 'uz' | 'ru';

export interface Product {
  id: string;
  nameUz: string;
  nameRu: string;
  category: Category;
  price: number; // Price per unit/meter
  unit: 'kg' | 'm' | 'don';
  image: string;
  specs: string;
}

export type Category = 'armatura' | 'truba' | 'list' | 'ugolnik' | 'shveller';

export interface CartItem extends Product {
  quantity: number;
}

export interface Translation {
  [key: string]: {
    uz: string;
    ru: string;
  };
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}