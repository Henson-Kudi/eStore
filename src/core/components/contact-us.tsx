"use client"

import React, { useState } from 'react';

const ContactUs: React.FC = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ name, email, message });
  };


  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-4xl">
        <h2 className="text-3xl font-bold text-center mb-6">Contact</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-4 border  focus:outline-none focus:ring-2 focus:ring-blue-500 peer"
                placeholder="Name "
              />
              <label
                htmlFor="name"
                className="absolute left-3 top-4 text-gray-500 transition-all peer-focus:-top-6 peer-focus:text-sm peer-focus:text-blue-500 peer-placeholder-shown:top-2 peer-placeholder-shown:text-base"
              >
                
              </label>
            </div>
            <div className="relative flex-1">
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-4 border focus:outline-none focus:ring-2 focus:ring-blue-500 peer"
                placeholder="Email "
              />
              <label
                htmlFor="email"
                className="absolute left-3 top-4 text-gray-500 transition-all peer-focus:-top-6 peer-focus:text-sm peer-focus:text-blue-500 peer-placeholder-shown:top-2 peer-placeholder-shown:text-base"
              >
                
              </label>
            </div>
          </div>
          <div className="flex flex-col">
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              className="w-full px-3 py-4 border focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="message"
            ></textarea>
          </div>
          <div className="flex w-full">
            <button
              type="submit"
              className="px-6 py-3 bg-black text-white  hover:bg-gray-800 transition-colors w-full"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  )
};

export default ContactUs;