import { httpGet } from "../modules/http";

export const getProducts = async (pageNumber: number, productList: any) => {
  const results = await httpGet(`http://localhost:3000/api/products?page=${pageNumber}`);
  let NewProductList = [...productList];

  return results.response;
};
