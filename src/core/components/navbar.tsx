"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { FaUser, FaSearch } from 'react-icons/fa';
import { list } from 'postcss';
import { FaCartShopping, } from 'react-icons/fa6';
import { User } from 'lucide-react';

const shoeTypes = [
  'Sneakers', 'Boots', 'Sandals', 'Loafers',
  'Oxfords', 'Slip-ons', 'Athletic', 'Dress Shoes'
];

const test = ["lavie", "list", "first", "second"]

const Navbar: React.FC = () => {
  const [activeLink, setActiveLink] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-black text-white">
      <div className="container mx-auto px-4">
        {/* Upper section */}
        <div className="flex items-center justify-between py-4">
          <button
            className="md:hidden md:invisible"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            ☰
          </button>
          <h1 className=" text-xs lg:text-1xl font-bold">PRESTIGE ATTIRE</h1>
          <div className=" flex items-center space-x-4">
            <div className="relative">
              <FaSearch className=" invisible md:visible absolute right-3 top-1/2 transform -translate-y-1/2" />
            </div>
            <User className='text-sm md:text-xl' />    
            <FaCartShopping />
          </div>

        </div>

        <div className="hidden md:flex justify-between py-4 border-t border-gray-700">
          {shoeTypes.map((type) => (
            <Link
              key={type}
              href={`/shoes/${type.toLowerCase()}`}
              className={`hover:text-gray-300 ${activeLink === type ? 'border-b-2' : ''}`}
              onClick={() => setActiveLink(type)}
            >
              {type}
            </Link>
          ))}
        </div>

        <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
          {shoeTypes.map((type) => (
            <Link
              key={type}
              href={`/shoes/${type.toLowerCase()}`}
              className={`block py-2 ${activeLink === type ? 'border-b-2' : ''}`}
              onClick={() => {
                setActiveLink(type);
                setIsMenuOpen(false);
              }}
            >
              {type}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;