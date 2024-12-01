"use client"
import { images } from '@/lib/constants';
import Link from 'next/link';
import React, { useState } from 'react';


//dummy data for dev purposes will be remove in production



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