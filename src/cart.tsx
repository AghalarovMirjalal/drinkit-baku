import { createContext, ReactNode, useContext, useState } from 'react';

export type CartItem = {
  key: string;
  id: string;
  name: string;
  size: string;
  milk: string;
  price: number;
  count: number;
};

type CartContextType = {
  items: CartItem[];
  add: (item: Omit<CartItem, 'key' | 'count'>) => void;
  clear: () => void;
  total: number;
  count: number;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const add: CartContextType['add'] = (item) => {
    const key = `${item.id}-${item.size}-${item.milk}`;
    setItems((prev) => {
      const found = prev.find((i) => i.key === key);
      if (found) {
        return prev.map((i) => (i.key === key ? { ...i, count: i.count + 1 } : i));
      }
      return [...prev, { ...item, key, count: 1 }];
    });
  };

  const total = items.reduce((sum, i) => sum + i.price * i.count, 0);
  const count = items.reduce((sum, i) => sum + i.count, 0);

  return (
    <CartContext.Provider value={{ items, add, clear: () => setItems([]), total, count }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
}
