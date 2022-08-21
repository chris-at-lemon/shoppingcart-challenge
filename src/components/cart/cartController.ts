import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { CartState } from "../../atoms/cartAtom";
import { addToCart, removeFromCart } from "../../modules/cartActions";

import { Cart } from "../../types";

export const cartController = () => {
  const [cart, setCart] = useCart();

  const handleAddToCart = (id: string, name: string, price: number, currency: string) => {
    const newCart = addToCart(cart, id, name, price, currency);
    setCart(newCart);
  };

  const handleRemoveFromCart = (id: string, name: string, price: number, currency: string) => {
    const newCart = removeFromCart(cart, id, name, price, currency);
    setCart(newCart);
  };

  // Calculate total
  let total: number = 0;
  if (cart) {
    total = Object.values(cart).reduce((acc, curr) => (acc = acc + curr["subtotal"]), 0);
  }

  return {
    cart,
    total,
    fn: {
      handleAddToCart,
      handleRemoveFromCart,
    },
  };
};

export function useCart() {
  const [isInitial, setIsInitial] = useState(true);
  const [cartStored, setCartStored] = useRecoilState<Cart>(CartState);

  useEffect(() => {
    setIsInitial(false);
  }, []);

  return [isInitial ? false : cartStored, setCartStored] as const;
}
