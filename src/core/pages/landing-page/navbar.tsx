"use client"
import React, { useState, useRef, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { FaCartShopping } from 'react-icons/fa6';
import { User } from 'lucide-react';
import {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
} from "@/components/ui/sheet"
import Link from 'next/link';
import SearchFromNavbar from '@/core/components/search-sheet';

//dummy data for dev purposes

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
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrollDirection, setScrollDirection] = useState("up");
  //display categories

  const handleShoeTypeClick = (type: string, event: React.MouseEvent<HTMLDivElement>) => {
    if (activeLink === type) {
      setActiveLink('');
    } else {
      setActiveLink(type);
      const rect = event.currentTarget.getBoundingClientRect();
      const navRect = navRef.current?.getBoundingClientRect();
      if (navRect) {
        setCategoryPosition({
          top: rect.bottom - navRect.top,
          left: rect.left - navRect.left,
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

  //handling navbar scroll

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const controlNavbar = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY) {
        // Scrolling down
        setScrollDirection("down");
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up
        setScrollDirection("up");
        setIsVisible(true);
      }

      lastScrollY = currentScrollY;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(controlNavbar);
        ticking = true;
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', onScroll);
      return () => {
        window.removeEventListener('scroll', onScroll);
      };
    }
  }, []);


  return (
    <nav className={`bg-black text-white sticky top-0 left-0 right-0 z-50 transition-all duration-300 ${isVisible || scrollDirection === "up" ? 'translate-y-0' : '-translate-y-full'
      }`} ref={navRef}>
      <div
        className={` transition-all duration-300 ${isVisible || scrollDirection === "up" ? 'h-0' : ''
          }`}
      />

      <div className="container">
        <div className="flex items-center pt-2 justify-between ">
          <Sheet>
            <SheetTrigger asChild>
              <button
                className="md:hidden md:invisible"
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
                    className={`block py-2 ${activeLink === type ? 'font-sans' : ''}`}
                    onClick={() => {
                      setIsMenuOpen(false);
                    }}
                  >
                    {type}
                  </div>
                ))}
              </div>
              <SheetClose asChild>
              </SheetClose>
            </SheetContent>
          </Sheet>

          <div className=' flex flex-col'>
            <p className='text-black invisible'>.</p>
            <Link href={"/"} className="text-xs lg:text-2xl font-bold hover:text-gray-600 cursor-pointer">PRESTIGE ATTIRE</Link>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <SearchFromNavbar />
            </div>
            <User className='text-sm md:text-xl cursor-pointer hover:text-gray-600' />
            <FaCartShopping className='cursor-pointer hover:text-gray-600' />
          </div>
        </div>
      </div>
      <div className="hidden md:flex justify-between lg:p-4">
        {shoeTypes.map((type) => (
          <div
            key={type}
            className={`block py-2 cursor-pointer ${activeLink === type ? 'border-b-2' : ''}`}
            onClick={(e) => handleShoeTypeClick(type, e)}
          >
            {type}
          </div>
        ))}
      </div>


      {activeLink && (
        <div
          className="absolute bg-black h-44 w-44 border-2 border-t-slate-100 text-white z-10"
          style={{ top: `${categoryPosition.top}px`, left: `${categoryPosition.left}px` }}
        >
          <div className="container mx-auto px-4 py-2  cursor-pointer">
            <div className="grid grid-cols-1 gap-2">
              {shoeCategories[activeLink]?.map((category, index) => (
                <div key={index} className="">{category}</div>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;