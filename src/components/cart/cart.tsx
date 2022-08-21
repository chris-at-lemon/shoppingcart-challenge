import { cartController } from "./cartController";

const Cart = () => {
  const { cart, total, fn } = cartController();

  return (
    <>
      {cart && (
        <>
          <div className="pt-1 pb-2 mb-2 text-xl font-bold">Your cart</div>
          <div className="rounded shadow-md p-4 mb-4 border-2">
            {Object.keys(cart).map((key, i) => {
              return (
                <div key={i}>
                  <div className="font-bold">{cart[key as keyof typeof cart].name}</div>
                  <div>
                    {cart[key].currency} {cart[key].price} x {cart[key].quantity}
                  </div>
                  <div>
                    <button onClick={() => fn.handleAddToCart(key, cart[key].name, cart[key].price, cart[key].currency)}>add</button>
                    <button onClick={() => fn.handleRemoveFromCart(key, cart[key].name, cart[key].price, cart[key].currency)}>remove</button>
                  </div>
                </div>
              );
            })}
            {Object.keys(cart).length !== 0 && <div className="mt-4 pt-2 border-t-2">Total: {total.toFixed(2)}</div>}
          </div>
        </>
      )}
    </>
  );
};

export default Cart;
