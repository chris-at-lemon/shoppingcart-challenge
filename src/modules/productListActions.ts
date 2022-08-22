import { httpGet } from "../modules/http";
import { Product } from "../types";

export const getProducts = async (pageNumber: number, productList: Product[]) => {
  const results = await httpGet(`http://localhost:3000/api/products?page=${pageNumber}`);
  return results.response;
};

export const getSingleProduct = async (gtin: string) => {
  const results = await httpGet(`http://localhost:3000/api/products/${gtin}`);
  return results.response;
};
