import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  PieController,
  BarController,
  Title,
  Tooltip,
  Legend,
  BarElement,
} from 'chart.js';
import { Line, Doughnut, Bar } from 'react-chartjs-2';

// Register elements and scales
ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  PieController,
  BarController,
  BarElement,
  Title,
  Tooltip,
  Legend,
);



import React, { useState, useEffect, useRef } from 'react';
import Sidebar from './subcomponents/Sidebar';
import Header from './subcomponents/Header';
import { Chart } from 'react-chartjs-2';

const Analytics = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState('Project A');
  const [showModal, setShowModal] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const chartRef = useRef(null);
  
  useEffect(() => {
    return () => {
      // Clean up chart instance to avoid reusing canvas issues
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const toggleModal = () => setShowModal(!showModal);
  const toggleDropdown = () => setShowDropdown(!showDropdown);

  const projects = ['Project A', 'Project B', 'Project C'];

  const taskStatusData = {
    labels: ['Completed', 'In Progress', 'Pending', 'Overdue'],
    datasets: [
      {
        label: 'Tasks Status',
        data: [120, 90, 40, 10], // Example data
        backgroundColor: ['#4CAF50', '#FFC107', '#03A9F4', '#FF5252'],
      },
    ],
  };

  const teamPerformanceData = {
    labels: ['Cynthia Terry', 'Alex N', 'PID: dfte-fgh..', 'Hannah Mwangi'],
    datasets: [
      {
        label: 'Tasks Completed',
        data: [30, 50, 60, 40], // Example data
        backgroundColor: '#4A90E2',
      },
    ],
  };


  return (
    <div className="flex h-screen bg-gray-100 overflow-x-hidden">
      {/* Sidebar */}
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${isOpen ? 'ml-64' : 'ml-0'} lg:ml-64 overflow-x-hidden`}>
        <Header/>

        <main className="flex-1 bg-white ">
          <div className="bg-white shadow p-4 rounded-lg mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Project Analytics</h1>
            <p className="text-gray-600">Get insights into project progress, team performance, and task metrics.</p>
          </div>

          {/* Project Overview */}
          <div className="bg-white shadow p-4 rounded-lg mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Project Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg shadow">
                <h3 className="text-lg font-bold text-blue-600">Active Projects</h3>
                <p className="text-2xl font-semibold text-gray-800">5</p>
              </div>

              <div className="p-4 bg-green-50 rounded-lg shadow">
                <h3 className="text-lg font-bold text-green-600">Completed Projects</h3>
                <p className="text-2xl font-semibold text-gray-800">12</p>
              </div>

              <div className="p-4 bg-yellow-50 rounded-lg shadow">
                <h3 className="text-lg font-bold text-yellow-600">Pending Projects</h3>
                <p className="text-2xl font-semibold text-gray-800">3</p>
              </div>
            </div>
          </div>

          {/* Task Status Metrics */}
          <div className="bg-white shadow p-4 rounded-lg mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Task Status Metrics</h2>
            <div className="h-64">
              {/* Placeholder chart (replace with real charts if needed) */}
              <Chart
                ref={chartRef} 
                type="pie"
                data={taskStatusData}
                options={{ responsive: true, maintainAspectRatio: false }}
              />
              </div>
          </div>

          {/* Team Performance */}
          <div className="bg-white shadow p-4 rounded-lg mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Team Performance</h2>
            <div className="h-64">
              {/* Placeholder chart (replace with real charts if needed) */}
              <Chart
              ref={chartRef} 
                type="bar"
                data={teamPerformanceData}
                options={{ responsive: true, maintainAspectRatio: false }}
              />
              
            </div>
          </div>

          {/* Time Tracking */}
          <div className="bg-white shadow p-4 rounded-lg mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Time Tracking</h2>
            <p className="text-gray-600">Track the total time spent on tasks across projects.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
              <div className="p-4 bg-gray-50 rounded-lg shadow">
                <h3 className="text-lg font-bold text-gray-700">Total Hours</h3>
                <p className="text-2xl font-semibold text-gray-800">340 hrs</p>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg shadow">
                <h3 className="text-lg font-bold text-gray-700">Project Alpha</h3>
                <p className="text-2xl font-semibold text-gray-800">120 hrs</p>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg shadow">
                <h3 className="text-lg font-bold text-gray-700">Project Beta</h3>
                <p className="text-2xl font-semibold text-gray-800">90 hrs</p>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg shadow">
                <h3 className="text-lg font-bold text-gray-700">Project Gamma</h3>
                <p className="text-2xl font-semibold text-gray-800">130 hrs</p>
              </div>
            </div>
          </div>

          {/* Priority Overview */}
          <div className="bg-white shadow p-4 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Priority Overview</h2>
            <p className="text-gray-600">Understand the distribution of tasks by priority level.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="p-4 bg-gray-50 rounded-lg shadow">
                <h3 className="text-lg font-bold text-gray-700">Low Priority</h3>
                <p className="text-2xl font-semibold text-gray-800">30 tasks</p>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg shadow">
                <h3 className="text-lg font-bold text-gray-700">Normal Priority</h3>
                <p className="text-2xl font-semibold text-gray-800">50 tasks</p>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg shadow">
                <h3 className="text-lg font-bold text-gray-700">Urgent Priority</h3>
                <p className="text-2xl font-semibold text-gray-800">15 tasks</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Analytics;