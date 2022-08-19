import { useCart } from "./cartController";

const Cart = () => {
  const { cart, total, fn } = useCart();

  return (
    <div>
      {Object.keys(cart).length > 0 && (
        <>
          <ul>
            {Object.keys(cart).map((key, i) => {
              return (
                <div key={i}>
                  <div>{cart[key].name}</div>
                  <div>
                    {cart[key].price} x {cart[key].quantity}
                  </div>
                  <div>
                    <button onClick={() => fn.addToCart(key, cart[key].name, cart[key].price)}>add</button>
                    <button onClick={() => fn.removeFromCart(key, cart[key].name, cart[key].price)}>remove</button>
                  </div>
                </div>
              );
            })}
          </ul>
          <div>Total: {total}</div>
        </>
      )}
    </div>
  );
};

export default Cart;
