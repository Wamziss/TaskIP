import React, { useState } from 'react';
import { Home, Folder, Users, BarChart2, Vote, Settings, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => setIsOpen(!isOpen);

  const navItems = [
    { name: 'Dashboard', icon: Home, path: '/dashboard' },
    { name: 'Projects', icon: Folder, path: '/projects' },
    { name: 'Team', icon: Users, path: '/team' },
    { name: 'Analytics', icon: BarChart2, path: '/analytics' },
    { name: 'Governance', icon: Vote, path: '/governance' },
    { name: 'Settings', icon: Settings, path: '/settings' },
  ];

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={toggleSidebar}
        className={`fixed top-4 left-4 z-50 p-2 bg-[#4A90E2] text-white rounded-md shadow-lg md:hidden hover:bg-[#3A7BC8] transition-colors duration-200 ${isOpen ? 'hidden' : ''}`}
        aria-label="Toggle menu"
      >
        <Menu size={24} />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-gradient-to-b from-[#4A90E2] to-[#3A7BC8] text-white transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 shadow-lg`}
      >
        <div className="flex items-center justify-between h-16 px-4 bg-[#3A7BC8]">
          <span className="text-2xl font-bold">TaskIT</span>
          <button onClick={toggleSidebar} className="md:hidden hover:bg-[#2A6BB8] p-1 rounded transition-colors duration-200">
            <X size={24} />
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto pt-4">
          <ul className="px-2 space-y-4">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className={`flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${
                    location.pathname === item.path
                      ? 'bg-white text-[#3A7BC8] shadow-md'
                      : 'text-white hover:bg-[#3A7BC8] hover:shadow-md'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <item.icon className="mr-3" size={20} />
                  <span className="font-medium">{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
};

export default Sidebar;

