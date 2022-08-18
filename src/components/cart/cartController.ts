import { httpGet } from "../../modules/http";
import { useRecoilState } from "recoil";
import { CartState } from "../../atoms/cartAtom";

export const useCart = () => {
  const [cart, setCart] = useRecoilState(CartState);

  const getProducts = async () => {
    const results = await httpGet("http://localhost:3000/api/products");
    console.log(results);
  };

  return {};
};
