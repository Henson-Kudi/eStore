"use client"
import React, { useState } from 'react';


//dummy data for dev purposes will be remove in production

export const images = [
  {
    src: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c2hvZXN8ZW58MHx8MHx8fDA%3D',
    text: 'Image 1',
  },
  {
    src: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c2hvZXN8ZW58MHx8MHx8fDA%3D',
    text: 'Image 2',
  },
  {
    src: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c2hvZXN8ZW58MHx8MHx8fDA%3D',
    text: 'Image 3',
  },
  {
    src: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c2hvZXN8ZW58MHx8MHx8fDA%3D',
    text: 'Image 4',
  },
  {
    src: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c2hvZXN8ZW58MHx8MHx8fDA%3D',
    text: 'Image 5',
  },
  {
    src: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c2hvZXN8ZW58MHx8MHx8fDA%3D',
    text: 'Image 6',
  },
];


function Carousel() {
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
    <>
    <div className="carousel w-full flex flex-col md:py-10 py-5">
      <p className="text-2xl md:text-4xl text-center mb-4 font-bold font-sans">Shop By Brand</p>
      <div className="flex justify-center items-center space-x-4">
        {currentIndex > 0 && (
          <button onClick={prevSlide} className="btn btn-circle text-2xl text-gray-500 invisible lg:visible">
            ❮
          </button>
        )}
        <div className="grid grid-cols-3 w-[95%]  gap-4 md:grid-cols-3 md:pt-10 pt-5">
          {images.slice(currentIndex, currentIndex + 3).map((image, index) => (
            <div key={index} className="relative text-center">
              <img src={image.src} alt={image.text} className="w-full" />
              <div className="absolute bottom-10 md:w-[30%] sm:w-[20%] items-center left-0 right-0 bg-gray-300 bg-opacity-50 text-black sm-px md:py-2">
                <p className="text-center">{image.text}</p>
              </div>
            </div>
          ))}
        </div>
        {currentIndex < images.length - 3 && (
          <button onClick={nextSlide} className="btn btn-circle text-2xl text-gray-500 invisible lg:visible">
            ❯
          </button>
        )}
      </div>
    </div>
    </>
  );
}

export default Carousel;