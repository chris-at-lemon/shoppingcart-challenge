import { Cart, CartItem, RemoveCartItem, AddQuantityItem } from "../types";

export const addToCart = (cart: Cart, cartProps: CartItem) => {
  const { gtin, name, recommendedRetailPrice, recommendedRetailPriceCurrency } = cartProps;

  let newCart = { ...cart };

  let quantity = 1;
  if (newCart?.hasOwnProperty(gtin)) {
    quantity = newCart[gtin].quantity + 1;
  }

  return { ...newCart, [gtin]: { name: name, gtin: gtin, recommendedRetailPrice: recommendedRetailPrice, quantity: quantity, subtotal: recommendedRetailPrice * quantity, recommendedRetailPriceCurrency: recommendedRetailPriceCurrency } };
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
      updatedCartItem.subtotal = quantity * updatedCartItem.recommendedRetailPrice;

      return { ...newCart, [gtin]: updatedCartItem };
    }
  }

  return { ...newCart };
};

export const addQuantity = (cart: Cart, cartProps: AddQuantityItem) => {
  const { newQuantity, gtin } = cartProps;

  let newCart = { ...cart };

  if (newQuantity) {
    if (parseFloat(newQuantity) === 0) {
      delete newCart[gtin];
      return newCart;
    }
    const newCartItem = { ...newCart[gtin] };
    newCartItem.quantity = parseFloat(newQuantity);
    newCartItem.subtotal = parseFloat(newQuantity) * newCartItem.recommendedRetailPrice;
    return { ...newCart, [gtin]: newCartItem };
  }

  return { ...newCart };
};

export const addToItem = (cart: Cart, thisProduct: CartItem) => {
  const { gtin, imageUrl, brandName, categoryName } = thisProduct;

  const newCart = { ...cart };
  const newCartItem = { ...newCart[gtin] };
  newCartItem.imageUrl = imageUrl;
  newCartItem.brandName = brandName;
  newCartItem.categoryName = categoryName;

  console.log({ ...newCart, [gtin]: newCartItem });

  return { ...newCart, [gtin]: newCartItem };
};

export const calcTotal = (cart: Cart) => {
  const total = Object.values(cart).reduce((acc, curr: any) => (acc = acc + curr["subtotal"]), 0);
  return total;
};
