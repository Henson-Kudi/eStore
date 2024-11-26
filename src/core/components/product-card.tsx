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
        <Image src={imageUrl} alt="Product" width={300} height={300} className="w-full h-auto" />
        <span className="absolute top-2 left-2 bg-red-500 text-white md:px-1 md:py-1 text-sm ">
          {discount}% SAVE
        </span>
      </div>
      <p className="mt-2 text-lg">
        {description} - <span className="text-red-500">${price.toFixed(2)}</span>
      </p>
    </div>
  );
};

export default ProductCard;