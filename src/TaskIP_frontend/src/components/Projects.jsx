import React, { useState } from "react";
import { ChevronDown } from "react-bootstrap-icons";
import { ThreeDotsVertical } from "react-bootstrap-icons";
import Sidebar from "./subcomponents/Sidebar";
import Header from "./subcomponents/Header";

// Modal Component for PID
const Modal = ({ isOpen, onClose, pid }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      ></div>
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Project ID Details</h3>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              ✕
            </button>
          </div>
          <div className="mt-4">
            <p className="text-gray-700 break-all">{pid}</p>
          </div>
          <div className="mt-6 flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Table Component
const Table = () => {
  const [selectedPid, setSelectedPid] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dropdownIndex, setDropdownIndex] = useState(null);

  const data = [
    {
      id: 1,
      assignedBy: "fgthy-ghht-frgg-ggrr-rgrg-dfgse",
      taskName: "Task 1",
      description: "Fix the UI bug in the dashboard.",
      dueDate: "2024-12-01",
      priority: "Urgent",
      createdAt: "2024-11-15",
      status: "In Progress",
    },
    {
      id: 2,
      assignedBy: "eggft-grg-ggrg-ggrg-ggrg-ggrg",
      taskName: "Task 2",
      description: "Develop backend for authentication.",
      dueDate: "2024-12-10",
      priority: "Normal",
      createdAt: "2024-11-18",
      status: "Pending",
    },
    // Add more rows as needed
  ];

  const truncatePid = (pid) => (pid.length > 20 ? `${pid.substring(0, 20)}...` : pid);

  const handlePidClick = (pid) => {
    setSelectedPid(pid);
    setIsModalOpen(true);
  };

  const toggleDropdown = (index) => {
    setDropdownIndex(dropdownIndex === index ? null : index);
  };

  return (
    <>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Assiged By
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Task Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Description
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Due Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Priority
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Created At
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3"></th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((item, index) => (
            <tr key={item.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.id}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <button
                  onClick={() => handlePidClick(item.assignedBy)}
                  className="text-blue-600 hover:text-blue-800 hover:underline"
                >
                  {truncatePid(item.assignedBy)}
                </button>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.taskName}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.description}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.dueDate}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.priority}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.createdAt}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.status}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <div className="relative">
                  <button
                    onClick={() => toggleDropdown(index)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <ThreeDotsVertical />
                  </button>
                  {dropdownIndex === index && (
                    <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-10">
                      <ul className="divide-y divide-gray-200">
                        <li
                          onClick={() => alert("Delete functionality not implemented")}
                          className="py-2 px-4 hover:bg-gray-100 cursor-pointer"
                        >
                          Delete
                        </li>
                        <li
                          onClick={() => alert("Request Removal functionality not implemented")}
                          className="py-2 px-4 hover:bg-gray-100 cursor-pointer"
                        >
                          Request Removal
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} pid={selectedPid} />
    </>
  );
};

const Projects = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState("Project A");
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const toggleDropdown = () => setShowDropdown(!showDropdown);

  const projects = ["Project A", "Project B", "Project C"];

  return (
    <div className="flex h-screen bg-gray-100 overflow-x-hidden">
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <div className={`flex-1 flex flex-col transition-all duration-300 ${isOpen ? "ml-64" : "ml-0"} lg:ml-64 overflow-x-hidden`}>
        <Header />
        <main className="flex-1 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <h1 className="text-2xl font-semibold mb-6">MY PROJECTS</h1>
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center space-x-4">
                <button
                  onClick={toggleDropdown}
                  className="text-xl font-semibold text-gray-900 flex items-center space-x-2"
                >
                  <span>{selectedProject}</span>
                  <ChevronDown className="h-5 w-5 text-gray-600" />
                </button>
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
            <Table />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Projects;



