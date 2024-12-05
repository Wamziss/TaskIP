import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import logo from '../../assets/logo.svg';

export const Navbar = ({ handleSignIn }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [activeLink, setActiveLink] = useState(null);

  const navLinks = [
    { name: 'Features', href: '#features' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Pricing', href: '#pricing' }
  ];

  return (
    <motion.nav 
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex-shrink-0 cursor-pointer"
          >
            <img src={logo} alt="TaskIP Logo" className="w-32 h-12" />
          </motion.div>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                onMouseEnter={() => setActiveLink(link.name)}
                onMouseLeave={() => setActiveLink(null)}
                className="relative text-gray-600 hover:text-[#4A90E2] text-sm font-medium"
              >
                {link.name}
                {activeLink === link.name && (
                  <motion.span 
                    layoutId="underline"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#4A90E2]"
                  />
                )}
              </motion.a>
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSignIn}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="bg-[#4A90E2] text-white px-6 py-2 rounded-full flex items-center space-x-2 overflow-hidden"
          >
            <span>Sign In</span>
            <motion.div
              animate={{ 
                x: isHovered ? 5 : 0,
                opacity: isHovered ? 1 : 0.7 
              }}
            >
              <ArrowRight className="w-4 h-4" />
            </motion.div>
          </motion.button>
        </div>
      </div>
    </motion.nav>
  );
};
