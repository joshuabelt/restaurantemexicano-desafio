import { ImageSourcePropType } from 'react-native';

export interface MenuItem {
  id: string;
  type: 'food' | 'drink';
  name: string;
  price: number;
  image: ImageSourcePropType;
}

export type CartState = Record<string, number>;

export interface OrderItem {
  product: MenuItem;
  quantity: number;
  subtotal: number;
}

export interface Order {
  id: string;
  date: string;
  items: OrderItem[];
  subtotal: number;
  iva: number;
  total: number;
}