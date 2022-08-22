import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { CartState } from "../../atoms/cartAtom";
import { addToCart, removeFromCart, addQuantity } from "../../modules/cartActions";

import { Cart, CartItem, RemoveCartItem, AddQuantityItem } from "../../types";

export const cartController = () => {
  const [cart, setCart] = useRecoilState<Cart>(CartState);
  console.log(cart);

  // Cart actions
  const handleAddToCart = (cartItem: CartItem) => {
    const newCart = addToCart(cart, cartItem);
    setCart(newCart);
  };

  const handleRemoveFromCart = (cartItem: RemoveCartItem) => {
    const newCart = removeFromCart(cart, cartItem);
    setCart(newCart);
  };

  // Handle quantity input
  const [quantityInputValue, setQuantityInputValue] = useState({
    id: "",
    quantity: "",
  });

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>, productId: string) => {
    const onlyNumbers = e.currentTarget.value.replace(/\D/g, "");
    setQuantityInputValue({ id: productId, quantity: onlyNumbers });
  };

  const handleAddQuantity = (newQuantity: AddQuantityItem) => {
    const newCart = addQuantity(cart, newQuantity);
    setCart(newCart);
    setQuantityInputValue({ id: "", quantity: "" });
  };

  // Calculate total
  let total: number = 0;
  if (cart) {
    total = Object.values(cart).reduce((acc, curr: any) => (acc = acc + curr["subtotal"]), 0);
  }

  return {
    cart,
    total,
    quantityInputValue,
    fn: {
      handleAddToCart,
      handleRemoveFromCart,
      handleAddQuantity,
      handleInputChange,
    },
  };
};
