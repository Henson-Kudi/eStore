import ProductCard from '@/core/components/product-card'
import React from 'react'
import { products } from '../page'
import { MostPopularCategories } from '@/core/pages/landing-page'

function AllProducts() {
  return (
    <div className=' flex flex-col py-10 px-10'>
      <p className=' text-4xl text-center font-bold font-sans'>ALL Products</p>
      <MostPopularCategories  products={products}/>
    </div>
  )
}

export default AllProducts
