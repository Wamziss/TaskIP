import React, { useState } from 'react';
import { ChevronDown } from 'react-bootstrap-icons';
import Sidebar from './subcomponents/Sidebar';
import Header from './subcomponents/Header';
import Table from './Projects/Table';

const Projects = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState('Project A');
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const toggleDropdown = () => setShowDropdown(!showDropdown);

  const projects = ['Project A', 'Project B', 'Project C'];


  return (
    <div className="flex h-screen bg-gray-100 overflow-x-hidden">
      {/* Sidebar */}
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${isOpen ? 'ml-64' : 'ml-0'} lg:ml-64 overflow-x-hidden`}>
        <Header />

        <main className="flex-1 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <h1 className="text-2xl font-semibold mb-6">MY PROJECTS</h1>

            {/* Project Selector */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center space-x-4">
                <button
                  onClick={toggleDropdown}
                  className="text-xl font-semibold text-gray-900 flex items-center space-x-2"
                >
                  <span>{selectedProject}</span>
                  <ChevronDown className="h-5 w-5 text-gray-600" />
                </button>

                {/* Dropdown for project selection */}
                {showDropdown && (
                  <div className="absolute z-10 mt-2 w-48 bg-white shadow-lg rounded-md">
                    <ul className="divide-y divide-gray-200">
                      {projects.map((project) => (
                        <li
                          key={project}
                          onClick={() => {
                            setSelectedProject(project);
                            setShowDropdown(false);
                          }}
                          className="py-2 px-4 hover:bg-gray-100 cursor-pointer"
                        >
                          {project}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Task Table */}
            <div className="overflow-x-auto">
                <Table/>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Projects;
