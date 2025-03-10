"use client";
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";

interface Props {
  quantity: number;

  onQuantitySelector: (value: number) => void;
}

export const QuantitySelector = ({quantity = 1,onQuantitySelector,}: Props) => {

  
  const onValueChangued = (value: number) => {
    if (quantity + value < 1) return;

    onQuantitySelector(quantity + value);
  };

  return (
    <div className="flex">
      <button onClick={() => onValueChangued(-1)} disabled={quantity === 1}>
        <IoRemoveCircleOutline
          size={30}
          className={quantity === 1 ? "text-gray-400" : ""}
        />
      </button>

      <span className="w-20 m-6 px-5 py-1 bg-gray-200 text-center rounded">
        {quantity}
      </span>
      <button onClick={() => onValueChangued(1)} disabled={quantity ===5} >
        <IoAddCircleOutline
          size={30}
          className={quantity === 5 ? "text-gray-400" : ""} 
        />
      </button>
    </div>
  );
};
