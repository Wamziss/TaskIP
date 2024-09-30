import React, { useState } from 'react';
import { Bell, Search, ChevronDown, Plus, } from 'react-bootstrap-icons';
import Sidebar from './subcomponents/Sidebar'; // Assuming the Sidebar component is in the same directory

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState('Project A');
  const [tasks, setTasks] = useState([
    {
      id: 1,
      name: 'Design UI',
      todos: [
        { id: 11, name: 'Create wireframes' },
        { id: 12, name: 'Design mockups' },
      ],
      description: 'Design the user interface for the new feature',
      assignee: 'rrkah-fqaaa-aaaaa-aaaaq-cai',
      dueDate: '2024-03-15',
      priority: 'urgent',
      assignedBy: 'e3mmv-5qaaa-aaaah-qcm4a-cai',
      createdAt: '2024-02-01',
    },
    {
      id: 2,
      name: 'Implement Backend',
      todos: [
        { id: 21, name: 'Set up database' },
        { id: 22, name: 'Create API endpoints' },
      ],
      description: 'Develop the backend infrastructure for the project',
      assignee: 'jg6qm-zyaaa-aaaah-qcq5q-cai',
      dueDate: '2024-03-30',
      priority: 'normal',
      assignedBy: 'e3mmv-5qaaa-aaaah-qcm4a-cai',
      createdAt: '2024-02-05',
    },
    // Add more tasks as needed
  ]);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'low': return 'bg-gray-200 text-gray-800';
      case 'normal': return 'bg-green-200 text-green-800';
      case 'urgent': return 'bg-red-200 text-red-800';
      default: return 'bg-gray-200 text-gray-800';
    }
  };

  const truncate = (str, n) => {
    return str.length > n ? str.substr(0, n - 1) + '...' : str;
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center">
              <div className="relative rounded-full w-1/3">
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

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[#A4C3E3]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">Projects</h1>
                <div className="mt-1 relative">
                  <button
                    type="button"
                    className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-[#4A90E2]"
                  >
                    {selectedProject}
                    <ChevronDown className="ml-2 h-5 w-5" />
                  </button>
                </div>
              </div>
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#4A90E2] hover:bg-[#3A7BC8] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4A90E2]"
              >
                <Plus className="mr-2 h-5 w-5" /> CREATE PROJECT
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
