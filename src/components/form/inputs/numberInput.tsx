interface NumberInput {
  value?: string;
  onHandleChange: any;
  productId: string;
}

const NumberInput = (props: NumberInput) => {
  const { value, onHandleChange, productId } = props;
  return (
    <input
      value={value}
      onChange={(e) => {
        onHandleChange(e, productId);
      }}
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      id="username"
      type="text"
      placeholder="amount"
    />
  );
};

export default NumberInput;
