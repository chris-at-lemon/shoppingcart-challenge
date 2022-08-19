import { useRecoilState } from "recoil";
import { CartState } from "../../atoms/cartAtom";
import { addToCart, removeFromCart } from "../../modules/cartActions";

export const useCart = () => {
  const [cart, setCart] = useRecoilState<any>(CartState);

  const handleAddToCart = (id: string, name: string, price: number) => {
    const newCart = addToCart(cart, id, name, price);
    setCart(newCart);
  };

  const handleRemoveFromCart = (id: string, name: string, price: number) => {
    const newCart = removeFromCart(cart, id, name, price);
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
