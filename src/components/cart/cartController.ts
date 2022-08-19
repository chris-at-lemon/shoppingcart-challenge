import { httpGet } from "../../modules/http";
import { useRecoilState } from "recoil";
import { CartState } from "../../atoms/cartAtom";

export const useCart = () => {
  const [cart, setCart] = useRecoilState<any>(CartState);

  const addToCart = (id: string, name: string, price: number) => {
    let quantity = 1;
    if (cart.hasOwnProperty(id)) {
      quantity = cart[id].quantity + 1;
    }
    setCart({ ...cart, [id]: { name: name, price: price, quantity: quantity, subtotal: price * quantity } });
  };

  const removeFromCart = (id: string, name: string, price: number) => {
    let newCart = { ...cart };

    if (newCart[id] !== undefined) {
      let quantity = newCart[id].quantity;

      if (newCart[id].quantity === 1) {
        delete newCart[id];
        setCart(newCart);
      }
      if (Object.keys(newCart).length > 0) {
        if (newCart[id].quantity > 1) {
          quantity = newCart[id].quantity - 1;
          setCart({ ...cart, [id]: { name: name, price: price, quantity: quantity, subtotal: price * quantity } });
        }
      }
    }
  };

  // Calculate total
  const total: number | any = Object.values(cart).reduce((acc, curr: any) => (acc = acc + curr["subtotal"]), 0);
  console.log("res", total);

  const getProducts = async () => {
    const results = await httpGet("http://localhost:3000/api/products");
    console.log(results);
  };

  return {
    cart,
    total,
    fn: {
      addToCart,
      removeFromCart,
    },
  };
};
