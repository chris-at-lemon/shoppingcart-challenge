import { httpGet } from "../modules/http";

export const getProducts = async (pageNumber: number, productList: any) => {
  const results = await httpGet(`http://localhost:3000/api/products?page=${pageNumber}`);
  let NewProductList = [...productList];

  if (productList.length === 0) {
    return results.response.results;
  } else {
    NewProductList.length = 0;
    NewProductList.push(...results.response.results);
    return NewProductList;
  }
};
