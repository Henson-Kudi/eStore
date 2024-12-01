"use client"
import Link from 'next/link';
import React, { useState } from 'react';


//dummy data for dev purposes will be remove in production

export const images = [
  {
    src: 'https://images.unsplash.com/photo-1616615965190-08884c4d85c4?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGFkZGlkYXN8ZW58MHx8MHx8fDA%3D',
    text: 'Addidas',
  },
  {
    src: 'https://images.unsplash.com/photo-1641203639735-3eadf983e615?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fFB1bWElMjBzaG9lc3xlbnwwfHwwfHx8MA%3D%3D',
    text: 'Puma',
  },
  {
    src: 'https://plus.unsplash.com/premium_photo-1667762240969-c1b16cf23a1c?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8UHVtYSUyMHNob2VzfGVufDB8fDB8fHww',
    text: 'Puma T',
  },
  {
    src: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fFdhbGFjaGUlMjBzaG9lc3xlbnwwfHwwfHx8MA%3D%3D',
    text: 'Walache',
  },
  {
    src: 'https://images.unsplash.com/photo-1543508282-6319a3e2621f?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGx1aXNlJTIwdmljdG9yJTIwc2hvZXN8ZW58MHx8MHx8fDA%3D',
    text: 'Luise Victor',
  },
  {
    src: 'https://images.unsplash.com/photo-1654130491481-dc83a0a05e4e?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fG5pa2UlMjBzaG9lc3xlbnwwfHwwfHx8MA%3D%3D',
    text: 'Nike',
  },
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    if (currentIndex < images.length - 3) {
      setCurrentIndex(currentIndex + 3);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 3);
    }
  };

  return (
    <div className="carousel w-full flex flex-col md:py-10 py-5">
      <p className="text-2xl md:text-4xl text-center mb-4 font-bold font-sans">Shop By Brand</p>
      <div className="flex justify-center items-center space-x-4">
        {currentIndex > 0 && (
          <button onClick={prevSlide} className="btn btn-circle text-2xl text-gray-500 invisible lg:visible">
            ❮
          </button>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 w-[95%] gap-4 md:pt-10 pt-5">
          {images.slice(currentIndex, currentIndex + 3).map((image, index) => (
            <Link href={'/collection'} key={index} className="relative text-center">
              <img src={image.src} alt={image.text} className="w-full h-[300px] md:h-[620px] object-cover" />
              <div className="absolute bottom-10 md:w-[30%] sm:w-[40%] items-center left-0 right-0 bg-gray-300 bg-opacity-50 text-black sm:px md:py-4">
                <p className="text-center">{image.text}</p>
              </div>
            </Link>
          ))}
        </div>
        {currentIndex < images.length - 3 && (
          <button onClick={nextSlide} className="btn btn-circle text-2xl text-gray-500 invisible lg:visible">
            ❯
          </button>
        )}
      </div>
    </div>
  );
};

export default Carousel;