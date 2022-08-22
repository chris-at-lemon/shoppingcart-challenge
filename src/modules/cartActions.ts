import { Cart, CartItem, RemoveCartItem, AddQuantityItem } from "../types";

export const addToCart = (cart: Cart, cartProps: CartItem) => {
  const { id, name, price, currency } = cartProps;
  let quantity = 1;
  if (cart?.hasOwnProperty(id)) {
    quantity = cart[id].quantity + 1;
  }

  return { ...cart, [id]: { name: name, price: price, quantity: quantity, subtotal: price * quantity, currency: currency } };
};

export const removeFromCart = (cart: Cart, cartProps: RemoveCartItem) => {
  const { id } = cartProps;

  let newCart = { ...cart };

  if (newCart[id] === undefined) {
    return newCart;
  } else if (newCart[id] !== undefined) {
    let quantity = newCart[id].quantity;

    if (newCart[id].quantity === 1) {
      delete newCart[id];
      return newCart;
    }
    if (Object.keys(newCart).length > 0) {
      if (newCart[id].quantity > 1) {
        quantity = newCart[id].quantity - 1;
        const updatedCartItem = { ...newCart[id] };
        updatedCartItem.quantity = quantity;
        updatedCartItem.subtotal = quantity * updatedCartItem.price;

        return { ...newCart, [id]: updatedCartItem };
      }
    }
  }

  return { ...cart };
};

export const addQuantity = (cart: Cart, cartProps: AddQuantityItem) => {
  const { newQuantity, id } = cartProps;

  let newCart = { ...cart };

  if (newQuantity) {
    if (parseFloat(newQuantity) === 0) {
      delete newCart[id];
      return newCart;
    }
    const updatedCartItem = { ...newCart[id] };
    updatedCartItem.quantity = parseFloat(newQuantity);
    updatedCartItem.subtotal = parseFloat(newQuantity) * updatedCartItem.price;
    return { ...newCart, [id]: updatedCartItem };
  }

  return { ...cart };
};
