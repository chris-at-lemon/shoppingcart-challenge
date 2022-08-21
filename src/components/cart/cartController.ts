import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { CartState } from "../../atoms/cartAtom";
import { addToCart, removeFromCart } from "../../modules/cartActions";

import { Cart } from "../../types";

export const cartController = () => {
  const [cart, setCart] = useRecoilState<Cart>(CartState);

  const handleAddToCart = (id: string, name: string, price: number, currency: string) => {
    if (cart !== null) {
      const newCart = addToCart(cart, id, name, price, currency);
      setCart(newCart);
    }
  };

  const handleRemoveFromCart = (id: string, name: string, price: number, currency: string) => {
    if (cart !== null) {
      const newCart = removeFromCart(cart, id, name, price, currency);
      setCart(newCart);
    }
  };

  // Calculate total
  let total: any = 0;
  if (cart) {
    total = Object.values(cart).reduce((acc, curr: any) => (acc = acc + curr["subtotal"]), 0);
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
