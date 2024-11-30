// components/ProductCard.tsx
import React from 'react';
import Image from 'next/image';

 export interface ProductCardProps {
  id: number;
  imageUrl: string;
  description: string;
  price: number;
  discount: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ imageUrl, description, price, discount }) => {
  return (
    <div className="flex flex-col">
      <div className="relative">
        <img src={imageUrl} alt="Shoe" className="w-full md:h-[450px] h-[300] object-cover" />
        <span className="absolute top-2 left-2 bg-red-500 text-white md:px-1 md:py-1 text-sm ">
          {discount}% SAVE
        </span>
      </div>
      <p className="mt-2 md:text-lg text-sm">
        {description} - <span className="text-red-500">${price.toFixed(2)}</span>
      </p>
    </div>
  );
};

export default ProductCard;