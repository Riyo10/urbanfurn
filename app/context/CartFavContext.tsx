'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type Product = {
  id: string;
  name: string;
  img: string;
  price: string;
  category: string;
};

type ContextType = {
  cart: Product[];
  favorites: Product[];
  toggleCart: (product: Product) => void;
  toggleFavorite: (product: Product) => void;
  isInCart: (id: string) => boolean;
  isFavorite: (id: string) => boolean;
  clearCart: () => void; // ✅ NEW
};

const CartFavContext = createContext<ContextType | undefined>(undefined);

const STORAGE_KEYS = {
  cart: 'myapp_cart',
  favorites: 'myapp_favorites',
};

export const CartFavProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<Product[]>([]);
  const [favorites, setFavorites] = useState<Product[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    const storedCart = localStorage.getItem(STORAGE_KEYS.cart);
    const storedFavorites = localStorage.getItem(STORAGE_KEYS.favorites);

    if (storedCart) setCart(JSON.parse(storedCart));
    if (storedFavorites) setFavorites(JSON.parse(storedFavorites));
  }, []);

  // Sync cart to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(cart));
  }, [cart]);

  // Sync favorites to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.favorites, JSON.stringify(favorites));
  }, [favorites]);

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
    localStorage.removeItem(STORAGE_KEYS.cart); // ✅ optional, to also clean up localStorage immediately
  };

  return (
    <CartFavContext.Provider
      value={{ cart, favorites, toggleCart, toggleFavorite, isInCart, isFavorite, clearCart }}
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
