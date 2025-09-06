import { createContext, useState, type ReactNode } from "react";
import type { Movie } from "./MoviesContext";

export interface CartItem extends Movie {
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (movie: Movie, quantity: number) => void;
  removeFromCart: (movieId: string) => void;
  updateQuantity: (movieId: string, quantity: number) => void;
  getTotalItems: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export { CartContext };

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (movie: Movie, quantity: number) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === movie.id);
      if (existingItem) {
        return prev.map((item) =>
          item.id === movie.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prev, { ...movie, quantity }];
      }
    });
  };

  const removeFromCart = (movieId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== movieId));
  };

  const updateQuantity = (movieId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(movieId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === movieId ? { ...item, quantity } : item
      )
    );
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const value: CartContextType = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    getTotalItems,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}
