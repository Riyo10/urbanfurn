'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type Product = {
  id: string;
  name: string;
  img: string;
  price: string;
  category: string;
};

type Order = {
  id: string;
  date: string;
  items: Product[];
  total: number;
};

type ContextType = {
  cart: Product[];
  favorites: Product[];
  orders: Order[];
  toggleCart: (product: Product) => void;
  toggleFavorite: (product: Product) => void;
  isInCart: (id: string) => boolean;
  isFavorite: (id: string) => boolean;
  clearCart: () => void;
  placeOrder: () => void;
};

const CartFavContext = createContext<ContextType | undefined>(undefined);

const STORAGE_KEYS = {
  cart: 'myapp_cart',
  favorites: 'myapp_favorites',
  orders: 'myapp_orders',
};

export const CartFavProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<Product[]>([]);
  const [favorites, setFavorites] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    const storedCart = localStorage.getItem(STORAGE_KEYS.cart);
    const storedFavorites = localStorage.getItem(STORAGE_KEYS.favorites);
    const storedOrders = localStorage.getItem(STORAGE_KEYS.orders);

    if (storedCart) setCart(JSON.parse(storedCart));
    if (storedFavorites) setFavorites(JSON.parse(storedFavorites));
    if (storedOrders) setOrders(JSON.parse(storedOrders));
  }, []);

  // Sync cart to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(cart));
  }, [cart]);

  // Sync favorites to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.favorites, JSON.stringify(favorites));
  }, [favorites]);

  // Sync orders to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.orders, JSON.stringify(orders));
  }, [orders]);

  const toggleCart = (product: Product) => {
    setCart((prev) =>
      prev.find((p) => p.id === product.id)
        ? prev.filter((p) => p.id !== product.id)
        : [...prev, product]
    );
  };

  const toggleFavorite = (product: Product) => {
    setFavorites((prev) =>
      prev.find((p) => p.id === product.id)
        ? prev.filter((p) => p.id !== product.id)
        : [...prev, product]
    );
  };

  const isInCart = (id: string) => cart.some((p) => p.id === id);
  const isFavorite = (id: string) => favorites.some((p) => p.id === id);

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem(STORAGE_KEYS.cart);
  };

  const placeOrder = () => {
    if (cart.length === 0) return;

    const total = cart.reduce((sum, item) => sum + parseFloat(item.price), 0);
    const newOrder: Order = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      items: [...cart],
      total,
    };

    setOrders((prev) => [...prev, newOrder]);
    clearCart();
  };

  return (
    <CartFavContext.Provider
      value={{
        cart,
        favorites,
        orders,
        toggleCart,
        toggleFavorite,
        isInCart,
        isFavorite,
        clearCart,
        placeOrder,
      }}
    >
      {children}
    </CartFavContext.Provider>
  );
};

export const useCartFav = () => {
  const context = useContext(CartFavContext);
  if (!context) throw new Error('useCartFav must be used within CartFavProvider');
  return context;
};
