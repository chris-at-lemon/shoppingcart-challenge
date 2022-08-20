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
  const [productCount, setProductCount] = useState<number>(0);

  // Get products
  const fetchProducts = async (page: number, productList: Product[]) => {
    const thisProductsList = await getProducts(currentPage, productList);

    setProductList(thisProductsList.results);
    // is list exists, make a copy, destroy, push new list and update state
    // example of not mutating state directly
    //let newProductslist = [...productList];
    //newProductslist.length = 0;
    //newProductslist.push(...thisProductsList.results);
    //setProductList(newProductslist);

    // set product count
    setProductCount(thisProductsList.count);
  };

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

  // Pagination
  const [currentPage, setCurrentPage] = useState<number>(1);

  const getNextPage = () => {
    if (currentPage === productCount / 20) {
      return;
    }
    setCurrentPage((prevState) => prevState + 1);
  };
  const getPrevPage = () => {
    if (currentPage === 1) {
      return;
    }
    setCurrentPage((prevState) => prevState - 1);
  };

  // Get initial list and whenever page number changes
  useEffect(() => {
    fetchProducts(currentPage, productList);
  }, [currentPage]);

  return {
    productList,
    fn: {
      fetchProducts,
      handleRemoveFromCart,
      handleAddToCart,
      getNextPage,
      getPrevPage,
    },
  };
};
