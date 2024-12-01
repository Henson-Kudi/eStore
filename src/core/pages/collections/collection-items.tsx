import ProductGrid from '@/core/components/grid-container'
import { products } from '@/lib/constants'
import React from 'react'

function CollectionItems() {
  return (
    <div className=' flex flex-col gap-4 py-10 justify-center'>
      <p className='font-bold lg:text-3xl mx-auto'>NEW BALANCE</p>
      <div className=''>
        <ProductGrid products={products} />
      </div>
    </div>
  )
}

export default CollectionItems
