"use client"
import React, { useEffect, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const sentences = [
  "This is the first sentence",
  "Here is the second sentence",
  "Finally, this is the third sentence"
];

const TextCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSentence = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % sentences.length);
  };

  const prevSentence = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + sentences.length) % sentences.length);
  };

  useEffect(() => {
    const timer = setTimeout(nextSentence, 3000);
    return () => clearTimeout(timer);
  }, [currentIndex]);
 
  return (
    <div className="flex items-center justify-center bg-white p-4">
      <button onClick={prevSentence} className="p-2">
        <FaChevronLeft  className='text-blue-600' />
      </button>
      <p className="text-blue-600 lg:text-2xl text-xs mx-2 font-sans">
        {sentences[currentIndex]}
      </p>
      <button onClick={nextSentence} className="p-2">
        <FaChevronRight  className=' text-blue-500'/>
      </button>
    </div>
  );
};

export default TextCarousel;