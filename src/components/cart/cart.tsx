import { useCart } from "./cartController";

const Cart = () => {
  const { cart, total, fn } = useCart();
  console.log(cart);

  return (
    <div>
      {cart && (
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
                    <button onClick={() => fn.handleAddToCart(key, cart[key].name, cart[key].price)}>add</button>
                    <button onClick={() => fn.handleRemoveFromCart(key, cart[key].name, cart[key].price)}>remove</button>
                  </div>
                </div>
              );
            })}
          </ul>
          {Object.keys(cart).length !== 0 && <div>Total: {total}</div>}
        </>
      )}
    </div>
  );
};

export default Cart;
