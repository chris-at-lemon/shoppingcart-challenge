import { useRecoilState } from "recoil";
import { CartState } from "../../atoms/cartAtom";
import { addToCart, removeFromCart } from "../../modules/cartActions";

import { CartInterface } from "../../types";

export const useCart = () => {
  const [cart, setCart] = useRecoilState<CartInterface>(CartState);
  console.log(cart);

  const handleAddToCart = (id: string, name: string, price: number, currency: string) => {
    const newCart = addToCart(cart, id, name, price, currency);
    setCart(newCart);
  };

  const handleRemoveFromCart = (id: string, name: string, price: number, currency: string) => {
    const newCart = removeFromCart(cart, id, name, price, currency);
    setCart(newCart);
  };

  // Calculate total
  let total: number | any = 0;
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
