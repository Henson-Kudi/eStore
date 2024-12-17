"use client"
import React, { useState, useRef, useEffect } from 'react';
import { Menu, ShoppingCart, User, X } from 'lucide-react';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"
import Link from 'next/link';
import SearchFromNavbar from '@/core/components/search-sheet';
import ShoppingCartData from '@/core/components/cart';
import { useCart } from '@/core/providers/cartProvider';
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const Navbar: React.FC = () => {
  const {toggleCart, cartOpen, cart, isLoading, isError, error} = useCart()
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname()
  //display categories

  useEffect(()=>{
    isMenuOpen && setIsMenuOpen(false)
  }, [pathname])


  return (
    <nav className={`bg-black text-white sticky top-0 left-0 right-0 z-50 transition-all duration-300 px-6 lg:px-10 py-4`}>
      <div className="flex items-center justify-between py-2">
        {/* Mobile Menu Button */}
        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <SheetTrigger asChild>
            <Avatar className='hover:bg-zinc-100 hover:text-black transition-all duration-150 ease-linear cursor-pointer md:hidden'>
              <AvatarFallback className='bg-transparent'>
                <Menu />
              </AvatarFallback>
            </Avatar>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle asChild>
                <p className='text-center font-bold text-2xl'>PRESTIGE ATTIRE</p>
              </SheetTitle>
              <SheetDescription className='text-sm text-center'>
                Explore our wide range of shoes and accessories.
              </SheetDescription>
            </SheetHeader>

            <div className="p-2">
              <Link
                href={'/'}
                className='w-full p-2'
              >
                Home
              </Link>
            </div>

            <Separator />

          <div className='p-2.5'>
            <Link
              href={'/all-products'}
              className='w-full p-2'
            >
              All Products
            </Link>
          </div>

          <Separator />

          <div className="p-2">
            <Link
              href={'/blogs'}
              className='w-full p-2'
            >
              Blogs
            </Link>
          </div>

          <Separator />

          <div className="p-2">
            <Link
              href={'/contact-us'}
              className='w-full p-2'
            >
              Contact Us
            </Link>
          </div>
          
          </SheetContent>
        </Sheet>

        {/* Brand Name */}
        <div className="flex flex-col">
          <Link href={"/"} className="text-lg lg:text-2xl font-bold hover:text-gray-600 cursor-pointer">
            PRESTIGE ATTIRE
          </Link>
        </div>

        {/* Middle Section */}
        <div className='hidden md:flex flex-1 items-center gap-4 justify-center'>
          <Link href={'/'} className={cn('hover:border-b p-2', pathname === '/' && 'border-b')}>Home</Link>
          <Link href={'/all-products'} className={cn('hover:border-b p-2', pathname.startsWith('/all-products') && 'border-b')}>All Products</Link>
          <Link href={'/blogs'} className={cn('hover:border-b p-2', pathname.startsWith('/blogs') && 'border-b')}>Blogs</Link>
          <Link href={'/contact-us'} className={cn('hover:border-b p-2', pathname.startsWith('/contact-us') && 'border-b')}>Contact Us</Link>
        </div>

        {/* Right Section (Search, User, Cart) */}
        <div className="flex items-center space-x-2">
          <SearchFromNavbar />
          
          <Link href={'/sign-up'}>
            <Avatar className='hover:bg-zinc-100 hover:text-black transition-all duration-150 ease-linear'>
              <AvatarFallback className='bg-transparent'>
                <User />
              </AvatarFallback>
            </Avatar>
          </Link>

          <Sheet open={cartOpen} onOpenChange={toggleCart}>
            <SheetTrigger asChild>
              <Avatar className='hover:bg-zinc-100 hover:text-black transition-all duration-150 ease-linear cursor-pointer'>
                <AvatarFallback className='bg-transparent'>
                  <ShoppingCart />
                </AvatarFallback>
              </Avatar>
              {/* <Button variant={'ghost'}>
                
              </Button> */}
            </SheetTrigger>
            <SheetContent side={'right'}>
              <SheetHeader>
                <SheetTitle className='text-center font-bold text-2xl'>
                  Your Cart
                </SheetTitle>
                <SheetDescription className='text-sm text-center'>
                  {
                    !cart.length && !isLoading && 'Your cart is empty'
                  }
                </SheetDescription>
              </SheetHeader>
              {
                isLoading ? (
                  <div>Cart Loading... Fix this</div>
                ) : !isLoading && isError ? (
                  <div>Something went wrong: {error?.message}</div>
                ) : !cart.length ? (
                  <Button className='mt-6 rounded-lg'>
                    <Link href={'/all-products'}>Start Adding Now</Link>
                  </Button>
                ) : (
                  <ShoppingCartData />
                )
              }
              
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;