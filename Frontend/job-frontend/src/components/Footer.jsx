import React from "react";
import { FaFacebook, FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
        
        {/* Branding */}
        <div className="text-sm text-center md:text-left">
          &copy; {new Date().getFullYear()} Job Portal. All rights reserved.
        </div>

        {/* Links */}
        <div className="flex gap-4 text-sm">
          <a href="/" className="hover:underline">Home</a>
          <a href="/jobs" className="hover:underline">Jobs</a>
          <a href="/about" className="hover:underline">About</a>
          <a href="/contact" className="hover:underline">Contact</a>
        </div>

        {/* Social Icons */}
        <div className="flex gap-4 text-lg">
          <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-blue-500"><FaFacebook /></a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-blue-400"><FaTwitter /></a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-blue-300"><FaLinkedin /></a>
          <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-gray-400"><FaGithub /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
