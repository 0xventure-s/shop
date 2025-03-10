import { ValidSizes } from "@/interfaces";
import clsx from "clsx";

interface Props {
  selectedSize?: ValidSizes;
  availableSizes: ValidSizes[];

  onSizeSelected: (size: ValidSizes) => void;
}

export const SizeSelector = ({selectedSize,availableSizes,onSizeSelected,}:Props) => {

  
  return (
    <div className="my-5">
      <h3 className="font-bold mb-4">Tallas Disponibles</h3>

      <div className="flex">
        {availableSizes.map((size) => (
          <button
            key={size}
            onClick={() => onSizeSelected(size)}
            className={clsx(
              "mx-2 hover:text-blue-500 rounded-full p-2 text-lg",
              {
                "underline decoration-2    p-2 ":
                  size === selectedSize,
              }
            )}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
};
