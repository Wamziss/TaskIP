import React, { useState } from 'react';
import Sidebar from './subcomponents/Sidebar';
import Header from './subcomponents/Header';
import { ChatDots, Eye } from 'react-bootstrap-icons';

const Team = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  // Example team data, you can fetch from backend in real implementation
  const teamMembers = [
    { name: 'Alice Johnson', role: 'Project Manager', img: 'https://via.placeholder.com/150' },
    { name: 'John Doe', role: 'Developer', img: 'https://via.placeholder.com/150' },
    { name: 'Maria Smith', role: 'Designer', img: 'https://via.placeholder.com/150' },
    { name: 'Mark Lee', role: 'QA Engineer', img: 'https://via.placeholder.com/150' }
  ];

  return (
    <div className="flex h-screen bg-gray-100 overflow-x-hidden">
      {/* Sidebar */}
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${isOpen ? 'ml-64' : 'ml-0'} lg:ml-64 overflow-x-hidden`}>
        <Header />

        <main className="flex-1 bg-white p-6">
          <h2 className="text-2xl font-semibold mb-6">Team Members</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center justify-between space-y-4">
                {/* Team member's profile image */}
                <img src={member.img} alt={member.name} className="w-24 h-24 rounded-full object-cover" />

                {/* Team member's name and role */}
                <div className="text-center">
                  <h3 className="text-xl font-semibold">{member.name}</h3>
                  <p className="text-gray-500">{member.role}</p>
                </div>

                {/* Action buttons */}
                <div className="flex space-x-4">
                  <button className="flex items-center px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 transition-colors">
                    <ChatDots className="mr-2 h-5 w-5" />
                    Message
                  </button>
                  <button className="flex items-center px-4 py-2 text-blue-500 bg-transparent border border-blue-500 rounded hover:bg-blue-500 hover:text-white transition-colors">
                    <Eye className="mr-2 h-5 w-5" />
                    View Profile
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Team;
