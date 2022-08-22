import { cartController } from "./cartController";
import Button from "../buttons/button";
import NumberInput from "../form/inputs/numberInput";

const Cart = () => {
  const { cart, total, quantityInputValue, fn } = cartController();
  //console.log(cart);

  return (
    <>
      {cart && (
        <>
          <div className="pt-1 pb-4 mb-2 text-xl font-bold">Your cart</div>
          <div className="rounded shadow-md p-4 mb-4 border-2">
            {Object.keys(cart).length > 0 ? (
              <>
                {Object.keys(cart).map((key, i) => {
                  return (
                    <div key={i}>
                      <div className="font-bold">{cart[key].name}</div>
                      <div>
                        {cart[key].currency} {cart[key].price}
                      </div>
                      <div className="flex">
                        <div className="mr-4" onClick={() => fn.handleRemoveFromCart({ id: key })}>
                          <Button label="-" colour="danger" size="sm" />
                        </div>
                        <div>x {cart[key].quantity}</div>
                        <div className="ml-4" onClick={() => fn.handleAddToCart({ id: key, name: cart[key].name, price: cart[key].price, currency: cart[key].currency })}>
                          <Button label="+" colour="primary" size="sm" />
                        </div>
                        <div>
                          <NumberInput value={quantityInputValue.id === key ? quantityInputValue.quantity : cart[key].quantity.toString()} onHandleChange={fn.handleInputChange} productId={key} />
                        </div>
                        <div className="ml-4" onClick={() => fn.handleAddQuantity({ id: key, newQuantity: quantityInputValue.quantity })}>
                          <Button label="+" colour="primary" size="sm" />
                        </div>
                      </div>
                    </div>
                  );
                })}
                {Object.keys(cart).length !== 0 && <div className="mt-4 pt-2 border-t-2">Total: {total.toFixed(2)}</div>}
              </>
            ) : (
              <div>Your cart is currently empty</div>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Cart;
