import ProductGrid from '@/core/components/grid-container'
import React from 'react'

function CollectionItems() {
  return (
    <div className=' flex flex-col gap-4 py-10 justify-center'>
      <p className='font-bold lg:text-3xl mx-auto'>NEW BALANCE</p>
      <div className=''>
        <ProductGrid />
      </div>
    </div>
  )
}

export default CollectionItems
