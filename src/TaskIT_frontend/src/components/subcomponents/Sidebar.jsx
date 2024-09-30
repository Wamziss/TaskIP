import React from 'react';
import { Home, Folder, CheckSquare, Users, BarChart2, Vote, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const navItems = [
    { name: 'Dashboard', icon: Home, path: '/dashboard' },
    { name: 'Projects', icon: Folder, path: '/projects' },
    { name: 'Tasks', icon: CheckSquare, path: '/tasks' },
    { name: 'Team', icon: Users, path: '/team' },
    { name: 'Analytics', icon: BarChart2, path: '/analytics' },
    { name: 'Governance', icon: Vote, path: '/governance' },
    { name: 'Settings', icon: Settings, path: '/settings' },
  ];

  return (
    <div className={`md:flex flex-col w-64 bg-[#4A90E2] text-white ${isOpen ? 'fixed inset-y-0 left-0 z-50' : 'hidden'}`}>
      <div className="flex items-center justify-between h-16 px-4 bg-[#3A7BC8]">
        <span className="text-2xl font-semibold">TaskIT</span>
        <button onClick={toggleSidebar} className="md:hidden">
          <span>x</span>
        </button>
      </div>
      <nav className="flex-1 overflow-y-auto">
        <ul className="p-2">
          {navItems.map((item) => (
            <li key={item.name} className="mb-2">
              <Link
                to={item.path}
                className="flex items-center px-4 py-2 text-white hover:bg-[#3A7BC8] rounded-md transition-colors duration-200"
                onClick={toggleSidebar}
              >
                <item.icon className="mr-3" size={20} />
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;