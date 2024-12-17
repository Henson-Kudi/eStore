"use client"
import React, { useState } from 'react';
import {ProductCard} from './product-card';
import { Product } from '@/types/products';

// export interface Product {
//   id: string;
//   imageUrl: string;
//   description: string;
//   price: number;
//   discount: number;
// }

interface ProductGridProps {

}


const ProductGrid: React.FC<ProductGridProps> = () => {
  const products:Product[] = []

  const [gridLayout, setGridLayout] = useState<'three' | 'four' | 'six'>('three');

  const gridClasses = {
    three: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3',
    four: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
    six: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6',
  };

  return (
    <div className="md:px-20 px-4">
      
      <div className={`grid gap-4 ${gridClasses[gridLayout]}`}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;