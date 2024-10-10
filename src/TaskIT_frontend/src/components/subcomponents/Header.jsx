import React from 'react';
import { Bell, Search} from 'react-bootstrap-icons';

function Header() {
  return (
    <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto py-3 px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center">
              <div className="relative w-2/3 max-w-md mx-auto">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              <div className="flex items-center space-x-4">
                <Bell className="text-gray-600" />
                <div className="w-8 h-8 rounded-full bg-gray-300"></div>
              </div>
            </div>
          </div>
        </header>
  )
}

export default Header