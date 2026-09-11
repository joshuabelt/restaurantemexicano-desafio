import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CartState, Order } from '../types';

const HISTORY_KEY = '@order_history';

interface AppContextType {
  cart: CartState;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  history: Order[];
  saveOrder: (order: Order) => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartState>({});
  const [history, setHistory] = useState<Order[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const storedHistory = await AsyncStorage.getItem(HISTORY_KEY);
        if (storedHistory) setHistory(JSON.parse(storedHistory));
      } catch (error) {
        console.error('Error cargando historial:', error);
      }
    };
    loadData();
  }, []);

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => {
      const newQty = (prev[id] || 0) + delta;
      const updated = { ...prev };
      if (newQty <= 0) delete updated[id];
      else updated[id] = newQty;
      return updated;
    });
  };

  const clearCart = () => setCart({});

  const saveOrder = async (order: Order) => {
    try {
      const newHistory = [order, ...history];
      setHistory(newHistory);
      await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));
    } catch (error) {
      console.error('Error guardando orden:', error);
    }
  };

  return (
    <AppContext.Provider value={{ cart, updateQuantity, clearCart, history, saveOrder }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext debe usarse dentro de AppProvider');
  return context;
};