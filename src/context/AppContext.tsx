import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CartState, Order } from '../types';
import { MAX_QUANTITY_PER_PRODUCT } from '../utils/validation';

const HISTORY_KEY_PREFIX = '@order_history:';

interface AppContextType {
  currentUser: string | null;
  login: (username: string) => void;
  logout: () => void;
  cart: CartState;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  history: Order[];
  saveOrder: (order: Order) => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [cart, setCart] = useState<CartState>({});
  const [history, setHistory] = useState<Order[]>([]);

  const login = (username: string) => {
    setCurrentUser(username);
    setCart({});
    setHistory([]);
  };

  const logout = () => {
    setCurrentUser(null);
    setCart({});
    setHistory([]);
  };

  useEffect(() => {
    if (!currentUser) return;

    let cancelled = false;

    const loadData = async () => {
      try {
        const historyKey = `${HISTORY_KEY_PREFIX}${currentUser}`;
        const storedHistory = await AsyncStorage.getItem(historyKey);
        if (!cancelled) setHistory(storedHistory ? JSON.parse(storedHistory) : []);
      } catch (error) {
        if (!cancelled) console.error('Error cargando historial:', error);
      }
    };
    loadData();

    return () => {
      cancelled = true;
    };
  }, [currentUser]);

  const updateQuantity = (id: string, delta: number) => {
    if (!Number.isInteger(delta) || delta === 0) return;

    setCart(prev => {
      const newQty = (prev[id] || 0) + delta;
      if (newQty > MAX_QUANTITY_PER_PRODUCT) return prev;

      const updated = { ...prev };
      if (newQty <= 0) delete updated[id];
      else updated[id] = newQty;
      return updated;
    });
  };

  const clearCart = () => setCart({});

  const saveOrder = async (order: Order) => {
    if (!currentUser) throw new Error('No hay un usuario autenticado.');

    try {
      const newHistory = [order, ...history];
      setHistory(newHistory);
      const historyKey = `${HISTORY_KEY_PREFIX}${currentUser}`;
      await AsyncStorage.setItem(historyKey, JSON.stringify(newHistory));
    } catch (error) {
      console.error('Error guardando orden:', error);
      throw error;
    }
  };

  return (
    <AppContext.Provider value={{ currentUser, login, logout, cart, updateQuantity, clearCart, history, saveOrder }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext debe usarse dentro de AppProvider');
  return context;
};