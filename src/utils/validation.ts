import { MenuItem } from '../types';

export const validateMenuItem = (item: Partial<MenuItem>): string | null => {
  if (!item.name || item.name.trim() === '') {
    return 'El nombre del producto es obligatorio.';
  }

  if (typeof item.price !== 'number' || !Number.isFinite(item.price) || item.price <= 0) {
    return 'El precio debe ser un número mayor que 0.';
  }

  return null;
};

export const validateQuantity = (quantity: number): string | null => {
  if (!Number.isInteger(quantity) || quantity <= 0) {
    return 'La cantidad debe ser un número entero mayor que 0.';
  }

  return null;
};
