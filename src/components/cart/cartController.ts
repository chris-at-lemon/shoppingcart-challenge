import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { CartState } from "../../atoms/cartAtom";
import { addToCart, removeFromCart, addQuantity, calcTotal } from "../../modules/cartActions";
import { oddOrEven } from "../../modules/utilities";

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

  const handleAddQuantity = (newQuantity: AddQuantityItem) => {
    const newCart = addQuantity(cart, newQuantity);
    setCart(newCart);
    setQuantityInputValue({ id: "", quantity: "" });
  };

  const handleResetCart = () => {
    setCart({});
  };

  // Handle quantity input
  const [quantityInputValue, setQuantityInputValue] = useState({
    id: "",
    quantity: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, productId: string) => {
    const onlyNumbers = e.target.value.replace(/\D/g, "");
    setQuantityInputValue({ id: productId, quantity: onlyNumbers });
  };

  // Calculate total
  const [total, setTotal] = useState<number>(0);
  const handleTotal = (cart: Cart) => {
    const total = calcTotal(cart);
    setTotal(total);
  };
  useEffect(() => {
    handleTotal(cart);
  }, [cart]);

  // Above is the React way with states, in this case a quick 3 liner may be more efficient
  // let total: number = 0;
  // if (cart) {
  //   total = Object.values(cart).reduce((acc, curr: any) => (acc = acc + curr["subtotal"]), 0);
  // }

  return {
    cart,
    total,
    quantityInputValue,
    fn: {
      handleAddToCart,
      handleRemoveFromCart,
      handleAddQuantity,
      handleInputChange,
      handleResetCart,
    },
  };
};
