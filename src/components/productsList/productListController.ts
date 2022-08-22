import { useEffect, useState } from "react";
import { Product, Cart, CartItem, AddQuantityItem } from "../../types";

import { useRecoilState } from "recoil";
import { CartState } from "../../atoms/cartAtom";

import { getProducts } from "../../modules/productListActions";
import { addToCart, removeFromCart, addQuantity } from "../../modules/cartActions";

export const useProductList = () => {
  // Products list global state
  const [productList, setProductList] = useState<Product[]>([]);
  const [productCount, setProductCount] = useState<number>(0);

  // Get products
  const fetchProducts = async (page: number, productList: Product[]) => {
    const thisProductsList = await getProducts(currentPage, productList);

    setProductList(thisProductsList.results);
    setProductCount(thisProductsList.count);
  };

  // Perform cart actions
  const [cart, setCart] = useRecoilState<Cart>(CartState);

  // Cart actions
  const handleAddToCart = (cartItem: CartItem) => {
    const newCart = addToCart(cart, cartItem);
    setCart(newCart);
  };

  const handleRemoveFromCart = (cartItem: CartItem) => {
    const newCart = removeFromCart(cart, cartItem);
    setCart(newCart);
  };

  const handleAddQuantity = (newQuantity: AddQuantityItem) => {
    const newCart = addQuantity(cart, newQuantity);
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
      handleAddQuantity,
      getNextPage,
      getPrevPage,
    },
  };
};
