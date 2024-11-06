"use client"
import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

const SearchComponent: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Search term:', searchTerm);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-black p-4">
      <div className="w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6">SEARCH</h2>
        <form onSubmit={handleSubmit} className="relative">
          <div className="relative">
            <input
              type="text"
              id="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-10 py-2 bg-gray-200 border-1 border-gray-200  focus:outline-none focus:ring-2 focus:ring-black focus:border-black peer"
              placeholder="Search..."
            />
            <label
              htmlFor="search"
              className="absolute left-2 -top-3 bg-gray-100 px-1 text-sm text-gray-600 transition-all peer-focus:text-black"
            >
              Search
            </label>
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          <button
            type="submit"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-1 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
          >
            Go
          </button>
        </form>
      </div>
    </div>
  );
};

export default SearchComponent;