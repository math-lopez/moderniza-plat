"use client";
import React, { useState } from 'react';
import Link from 'next/link';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-900 text-white p-5 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold tracking-wide">
          <Link href="/" className="hover:text-blue-400 transition-colors duration-300">
            Moderniza PCPJV
          </Link>
        </div>
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
              />
            </svg>
          </button>
        </div>
        <ul className={`md:flex space-x-6 md:space-x-6 ${isOpen ? 'block' : 'hidden'} md:block`}>
          <li className="mt-2 md:mt-0">
            <Link href="/home" className="hover:text-blue-400 transition-colors duration-300">
              Home
            </Link>
          </li>
          <li className="mt-2 md:mt-0">
            <Link href="/detalhes" className="hover:text-blue-400 transition-colors duration-300">
              Features
            </Link>
          </li>
          <li className="mt-2 md:mt-0">
            <Link href="/about" className="hover:text-blue-400 transition-colors duration-300">
              About
            </Link>
          </li>
          <li className="mt-2 md:mt-0">
            <Link href="/contact" className="hover:text-blue-400 transition-colors duration-300">
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
