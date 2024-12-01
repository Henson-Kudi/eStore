"use client"
import React, { useState } from 'react'
import {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetOverlay,
} from "@/components/ui/sheet"
import { Product } from "@/core/components/grid-container";
import { FaSearch } from 'react-icons/fa';
import { MostPopularCategories } from '../pages/landing-page';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { products } from '@/lib/constants';

const otherCategories = ["Puma", "Puma Nike", "Puma Min"]

function SearchFromNavbar() {
  const [isSearch, setIsSearch] = useState(false);

  function handleSearch() {
    setIsSearch(true)
  }

  return (
    <Sheet>
      {/* <SheetOverlay> */}
        <SheetTrigger asChild>
          <Search className="invisible md:visible absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer hover:text-gray-600" onClick={handleSearch} />
        </SheetTrigger>
        <SheetContent side={'top'}>
          <div className=' flex  flex-col gap-4'>
            <input
              type="text"
              placeholder='SEARCH...'
              className='text-white  py-2'
              style={{ border: 'none', outline: 'none' }}
            />
            <div className=' flex flex-col border-t-2 border-t-slate-400 py-4'>
              <div className='grid grid-cols-4 '>
                <div className='col-span-1'>
                  <div className='text-white'>
                    {otherCategories.map((text, i) => <p key={i}>{text}</p>)}
                  </div>
                </div>
                <div className='col-span-3 flex flex-col items-center'>
                  <MostPopularCategories products={products} />
                </div>
                <div className='mt-4'>
                  <Button variant={'default'} className='bg-white text-black'>
                    View All Results
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <SheetClose asChild>
          </SheetClose>
        </SheetContent>
      {/* </SheetOverlay> */}
    </Sheet>
  )
}

export default SearchFromNavbar
