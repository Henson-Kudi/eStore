"use client"
import React, { useEffect, useState } from 'react'
import {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
} from "@/components/ui/sheet"

import { MostPopularProducts } from '../pages/landing-page';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

function SearchFromNavbar() {
  const [searchValue, setSearchValue] = useState('');
  const [popoverOpen, setPopoverOpen] = useState(false);
  const pathname = usePathname()

  useEffect(()=>{
    popoverOpen && setPopoverOpen(false)
  },[pathname])


  return (
    <>
      <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
        {/* <SheetOverlay> */}
          <PopoverTrigger>
            <Avatar className='hover:bg-zinc-100 hover:text-black transition-all duration-150 ease-linear' onClick={()=>setPopoverOpen(true)}>
              <AvatarFallback className='bg-transparent'>
                <Search className='w-4 h-4 md:w-5 md:h-5' />
              </AvatarFallback>
            </Avatar>
          </PopoverTrigger>
          <PopoverContent side={'left'} className='bg-transparent bg-opacity-20 p-0 md:min-w-[500px] rounded-md border-0 relative' >
            <div className='fixed top-0 left-0 w-full inset-0 z-50 md:relative'>
              <Input className='w-full' placeholder='What are you looking for?...' value={searchValue} onChange={(e)=>setSearchValue(e.target.value)}/>

              {
                searchValue.length > 0 && (
                  <div className=' flex  flex-col gap-4 bg-white p-2 mt-2 rounded-md'>
                    <Link href={`/all-products/${1}`} className='p-0.5'>Option 1</Link>
                    <Separator/>
                    <Link href={`/all-products/${1}`} className='p-0.5'>Option 2</Link>
                    <Separator/>
                    <Link href={`/all-products/${1}`} className='p-0.5'>Option 2</Link>
                    <Separator/>
                  </div>
                )
              }
            </div>
          </PopoverContent>
        {/* </SheetOverlay> */}
      </Popover>
    </>
  )
}

export default SearchFromNavbar
