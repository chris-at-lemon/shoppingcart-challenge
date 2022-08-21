import { Cart } from "../types";

export const addToCart = (cart: Cart | any, id: string, name: string, price: number, currency: string) => {
  let quantity = 1;
  if (cart?.hasOwnProperty(id)) {
    quantity = cart[id].quantity + 1;
  }
  return { ...cart, [id]: { name: name, price: price, quantity: quantity, subtotal: price * quantity, currency: currency } };
};

export const removeFromCart = (cart: Cart | any, id: string, name: string, price: number, currency: string) => {
  let newCart = { ...cart };

  if (newCart[id] === undefined) {
    return newCart;
  }

  if (newCart[id] !== undefined) {
    let quantity = newCart[id].quantity;

    if (newCart[id].quantity === 1) {
      delete newCart[id];
      return newCart;
    }
    if (Object.keys(newCart).length > 0) {
      if (newCart[id].quantity > 1) {
        quantity = newCart[id].quantity - 1;
        return { ...cart, [id]: { name: name, price: price, quantity: quantity, subtotal: price * quantity, currency: currency } };
      }
    }
  }
};
