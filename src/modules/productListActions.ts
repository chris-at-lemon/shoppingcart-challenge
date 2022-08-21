import { httpGet } from "../modules/http";
import { Product } from "../types";

export const getProducts = async (pageNumber: number, productList: Product[]) => {
  const results = await httpGet(`http://localhost:3000/api/products?page=${pageNumber}`);
  let NewProductList = [...productList];

  return results.response;
};
