import { useState } from "react";
import ProductAction from "./ProductAction";
import Description from "./Description";

export default function ProductDetails() {
  const sizes = ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45"];
  const [selectedSize, setSelectedSize] = useState("43");

  return (
    <div className="flex flex-col space-y-4 w-1/3">
      <h1 className="text-2xl font-bold">
        LOUIS VUITTON LV TRAINERS BLUE DENIM VELCRO STRAP MONOGRAM
      </h1>
      <div className="flex space-x-8">
        <p className="text-lg text-red-500 font-bold">
          DHS. 480.00{" "}
          <span className="line-through font-semibold text-gray-600">
            DHS. 1,980.00
          </span>
        </p>
      </div>

      <div>
        <h2 className="text-sm font-semibold">Size:</h2>
        <div className="grid grid-cols-8 gap-2">
          {sizes.map((size) => (
            <div
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`cursor-pointer text-center p-2 border ${
                selectedSize === size
                  ? "border-black text-black"
                  : "border-gray-300 text-gray-500"
              }`}
            >
              {size}
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center border w-1/6 h-11 justify-center">
        <button className="px-2 py-1">-</button>
        {/* <input
          type="text"
          value={"1"}
          className="w-12 text-center border"
          readOnly
        /> */}
        <p className="w-12 text-center">1</p>
        <button className="px-2 py-1 text-center hover:text-gray-500">+</button>
      </div>

      <ProductAction />
      <Description />
    </div>
  );
}
