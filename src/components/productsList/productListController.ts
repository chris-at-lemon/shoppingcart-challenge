import { useEffect, useState } from "react";
import { Product, Cart } from "../../types";

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
    // example of not mutating state directly, not needed here as we just replace the state
    // let newProductslist = [...productList];
    // newProductslist.length = 0;
    // newProductslist.push(...thisProductsList.results);
    // setProductList(newProductslist);

    // set product count
    setProductCount(thisProductsList.count);
  };

  // Perform cart actions
  const [cart, setCart] = useRecoilState<Cart>(CartState);

  const handleAddToCart = (id: string, name: string, price: number, currency: string) => {
    const newCart = addToCart(cart, id, name, price, currency);
    setCart(newCart);
  };

  const handleRemoveFromCart = (id: string, name: string, price: number, currency: string) => {
    const newCart: any = removeFromCart(cart, id, name, price, currency);
    setCart(newCart);
  };

  // Pagination
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [prodPerPage, setProdPerPage] = useState<number>(20);

  const getNextPage = () => {
    if (currentPage === productCount / prodPerPage) {
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
    currentPage,
    productCount,
    prodPerPage,
    fn: {
      fetchProducts,
      handleRemoveFromCart,
      handleAddToCart,
      getNextPage,
      getPrevPage,
    },
  };
};
