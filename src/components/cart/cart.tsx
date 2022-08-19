import { useCart } from "./cartController";

const Cart = () => {
  const { cart } = useCart();

  return (
    <div>
      <ul>
        {Object.keys(cart).map((key, i) => {
          return (
            <div key={i}>
              <div>{cart[key].name}</div>
              <div>{cart[key].quantity}</div>
            </div>
          );
        })}
      </ul>
    </div>
  );
};

export default Cart;
