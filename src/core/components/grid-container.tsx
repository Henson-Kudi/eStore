"use client"
import React, { useState } from 'react';
import ProductCard from './product-card';
import { FaThLarge, FaTh, FaThList } from 'react-icons/fa';

export interface Product {
  id: number;
  imageUrl: string;
  description: string;
  price: number;
  discount: number;
}

interface ProductGridProps {
  products: Product[];
}


const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  const [gridLayout, setGridLayout] = useState<'three' | 'four' | 'six'>('three');

  const gridClasses = {
    three: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3',
    four: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
    six: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6',
  };

  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-start mb-4 space-x-2">
        <button onClick={() => setGridLayout('three')} className="p-2">
          <FaThLarge />
        </button>
        <button onClick={() => setGridLayout('four')} className="p-2">
          <FaTh />
        </button>
        <button onClick={() => setGridLayout('six')} className="p-2">
          <FaThList />
        </button>
      </div>
      <div className={`grid gap-4 ${gridClasses[gridLayout]}`}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            imageUrl={product.imageUrl}
            description={product.description}
            price={product.price}
            discount={product.discount}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;