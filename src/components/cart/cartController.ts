import { httpGet } from "../../modules/http";

export const useCart = () => {
  const getProducts = async () => {
    const results = await httpGet("http://localhost:3000/api/products");
    console.log(results);
  };

  return {};
};
