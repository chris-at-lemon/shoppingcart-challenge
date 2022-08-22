import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { CartState } from "../../atoms/cartAtom";
import { addToCart, removeFromCart, addQuantity, calcTotal, addToItem } from "../../modules/cartActions";
import { getSingleProduct } from "../../modules/productListActions";

import { Cart, CartItem, RemoveCartItem, AddQuantityItem } from "../../types";

export const cartController = () => {
  const [cart, setCart] = useRecoilState<Cart>(CartState);
  // console.log("cart", cart);

  // Product actions
  // The below is just to demo using the single product API
  // We extend product props in the cart state
  // It may be more efficint to have all required item props in the cart state from the moment the product was added
  const [seeDetails, setSeeDetails] = useState<boolean>(false);
  const toggleDetails = () => {
    setSeeDetails(!seeDetails);
  };

  const fetchSingleProduct = async (gtin: string) => {
    const thisProduct: CartItem = await getSingleProduct(gtin);
    const newCart = addToItem(cart, thisProduct);
    setCart(newCart);
  };

  // Cart actions
  const handleAddToCart = (cartItem: CartItem) => {
    const newCart = addToCart(cart, cartItem);
    setCart(newCart);
  };

  const handleRemoveFromCart = (cartItem: RemoveCartItem) => {
    const newCart = removeFromCart(cart, cartItem);
    setCart(newCart);
  };

  const handleAddQuantity = (newQuantity: AddQuantityItem) => {
    const newCart = addQuantity(cart, newQuantity);
    setCart(newCart);
    setQuantityInputValue({ id: "", quantity: "" });
  };

  const handleResetCart = () => {
    setCart({});
  };

  // Handle quantity input
  const [quantityInputValue, setQuantityInputValue] = useState({
    id: "",
    quantity: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, productId: string) => {
    const onlyNumbers = e.target.value.replace(/\D/g, "");
    setQuantityInputValue({ id: productId, quantity: onlyNumbers });
  };

  // Calculate total
  const [total, setTotal] = useState<number>(0);
  const handleTotal = (cart: Cart) => {
    const total = calcTotal(cart);
    setTotal(total);
  };
  useEffect(() => {
    handleTotal(cart);
  }, [cart]);

  // Above is the React way with states, in this case a quick 3 liner as below may be more efficient
  //
  // let total: number = 0;
  // if (cart) {
  //   total = Object.values(cart).reduce((acc, curr: any) => (acc = acc + curr["subtotal"]), 0);
  // }

  return {
    cart,
    total,
    quantityInputValue,
    seeDetails,
    fn: {
      handleAddToCart,
      handleRemoveFromCart,
      handleAddQuantity,
      handleInputChange,
      handleResetCart,
      fetchSingleProduct,
      toggleDetails,
    },
  };
};
