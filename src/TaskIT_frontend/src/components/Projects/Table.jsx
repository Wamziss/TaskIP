import React, { useState} from 'react';
import { ChevronDown, ThreeDotsVertical } from 'react-bootstrap-icons';

function Table() { 
  const [expandedTask, setExpandedTask] = useState(null);
  const [statusDropdown, setStatusDropdown] = useState(null); // For task status dropdown
  const [taskActionModal, setTaskActionModal] = useState(null); // For task actions modal
  const [selectedStatus, setSelectedStatus] = useState('in progress'); // Default status

    const toggleTask = (taskId) => setExpandedTask(expandedTask === taskId ? null : taskId);
    const toggleStatusDropdown = (taskId) => setStatusDropdown(statusDropdown === taskId ? null : taskId);
    const toggleTaskActionModal = (taskId) => setTaskActionModal(taskActionModal === taskId ? null : taskId);
  
    
  const tasks = [
    {
      id: 1,
      name: 'Task 1',
      description: 'Task desc',
      dueDate: '24/03/25',
      priority: 'low',
      assignedBy: 'PID: tyhe-ye...',
      createdAt: '24/07/24',
      status: 'in progress',
      todos: [
        { id: 11, name: 'Subtask 1', description: 'Description of subtask 1', dueDate: '24/03/10' },
        { id: 12, name: 'Subtask 2', description: 'Description of subtask 2', dueDate: '24/03/12' }
      ]
    },
    {
      id: 2,
      name: 'Task 2',
      description: 'Task description for task 2',
      dueDate: '24/04/15',
      priority: 'urgent',
      assignedBy: 'PID: asdf-ty...',
      createdAt: '24/07/24',
      status: 'pending',
      todos: [
        { id: 21, name: 'Subtask A', description: 'Subtask A description', dueDate: '24/04/10' }
      ]
    }
  ];

  const statusOptions = ['pending', 'in progress', 'complete', 'not started'];

  return (
    <table className="min-w-full divide-y divide-gray-200 table-auto">
    <thead className="bg-gray-50">
      <tr>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Task Name</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned By</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
      </tr>
    </thead>
    <tbody className="bg-white divide-y divide-gray-200">
      {tasks.map((task) => (
        <React.Fragment key={task.id}>
          <tr>
            <td className="px-6 py-4 whitespace-nowrap">{task.name}</td>
            <td className="px-6 py-4 whitespace-nowrap">{task.description}</td>
            <td className="px-6 py-4 whitespace-nowrap">{task.dueDate}</td>
            <td className="px-6 py-4 whitespace-nowrap">{task.priority}</td>
            <td className="px-6 py-4 whitespace-nowrap">{task.assignedBy}</td>
            <td className="px-6 py-4 whitespace-nowrap">{task.createdAt}</td>

            {/* Status Dropdown */}
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="relative">
                <button
                  onClick={() => toggleStatusDropdown(task.id)}
                  className="text-gray-700 hover:text-gray-900"
                >
                  {task.status} <ChevronDown className="inline-block h-4 w-4" />
                </button>
                {statusDropdown === task.id && (
                  <div className="absolute z-10 mt-1 w-36 bg-white shadow-md rounded-md">
                    {statusOptions.map((status) => (
                      <div
                        key={status}
                        onClick={() => {
                          setSelectedStatus(status);
                          setStatusDropdown(null);
                        }}
                        className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                      >
                        {status}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </td>

            {/* Task actions (3 dots) */}
            <td className="px-6 py-4 whitespace-nowrap text-right">
              <button
                onClick={() => toggleTaskActionModal(task.id)}
                className="text-gray-500 hover:text-gray-700"
              >
                <ThreeDotsVertical className="h-5 w-5" />
              </button>

              {taskActionModal === task.id && (
                <div className="absolute z-10 mt-2 w-48 bg-white shadow-lg rounded-md">
                  <ul>
                    <li className="py-2 px-4 hover:bg-gray-100 cursor-pointer">Delete</li>
                    <li className="py-2 px-4 hover:bg-gray-100 cursor-pointer">Request Removal</li>
                    <li className="py-2 px-4 hover:bg-gray-100 cursor-pointer">Mark Complete</li>
                  </ul>
                </div>
              )}
            </td>
          </tr>

          {/* Task To-dos */}
          {expandedTask === task.id && task.todos.map((todo) => (
            <tr key={todo.id} className="bg-gray-50">
              <td className="px-6 py-4 pl-12">{todo.name}</td>
              <td className="px-6 py-4">{todo.description}</td>
              <td className="px-6 py-4">{todo.dueDate}</td>
              <td colSpan="5"></td>
            </tr>
          ))}
        </React.Fragment>
      ))}
    </tbody>
  </table>
  )
}

export default Table