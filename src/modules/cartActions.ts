export const addToCart = (cart: any, id: string, name: string, price: number) => {
  let quantity = 1;
  if (cart?.hasOwnProperty(id)) {
    quantity = cart[id].quantity + 1;
  }
  return { ...cart, [id]: { name: name, price: price, quantity: quantity, subtotal: price * quantity } };
};

export const removeFromCart = (cart: any, id: string, name: string, price: number) => {
  let newCart = { ...cart };

  if (newCart[id] === undefined) {
    return newCart;
  }

  if (newCart[id] !== undefined) {
    console.log("deleting");

    let quantity = newCart[id].quantity;

    if (newCart[id].quantity === 1) {
      delete newCart[id];
      return newCart;
    }
    if (Object.keys(newCart).length > 0) {
      if (newCart[id].quantity > 1) {
        quantity = newCart[id].quantity - 1;
        return { ...cart, [id]: { name: name, price: price, quantity: quantity, subtotal: price * quantity } };
      }
    }
  }
};
