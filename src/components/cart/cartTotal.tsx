import Button from "../buttons/button";

interface CartTotal {
  total: number;
  resetCart: () => void;
}

const CartTotal = (props: CartTotal) => {
  const { total, resetCart } = props;
  return (
    <div className="flex justify-between align-middle mt-4 p-2">
      <div className="flex align-middle" onClick={() => resetCart()}>
        <Button label="empty cart" colour="danger" size="sm" />
      </div>
      <div className="font-bold text-xl">Total: {total.toFixed(2)}</div>
    </div>
  );
};

export default CartTotal;
