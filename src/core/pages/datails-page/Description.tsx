"use client"
import { useState } from "react";

export default function Description() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <div
        className=" border-b flex justify-between items-center cursor-pointer border-t py-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-semibold">DESCRIPTION</span>
        {isOpen ? <p>-</p> : <p>+</p>}
      </div>
      {isOpen && (
        <div className="pt-2">
          <p className="text-sm">
            Step up your style game with our premium, affordable footwear for
            men and women. From sleek sneakers to elegant heels, our collection
            boasts high-quality craftsmanship and timeless designs. With
            lightning-fast shipping within 1-2 working days, your perfect pair
            is just a click away.
          </p>
        </div>
      )}
    </div>
  );
}
