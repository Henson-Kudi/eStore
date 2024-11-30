import ProductCard from '@/core/components/product-card'
import React from 'react'
import { Product } from '@/core/components/grid-container'
import Link from 'next/link';

interface ProductCardProps {
  products: Product[];
  text?: string
}

const MostPopularCategories: React.FC<ProductCardProps> = ({ products, text }) => {
  return (
    <>
      <p className="text-2xl md:text-4xl text-center mb-4 font-bold font-sans md:pt-10 pt-5">{text}</p>
    <Link href={'/details-page'} className='grid grid-cols-2 gap-4 px-2 lg:px-10  md:grid-cols-3 lg:grid-cols-4 md:pt-10 pt-5 cursor-pointer'>

      {products?.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          imageUrl={product.imageUrl}
          description={product.description}
          price={product.price}
          discount={product.discount}      />
      ))}

    </Link>
    </>
  )
}

export default MostPopularCategories
