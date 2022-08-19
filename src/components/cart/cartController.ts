import { httpGet } from "../../modules/http";
import { useRecoilState } from "recoil";
import { CartState } from "../../atoms/cartAtom";

export const useCart = () => {
  const [cart, setCart] = useRecoilState<any>(CartState);
  console.log("cartvalues", Object.values(cart));

  const total = Object.values(cart).reduce((acc, curr: any) => (acc = acc + curr["subtotal"]), 0);

  console.log("res", total);

  const getProducts = async () => {
    const results = await httpGet("http://localhost:3000/api/products");
    console.log(results);
  };

  return { cart };
};
