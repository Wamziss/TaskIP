import { X } from 'lucide-react';
import React, { useState } from 'react';
import { Plus } from 'react-bootstrap-icons';

function ProjectModal({ showModal, setShowModal, addTask }) {
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskDueDate, setTaskDueDate] = useState('');
  const [taskPriority, setTaskPriority] = useState('low');
  const [taskAssignedBy, setTaskAssignedBy] = useState('');
  const [taskCreatedAt, setTaskCreatedAt] = useState('');
  const [taskStatus, setTaskStatus] = useState('pending');
  const [todos, setTodos] = useState([{ name: '', description: '', dueDate: '' }]);

  const handleAddSubtask = () => {
    setTodos([...todos, { name: '', description: '', dueDate: '' }]);
  };

  const handleTodoChange = (index, field, value) => {
    const updatedTodos = [...todos];
    updatedTodos[index][field] = value;
    setTodos(updatedTodos);
  };

  const handleSubmit = () => {
    const newTask = {
      id: Date.now(), // You can change this to any unique ID generator
      name: taskName,
      description: taskDescription,
      dueDate: taskDueDate,
      priority: taskPriority,
      assignedBy: taskAssignedBy,
      createdAt: taskCreatedAt,
      status: taskStatus,
      todos: todos,
    };
    addTask(newTask);
    setShowModal(false);
  };

  return (
    showModal && (
      <div className="fixed inset-0 z-50 flex py-5 pt-80 items-center overflow-y-auto justify-center bg-black bg-opacity-50">
        
        <div className="bg-white p-6 pt-32 rounded-lg shadow-lg w-full max-w-lg overflow-y-auto">
          <div className='flex'>
            <X onClick={() => {setShowModal(false)}} className='relative left-[90%] bg-blue-300 text-base rounded-full p-1 h-8 w-auto'/>
            <h2 className="text-lg font-medium mb-4">Create New Task</h2>
          </div>
          <form>
            {/* Task Name */}
            
            <div className="mb-4">
              <label className="block text-sm font-medium">Task Name</label>
              <input
                type="text"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
              />
            </div>

            {/* Task Description */}
            <div className="mb-4">
              <label className="block text-sm font-medium">Description</label>
              <textarea
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
              />
            </div>

            {/* Task Due Date */}
            <div className="mb-4">
              <label className="block text-sm font-medium">Due Date</label>
              <input
                type="date"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                value={taskDueDate}
                onChange={(e) => setTaskDueDate(e.target.value)}
              />
            </div>

            {/* Task Priority */}
            <div className="mb-4">
              <label className="block text-sm font-medium">Priority</label>
              <select
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                value={taskPriority}
                onChange={(e) => setTaskPriority(e.target.value)}
              >
                <option value="low">Low</option>
                <option value="normal">Normal</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>

            {/* Assigned By */}
            <div className="mb-4">
              <label className="block text-sm font-medium">Assigned By</label>
              <input
                type="text"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                value={taskAssignedBy}
                onChange={(e) => setTaskAssignedBy(e.target.value)}
              />
            </div>

            {/* Created At */}
            <div className="mb-4">
              <label className="block text-sm font-medium">Created At</label>
              <input
                type="date"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                value={taskCreatedAt}
                onChange={(e) => setTaskCreatedAt(e.target.value)}
              />
            </div>

            {/* Task Status */}
            <div className="mb-4">
              <label className="block text-sm font-medium">Status</label>
              <select
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                value={taskStatus}
                onChange={(e) => setTaskStatus(e.target.value)}
              >
                <option value="pending">Pending</option>
                <option value="in progress">In Progress</option>
                <option value="complete">Complete</option>
                <option value="not started">Not Started</option>
              </select>
            </div>

            {/* Subtasks */}
            <h3 className="text-sm font-medium mb-2">Subtasks</h3>
            {todos.map((todo, index) => (
              <div key={index} className="mb-4">
                <label className="block text-sm font-medium">Subtask {index + 1}</label>
                <input
                  type="text"
                  placeholder="Subtask Name"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  value={todo.name}
                  onChange={(e) => handleTodoChange(index, 'name', e.target.value)}
                />
                <textarea
                  placeholder="Subtask Description"
                  className="mt-2 block w-full p-2 border border-gray-300 rounded-md"
                  value={todo.description}
                  onChange={(e) => handleTodoChange(index, 'description', e.target.value)}
                />
                <input
                  type="date"
                  className="mt-2 block w-full p-2 border border-gray-300 rounded-md"
                  value={todo.dueDate}
                  onChange={(e) => handleTodoChange(index, 'dueDate', e.target.value)}
                />
              </div>
            ))}

            <button
              type="button"
              onClick={handleAddSubtask}
              className="text-blue-500 hover:text-blue-700 text-sm font-medium"
            >
              Add another subtask
            </button>
          </form>

          {/* Submit Button */}
          <div className="mt-6 flex justify-end">
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Create Task
            </button>
          </div>
        </div>
      </div>
    )
  );
}

export default ProjectModal;

