'use client'

import { BreadcrumbWithCustomSeparator } from '@/core/pages/collections/bread-crumbs'
import Filters from '@/core/pages/collections/filter-shoes'
import ProductsPage from '@/core/pages/products'
import { useState } from 'react'
import { FaTh, FaThLarge, FaThList } from 'react-icons/fa'

function Component() {
  const [gridLayout, setGridLayout] = useState<'three' | 'four' | 'six'>('three');

  return (
    <div>
      <BreadcrumbWithCustomSeparator />
      {/* <div className="flex justify-between mb-4 items-center h-20  space-x-2 border-t-2 border-b-2 border-gray-300 ">
        <div>
          <button onClick={() => setGridLayout('three')} className="p-2">
            <FaThLarge className='bg-gray-100' />
          </button>
          <button onClick={() => setGridLayout('four')} className="p-2">
            <FaTh />
          </button>
          <button onClick={() => setGridLayout('six')} className="p-2">
            <FaThList />
          </button>
        </div>

        <Filters />
      </div> */}

      <ProductsPage />
    </div>
  )
}

export default Component
