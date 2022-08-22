import { useState } from "react";
import { AddQuantityItem } from "../../../types";

export interface NumberInput {
  value?: string;
  onHandleChange: any;
  productId: string;
  addQuantity: (newQuantity: AddQuantityItem) => void;
}

const NumberInput = (props: NumberInput) => {
  const { value, onHandleChange, productId, addQuantity } = props;
  const [thisVal, setThisVal] = useState<string>("");

  const handleLocalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTimeout(() => {
      if (e.target.value === "") {
        return;
      }
      if (e.target.value !== "") {
        addQuantity({ gtin: productId, newQuantity: e.target.value });
      }
    }, 400);
  };

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") {
      addQuantity({ gtin: productId, newQuantity: thisVal });
    }
  }

  return (
    <input
      value={value}
      onChange={(e) => {
        onHandleChange(e, productId), handleLocalChange(e);
      }}
      onKeyDown={(e) => handleKeyDown(e)}
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-center"
      id="username"
      type="text"
      placeholder="quantity"
    />
  );
};

export default NumberInput;
