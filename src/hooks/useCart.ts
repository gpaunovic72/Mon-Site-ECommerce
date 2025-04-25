import { fetchGetCart } from "@/lib/api/cart";
import { useCallback, useEffect, useState } from "react";
import { useAuthStatus } from "./useAuthStatus";

type CartItem = {
  id: number;
  quantity: number;
  product: {
    id: number;
    name: string;
    price: number;
    picture: string;
  };
};

export function useCart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isLoggedIn } = useAuthStatus();

  const refreshCart = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await fetchGetCart();
      setCartItems(data);
      setError(null);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Erreur lors de la récupération du panier"
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const handleCartUpdate = () => {
      refreshCart();
    };

    window.addEventListener("cartUpdated", handleCartUpdate);
    return () => window.removeEventListener("cartUpdated", handleCartUpdate);
  }, [refreshCart]);

  useEffect(() => {
    refreshCart();
  }, [refreshCart, isLoggedIn]);

  return { cartItems, isLoading, error, refreshCart };
}
