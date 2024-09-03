"use client"
import React, { useState } from 'react';
import MostPopularCategories from './most-popular-cat';
import ProductGrid, { Product } from "@/core/components/grid-container";


const images = [
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



const products: Product[] = [
  {
    id: 1,
    imageUrl: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c2hvZXN8ZW58MHx8MHx8fDA%3D",
    description: "t test test est",
    price: 234,
    discount: 20

  },
  {
    id: 2,

    imageUrl: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c2hvZXN8ZW58MHx8MHx8fDA%3D",
    description: "t test test est",
    price: 234,
    discount: 20

  },
  {
    id: 3,

    imageUrl: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c2hvZXN8ZW58MHx8MHx8fDA%3D",
    description: "t test test est",
    price: 234,
    discount: 20

  },
  {
    id: 4,

    imageUrl: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c2hvZXN8ZW58MHx8MHx8fDA%3D",
    description: "t test test est",
    price: 234,
    discount: 20

  },
 
]

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
    <div className="carousel w-full flex flex-col py-10">
      <p className="text-3xl text-center mb-4">Shop By Brand</p>
      <div className="flex justify-center items-center space-x-4">
        {currentIndex > 0 && (
          <button onClick={prevSlide} className="btn btn-circle text-2xl text-gray-500">
            ❮
          </button>
        )}
        <div className="grid grid-cols-2 w-[95%] md:grid md:grid-cols-3 gap-4">
          {images.slice(currentIndex, currentIndex + 3).map((image, index) => (
            <div key={index} className="relative text-center">
              <img src={image.src} alt={image.text} className="w-full" />
              <div className="absolute bottom-10 w-[30%] items-center left-0 right-0 bg-gray-300 bg-opacity-50 text-black py-2">
                <p className="text-center">{image.text}</p>
              </div>
            </div>
          ))}
        </div>
        {currentIndex < images.length - 3 && (
          <button onClick={nextSlide} className="btn btn-circle text-2xl text-gray-500">
            ❯
          </button>
        )}
      </div>
    </div>

    <MostPopularCategories products={products}/>
    </>
  );
}

export default Carousel;