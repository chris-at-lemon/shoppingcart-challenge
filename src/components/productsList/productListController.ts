import { useEffect, useState } from "react";
import { httpGet } from "../../modules/http";
import { Product } from "../../types";

import { useRecoilState } from "recoil";
import { CartState } from "../../atoms/cartAtom";

import { addToCart, removeFromCart } from "../../modules/cartActions";

export const useProductList = () => {
  // Products list
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
    // console.log(results.response.results);
  };

  useEffect(() => {
    getProducts(1);
  }, []);

  // Cart
  const [cart, setCart] = useRecoilState<any>(CartState);

  const handleAddToCart = (id: string, name: string, price: number) => {
    const newCart = addToCart(cart, id, name, price);
    setCart(newCart);
  };

  const handleRemoveFromCart = (id: string, name: string, price: number) => {
    const newCart = removeFromCart(cart, id, name, price);
    setCart(newCart);
  };

  return {
    productList,
    fn: {
      getProducts,
      handleRemoveFromCart,
      handleAddToCart,
    },
  };
};
