import React, { useState, useEffect } from 'react';
import { ChevronDown, Plus, ThreeDotsVertical } from 'react-bootstrap-icons';
import Sidebar from './subcomponents/Sidebar';
import Table from './Dashboard/Table';
import Header from './subcomponents/Header';

const Governance = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState('Project A');
  const [showModal, setShowModal] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const toggleModal = () => setShowModal(!showModal);
  const toggleDropdown = () => setShowDropdown(!showDropdown);

  const projects = ['Project A', 'Project B', 'Project C'];


  return (
    <div className="flex h-screen bg-gray-100 overflow-x-hidden">
      {/* Sidebar */}
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${isOpen ? 'ml-64' : 'ml-0'} lg:ml-64 overflow-x-hidden`}>
        <Header/>

        <main className="flex-1 bg-white ">
          <div className="bg-white shadow p-4 rounded-lg mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Project Governance</h1>
            <p className="text-gray-600">Manage roles, permissions, and voting for important project decisions.</p>
          </div>

          {/* Role Management */}
          <div className="bg-white shadow p-4 rounded-lg mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Role Management</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Role Card */}
              <div className="p-4 bg-blue-50 rounded-lg shadow">
                <h3 className="text-lg font-bold text-blue-600">Admin</h3>
                <p className="text-sm text-gray-600">Full access to project settings, task management, and team permissions.</p>
              </div>

              <div className="p-4 bg-green-50 rounded-lg shadow">
                <h3 className="text-lg font-bold text-green-600">Contributor</h3>
                <p className="text-sm text-gray-600">Can edit and manage tasks, but no access to project settings or roles.</p>
              </div>

              <div className="p-4 bg-yellow-50 rounded-lg shadow">
                <h3 className="text-lg font-bold text-yellow-600">Viewer</h3>
                <p className="text-sm text-gray-600">Can view tasks and project details, but cannot make edits.</p>
              </div>
            </div>
          </div>

          {/* Project Ownership */}
          <div className="bg-white shadow p-4 rounded-lg mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Project Ownership</h2>
            <p className="text-gray-600">Current Owner: <span className="font-bold text-gray-800">Hannah Mwangi</span></p>
            <button className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-700">
              Transfer Ownership
            </button>
          </div>

          {/* Voting System */}
          <div className="bg-white shadow p-4 rounded-lg mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Voting System</h2>
            <p className="text-gray-600 mb-4">Submit proposals and allow team members to vote on key decisions.</p>
            <button className="bg-green-600 text-white py-2 px-4 rounded-lg shadow hover:bg-green-700">
              Create New Proposal
            </button>
            <div className="mt-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Active Proposals</h3>
              {/* Example Proposal */}
              <div className="bg-gray-50 p-4 rounded-lg shadow mb-4">
                <h4 className="font-semibold text-gray-700">Proposal: Extend Project Deadline</h4>
                <p className="text-sm text-gray-600">Proposed by: John Doe</p>
                <div className="flex items-center mt-4 space-x-4">
                  <button className="bg-green-500 text-white py-1 px-3 rounded-lg hover:bg-green-600">Vote Yes</button>
                  <button className="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600">Vote No</button>
                </div>
              </div>
            </div>
          </div>

          {/* Access Logs */}
          <div className="bg-white shadow p-4 rounded-lg mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Access Logs</h2>
            <p className="text-gray-600 mb-4">View who has accessed and made changes to the project.</p>
            {/* Example Log */}
            <div className="bg-gray-50 p-4 rounded-lg shadow">
              <p className="text-sm text-gray-600">John Doe updated task <span className="font-bold">"Complete Report"</span> on Oct 10, 2024 at 2:34 PM</p>
            </div>
          </div>

          {/* Policies and Guidelines */}
          <div className="bg-white shadow p-4 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Policies & Guidelines</h2>
            <p className="text-gray-600">Ensure the team follows these project policies:</p>
            <ul className="list-disc list-inside mt-4 text-gray-600">
              <li>All members must vote on major decisions.</li>
              <li>Admins can only transfer ownership with consent from the majority.</li>
              <li>Changes to deadlines must be voted on and approved by the team.</li>
            </ul>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Governance;