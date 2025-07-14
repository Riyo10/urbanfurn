'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext'; // adjust if path differs

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
  isLoggedIn: boolean;
  showAlert: (message: string) => void;
};

const CartFavContext = createContext<ContextType | undefined>(undefined);

const STORAGE_KEYS = {
  cart: 'myapp_cart',
  favorites: 'myapp_favorites',
  orders: 'myapp_orders',
};

export const CartFavProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Product[]>([]);
  const [favorites, setFavorites] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const { user } = useAuth(); // ✅ using Firebase Auth
  const isLoggedIn = !!user;
  const router = useRouter();

  // For custom alert modal:
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  // Load from localStorage **only when logged in** and clear on logout
  useEffect(() => {
    if (isLoggedIn) {
      const storedCart = localStorage.getItem(STORAGE_KEYS.cart);
      const storedFavorites = localStorage.getItem(STORAGE_KEYS.favorites);
      const storedOrders = localStorage.getItem(STORAGE_KEYS.orders);

      if (storedCart) setCart(JSON.parse(storedCart));
      else setCart([]);

      if (storedFavorites) setFavorites(JSON.parse(storedFavorites));
      else setFavorites([]);

      if (storedOrders) setOrders(JSON.parse(storedOrders));
      else setOrders([]);
    } else {
      // Clear cart, favorites, orders on logout
      setCart([]);
      setFavorites([]);
      setOrders([]);
      localStorage.removeItem(STORAGE_KEYS.cart);
      localStorage.removeItem(STORAGE_KEYS.favorites);
      localStorage.removeItem(STORAGE_KEYS.orders);
    }
  }, [isLoggedIn]);

  // Sync to localStorage on change (only if logged in)
  useEffect(() => {
    if (isLoggedIn) {
      localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(cart));
    }
  }, [cart, isLoggedIn]);

  useEffect(() => {
    if (isLoggedIn) {
      localStorage.setItem(STORAGE_KEYS.favorites, JSON.stringify(favorites));
    }
  }, [favorites, isLoggedIn]);

  useEffect(() => {
    if (isLoggedIn) {
      localStorage.setItem(STORAGE_KEYS.orders, JSON.stringify(orders));
    }
  }, [orders, isLoggedIn]);

  // Custom alert function
  const showAlert = (message: string) => {
    setAlertMessage(message);
  };

  // Close alert modal
  const closeAlert = () => {
    setAlertMessage(null);
  };

  const toggleCart = (product: Product) => {
    if (!isLoggedIn) {
      showAlert('Please log in to add/remove items in your cart.');
      router.push('/login');
      return;
    }

    setCart((prev) =>
      prev.find((p) => p.id === product.id)
        ? prev.filter((p) => p.id !== product.id)
        : [...prev, product]
    );
  };

  const toggleFavorite = (product: Product) => {
    if (!isLoggedIn) {
      showAlert('Please log in to add/remove favorites.');
      router.push('/login');
      return;
    }

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
    if (!isLoggedIn) {
      showAlert('Please log in to place an order.');
      router.push('/login');
      return;
    }

    if (cart.length === 0) return;

    const total = cart.reduce((sum, item) => parseFloat(item.price) + sum, 0);
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
        isLoggedIn,
        showAlert,
      }}
    >
      {children}

      {/* Custom Alert Toast (bottom-right) */}
      {alertMessage && (
        <div className="fixed bottom-4 right-4 z-50 bg-white rounded-lg shadow-lg p-4 max-w-xs w-full">
          <p className="text-gray-900">{alertMessage}</p>
          <button
            onClick={closeAlert}
            className="mt-2 bg-[#004744] text-white px-4 py-2 rounded hover:bg-[#003a38]"
          >
            Close
          </button>
        </div>
      )}
    </CartFavContext.Provider>
  );
};

export const useCartFav = () => {
  const context = useContext(CartFavContext);
  if (!context) throw new Error('useCartFav must be used within CartFavProvider');
  return context;
};
