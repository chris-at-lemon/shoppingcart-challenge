import { useEffect, useState } from "react";
import { httpGet } from "../../modules/http";
import { Product } from "../../types";

import { useRecoilState } from "recoil";
import { CartState } from "../../atoms/cartAtom";

import { getProducts } from "../../modules/productListActions";
import { addToCart, removeFromCart } from "../../modules/cartActions";

export const useProductList = () => {
  // Products list global state
  const [productList, setProductList] = useState<Product[]>([]);

  // Get products
  const fetchProducts = async (page: number, productList: Product[]) => {
    const initialProductsList = await getProducts(page, productList);
    setProductList(initialProductsList);
  };

  // Get initial list
  useEffect(() => {
    fetchProducts(1, productList);
  }, []);

  // Perform cart actions
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
      fetchProducts,
      handleRemoveFromCart,
      handleAddToCart,
    },
  };
};
