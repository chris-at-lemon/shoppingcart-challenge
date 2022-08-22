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

        console.log("updatedCartItem", { ...newCart, [id]: updatedCartItem });

        return { ...newCart, [id]: updatedCartItem };
      }
    }
  }

  return { ...cart };
};

export const addQuantity = (cart: Cart, cartProps: AddQuantityItem) => {
  const { newQuantity, id } = cartProps;

  let newCart = { ...cart };
  let quantity = cart[id].quantity;

  if (newQuantity) {
    const updatedCartItem = { ...cart[id] };
    updatedCartItem.quantity = parseFloat(newQuantity);
    console.log("newCart", updatedCartItem);
  }

  // if (newQuantity) {
  //   quantity = parseInt(newQuantity);
  //   newCart[id].quantity = quantity;
  //   console.log(quantity);
  // }

  // console.log({ ...newCart, [id]: updatedCartItem });

  // return { ...cart, [id]: { name: name, price: price, quantity: quantity, subtotal: price * quantity, currency: currency } };
};
