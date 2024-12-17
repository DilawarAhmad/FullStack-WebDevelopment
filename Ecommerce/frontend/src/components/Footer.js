import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo and Description */}
          <div className="mb-4 md:mb-0">
            <h1 className="text-xl font-bold">New Company</h1>
            <p className="mt-1 text-gray-400">© 2024 Your Company, Inc. All rights reserved.</p>
          </div>
          
          {/* Navigation Links */}
          <div className="flex flex-col md:flex-row mb-4 md:mb-0">
            <a href="/" className="text-gray-400 hover:text-white px-2">Home</a>
            <a href="/about" className="text-gray-400 hover:text-white px-2">About</a>
            <a href="/services" className="text-gray-400 hover:text-white px-2">Services</a>
            <a href="/contact" className="text-gray-400 hover:text-white px-2">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
