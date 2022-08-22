import { Cart, CartItem, RemoveCartItem, AddQuantityItem } from "../types";

export const addToCart = (cart: Cart, cartProps: CartItem) => {
  const { gtin, name, price, currency } = cartProps;
  let quantity = 1;
  if (cart?.hasOwnProperty(gtin)) {
    quantity = cart[gtin].quantity + 1;
  }

  return { ...cart, [gtin]: { name: name, price: price, quantity: quantity, subtotal: price * quantity, currency: currency } };
};

export const removeFromCart = (cart: Cart, cartProps: RemoveCartItem) => {
  const { gtin } = cartProps;

  let newCart = { ...cart };

  if (newCart[gtin] === undefined) {
    return newCart;
  } else if (newCart[gtin] !== undefined) {
    let quantity = newCart[gtin].quantity;

    if (newCart[gtin].quantity === 1) {
      delete newCart[gtin];
      return newCart;
    }
    if (newCart[gtin].quantity > 1) {
      quantity = newCart[gtin].quantity - 1;
      const updatedCartItem = { ...newCart[gtin] };
      updatedCartItem.quantity = quantity;
      updatedCartItem.subtotal = quantity * updatedCartItem.price;

      return { ...newCart, [gtin]: updatedCartItem };
    }
  }

  return { ...cart };
};

export const addQuantity = (cart: Cart, cartProps: AddQuantityItem) => {
  const { newQuantity, gtin } = cartProps;

  let newCart = { ...cart };

  if (newQuantity) {
    if (parseFloat(newQuantity) === 0) {
      delete newCart[gtin];
      return newCart;
    }
    const updatedCartItem = { ...newCart[gtin] };
    updatedCartItem.quantity = parseFloat(newQuantity);
    updatedCartItem.subtotal = parseFloat(newQuantity) * updatedCartItem.price;
    return { ...newCart, [gtin]: updatedCartItem };
  }

  return { ...cart };
};

export const calcTotal = (cart: Cart) => {
  const total = Object.values(cart).reduce((acc, curr: any) => (acc = acc + curr["subtotal"]), 0);
  return total;
};
