"use client"
import React from 'react';

const HeroSection: React.FC = () => {
  return (
    <>
    <div className="relative bg-gray-900 flex-col h-[50vh] md:h-[60vh] lg:h-[70vh] flex items-center justify-center overflow-hidden">
      {/* image this way for dev purposes */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2012&q=80')",
        }}
      >

        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>
      <div className="relative z-10 text-center">
        <h1 className="text-white font-bold">
          <span className="block text-blue-500 text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-[-0.5em] animate-bounce">
            New
          </span>
          <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-wider">
            ARRIVALS
          </span>
        </h1>
      </div>
    </div>
      </>
  );
};

export default HeroSection;