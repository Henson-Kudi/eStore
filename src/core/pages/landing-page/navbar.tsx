"use client"
import React, { useState, useRef, useEffect } from 'react';
import { ShoppingCart, User } from 'lucide-react';
import {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
} from "@/components/ui/sheet"
import Link from 'next/link';
import SearchFromNavbar from '@/core/components/search-sheet';
import CartSheet from '@/core/components/card-item';

const cartItems = [
  { id: 1, name: 'Product 1', image: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c2hvZXN8ZW58MHx8MHx8fDA%3D' },
  { id: 2, name: 'Product 2', image: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c2hvZXN8ZW58MHx8MHx8fDA%3D' },
];


const shoeTypes = [
  'Sneakers', 'Boots', 'Sandals', 'Loafers',
  'Oxfords', 'Slip-ons', 'Athletic'
];

const shoeCategories: Record<string, string[]> = {
  'Sneakers': ['Running', 'Casual', 'High-top', 'Low-top', 'Slip-on'],
  'Boots': ['Ankle', 'Chelsea', 'Combat', 'Hiking', 'Work'],
  'Sandals': ['Flip-flops', 'Slides', 'Gladiator'],
  'Loafers': ['Penny', 'Tassel', 'Bit'],
  'Oxfords': ['Plain', 'Cap Toe', 'Wingtip'],
  'Slip-ons': ['Moccasin', 'Espadrille'],
  'Athletic': ['Running', 'Basketball', 'Training'],

};

const Navbar: React.FC = () => {
  const [activeLink, setActiveLink] = useState<string>('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [categoryPosition, setCategoryPosition] = useState({ top: 0, left: 0 });
  const navRef = useRef<HTMLDivElement>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  //display categories

  const handleShoeTypeClick = (type: string, event: React.MouseEvent<HTMLDivElement>) => {
    if (activeLink === type) {
      setActiveLink('');
    } else {
      setActiveLink(type);
      const rect = event.currentTarget.getBoundingClientRect();
      const parentRect = event.currentTarget.parentElement?.getBoundingClientRect();
      if (parentRect) {
        setCategoryPosition({
          left: rect.left - parentRect.left,
          top: rect.bottom - parentRect.top + 10
        });
      }
    }
    setIsMenuOpen(false);
  };
  // handling category click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActiveLink('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  const handleCheckout = () => {
    setIsCartOpen(prev => !prev);

  };

  // Toggle cart visibility
  const setCartOpens = () => {
    setIsCartOpen(prev => !prev);
  };

  return (
    <nav className={`bg-black text-white sticky top-0 left-0 right-0 z-50 transition-all duration-300 px-6 lg:px-10 h-28 md`}>
      <div className="flex items-center justify-between py-2">
        {/* Mobile Menu Button */}
        <Sheet>
          <SheetTrigger asChild>
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              ☰
            </button>
          </SheetTrigger>
          <SheetContent>
            <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
              {shoeTypes.map((type) => (
                <div
                  key={type}
                  className={`block py-2 border-b border-gray-300 ${activeLink === type ? 'hover:bg-gray-300' : ''}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {type}
                </div>
              ))}
            </div>
            <SheetClose asChild></SheetClose>
          </SheetContent>
        </Sheet>

        {/* Brand Name */}
        <div className="flex flex-col">
          <Link href={"/"} className="text-lg lg:text-2xl font-bold hover:text-gray-600 cursor-pointer">
            PRESTIGE ATTIRE
          </Link>
        </div>

        {/* Right Section (Search, User, Cart) */}
        <div className="flex items-center space-x-2">
          <div className="relative">
            <SearchFromNavbar />
          </div>
          <Link href={'/sign-up'}>
            <User className=" cursor-pointer hover:text-gray-600" />
          </Link>

          <ShoppingCart
            className="cursor-pointer hover:text-gray-600"
            onClick={setCartOpens}
          />

          {/* Render CartSheet based on isCartOpen */}
          <CartSheet
            cartItems={cartItems}
            onCheckout={handleCheckout}
            isOpen={isCartOpen} // Pass the open state
            onClose={() => setIsCartOpen(false)} // Pass the close function
          />
        </div>
      </div>

      {/* Desktop Menu */}
      <div className="relative hidden md:flex justify-center space-x-6 lg:space-x-8 py-4">
        {shoeTypes.map((type) => (
          <div
            key={type}
            className={`cursor-pointer py-2 px-3 ${activeLink === type ? 'border-b-2 border-black' : ''}`}
            onClick={(e) => handleShoeTypeClick(type, e)}
          >
            {type}
          </div>
        ))}
      </div>

      {/* Dropdown for Categories */}
      {activeLink && (
        <div
          className="absolute bg-black h-auto w-44 border-2  border-t-slate-100 text-white z-10 mt-12"
          style={{ top: `${categoryPosition.top}px`, left: `${categoryPosition.left}px` }}>
          <div className="container mx-auto px-4 py-2">
            <div className="grid grid-cols-1 gap-2">
              {shoeCategories[activeLink]?.map((category, index) => (
                <Link href={'/all-products'} key={index} className="cursor-pointer text-lg">
                  {category}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;