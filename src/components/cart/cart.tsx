import { cartController } from "./cartController";
import Button from "../buttons/button";
import NumberInput from "../form/inputs/numberInput";

const Cart = () => {
  const { cart, total, quantityInputValue, seeDetails, fn } = cartController();
  //console.log(cart);

  return (
    <>
      {cart && (
        <>
          <div className="pt-1 mb-6 text-xl font-bold">Your cart</div>
          <div className="rounded shadow-md mb-4 border-2">
            {Object.keys(cart).length > 0 ? (
              <>
                {Object.keys(cart).map((key, i) => {
                  return (
                    <div key={key}>
                      <div className={`border-b-2 p-4 ${i % 2 == 0 ? "bg-gray-100" : "bg-white	"}`}>
                        <div className="font-bold">{cart[key].name}</div>
                        <div className=" flex justify-between font-semibold border-b-2 pb-2">
                          <div>
                            Unit price: {cart[key].recommendedRetailPriceCurrency} {cart[key].recommendedRetailPrice}
                          </div>
                          <div
                            onClick={() => {
                              fn.fetchSingleProduct(key), fn.toggleDetails();
                            }}
                          >
                            see details <span className="text-xs">&#x25BC;</span>
                          </div>
                        </div>
                        {cart[key].imageUrl && seeDetails ? (
                          <div className="border-b-2 pb-2 mt-2">
                            <img className="w-24" src={cart[key].imageUrl} alt={cart[key].name} />
                          </div>
                        ) : (
                          ""
                        )}
                        <div className="flex justify-between align-middle mx-auto h-6 mt-4">
                          <div className="">Edit quantity</div>
                          <div className="flex flex-grow justify-end">
                            <div className="flex align-middle mr-2" onClick={() => fn.handleRemoveFromCart({ gtin: key })}>
                              <Button label="-" colour="danger" size="sm" />
                            </div>
                            <div className="flex align-middle w-16">
                              <NumberInput value={quantityInputValue.id === key ? quantityInputValue.quantity : cart[key].quantity.toString()} onHandleChange={fn.handleInputChange} addQuantity={fn.handleAddQuantity} productId={key} />
                            </div>
                            <div
                              className="flex align-middle ml-2"
                              onClick={() => fn.handleAddToCart({ gtin: key, name: cart[key].name, recommendedRetailPrice: cart[key].recommendedRetailPrice, recommendedRetailPriceCurrency: cart[key].recommendedRetailPriceCurrency })}
                            >
                              <Button label="+" colour="primary" size="sm" />
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-end mt-4 pt-2 font-semibold border-t-2">Subtotal: {cart[key].subtotal.toFixed(2)}</div>
                      </div>
                    </div>
                  );
                })}
                {Object.keys(cart).length !== 0 && (
                  <div className="flex justify-between align-middle mt-4 p-2">
                    <div className="flex align-middle" onClick={fn.handleResetCart}>
                      <Button label="empty cart" colour="danger" size="sm" />
                    </div>
                    <div className="font-bold text-xl">Total: {total.toFixed(2)}</div>
                  </div>
                )}
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
