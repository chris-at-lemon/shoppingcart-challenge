import { useRecoilState } from "recoil";
import { CartState } from "../atoms/cartAtom";

const [cart, setCart] = useRecoilState<any>(CartState);

export const addToCart = (id: string, name: string, price: number) => {
  let quantity = 1;
  if (cart.hasOwnProperty(id)) {
    quantity = cart[id].quantity + 1;
  }
  setCart({ ...cart, [id]: { name: name, price: price, quantity: quantity, subtotal: price * quantity } });
};
