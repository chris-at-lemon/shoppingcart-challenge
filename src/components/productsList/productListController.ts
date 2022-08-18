import { useEffect, useState } from "react";
import { httpGet } from "../../modules/http";
import { Product } from "../../types";

export const useProductList = () => {
  const [productList, setProductList] = useState<Product[]>([]);

  const getProducts = async (pageNumber: number) => {
    const results = await httpGet(`http://localhost:3000/api/products?page=${pageNumber}`);
    let NewProductList = [...productList];

    if (productList.length === 0) {
      setProductList(results.response.results);
    } else {
      // If state exists do not set state directly. Use copy, empty array, push new array, update state
      NewProductList.length = 0;
      NewProductList.push(...results.response.results);
      setProductList(NewProductList);
    }
    console.log(results.response.results);
  };

  useEffect(() => {
    getProducts(1);
  }, []);

  return {
    productList,
    fn: {
      getProducts,
    },
  };
};
