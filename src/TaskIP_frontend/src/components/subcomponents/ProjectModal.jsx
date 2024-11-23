import React, { useState } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';
import { Actor } from '@dfinity/agent';

import { TaskIP_backend } from '../../../../declarations/TaskIP_backend';

function ProjectModal({ showModal, setShowModal, addProject }) {
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [tasks, setTasks] = useState([{
    name: '',
    description: '',
    subtasks: [{ 
      name: '',
      description: '',
      assignees: [''],
      dueDate: '',
      priority: 'low'
    }]
  }]);

  const handleAddTask = () => {
    setTasks([...tasks, {
      name: '',
      description: '',
      subtasks: [{
        name: '',
        description: '',
        assignees: [''],
        dueDate: '',
        priority: 'low'
      }]
    }]);
  };

  const handleAddSubtask = (taskIndex) => {
    const updatedTasks = [...tasks];
    updatedTasks[taskIndex].subtasks.push({
      name: '',
      description: '',
      assignees: [''],
      dueDate: '',
      priority: 'low'
    });
    setTasks(updatedTasks);
  };

  const handleAddAssignee = (taskIndex, subtaskIndex) => {
    const updatedTasks = [...tasks];
    updatedTasks[taskIndex].subtasks[subtaskIndex].assignees.push('');
    setTasks(updatedTasks);
  };

  const handleTaskChange = (taskIndex, field, value) => {
    const updatedTasks = [...tasks];
    updatedTasks[taskIndex][field] = value;
    setTasks(updatedTasks);
  };

  const handleSubtaskChange = (taskIndex, subtaskIndex, field, value) => {
    const updatedTasks = [...tasks];
    updatedTasks[taskIndex].subtasks[subtaskIndex][field] = value;
    setTasks(updatedTasks);
  };

  const handleAssigneeChange = (taskIndex, subtaskIndex, assigneeIndex, value) => {
    const updatedTasks = [...tasks];
    updatedTasks[taskIndex].subtasks[subtaskIndex].assignees[assigneeIndex] = value;
    setTasks(updatedTasks);
  };

  const handleSubmit = async () => {
    try {
      // Prepare the project data to match the Motoko backend's createProject signature
      const projectData = {
        projectName,
        projectDescription,
        tasks: tasks.map(task => ({
          name: task.name,
          description: task.description,
          subtasks: task.subtasks.map(subtask => ({
            name: subtask.name,
            description: subtask.description,
            assignees: subtask.assignees.filter(a => a.trim() !== ''), // Remove empty assignees
            dueDate: BigInt(new Date(subtask.dueDate).getTime()), // Convert to nanoseconds timestamp
            priority: subtask.priority
          }))
        }))
      };

      // Call the backend method to create the project
      const result = await TaskIP_backend.createProject(
        projectData.projectName,
        projectData.projectDescription,
        projectData.tasks
      );

      // Handle the result 
      switch (result) {
        case { ok: projectId }:
          // Project created successfully
          console.log('Project created with ID:', projectId);
          
          // Optional: call addProject if you're maintaining a local state
          if (addProject) {
            addProject({
              id: projectId,
              name: projectName,
              description: projectDescription,
              tasks: tasks
            });
          }

          // Close the modal
          setShowModal(false);
          break;
        
        case { err: error } :
          // Handle error cases
          console.error('Error creating project:', error);
          
          // You might want to show an error message to the user
          switch (error) {
            case 'NotAuthorized':
              alert('You are not authorized to create this project.');
              break;
            case 'InvalidInput':
              alert('Please check your project details and try again.');
              break;
            default:
              alert('An unexpected error occurred.');
          }
          break;
        default:
          console.error('Unexpected result:', result);
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      alert('Failed to create project. Please try again.');
    }
  };

  const removeTask = (taskIndex) => {
    const updatedTasks = tasks.filter((_, index) => index !== taskIndex);
    setTasks(updatedTasks);
  };

  const removeSubtask = (taskIndex, subtaskIndex) => {
    const updatedTasks = [...tasks];
    updatedTasks[taskIndex].subtasks = updatedTasks[taskIndex].subtasks.filter(
      (_, index) => index !== subtaskIndex
    );
    setTasks(updatedTasks);
  };

  const removeAssignee = (taskIndex, subtaskIndex, assigneeIndex) => {
    const updatedTasks = [...tasks];
    updatedTasks[taskIndex].subtasks[subtaskIndex].assignees = 
      updatedTasks[taskIndex].subtasks[subtaskIndex].assignees.filter(
        (_, index) => index !== assigneeIndex
      );
    setTasks(updatedTasks);
  };

  return (
    showModal && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 overflow-y-auto p-4">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl overflow-y-auto max-h-[90vh] p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Create New Project</h2>
            <X 
              onClick={() => setShowModal(false)} 
              className="cursor-pointer hover:bg-gray-100 rounded-full p-1" 
              size={24}
            />
          </div>

          <div className="space-y-6">
            {/* Project Details */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Project Name</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Project Description</label>
                <textarea
                  className="w-full p-2 border rounded-md"
                  rows={3}
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                />
              </div>
            </div>

            {/* Tasks */}
            {tasks.map((task, taskIndex) => (
              <div key={taskIndex} className="border rounded-lg p-4 space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Task {taskIndex + 1}</h3>
                  {taskIndex > 0 && (
                    <button
                      onClick={() => removeTask(taskIndex)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={20} />
                    </button>
                  )}
                </div>
                
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Task Name"
                    className="w-full p-2 border rounded-md"
                    value={task.name}
                    onChange={(e) => handleTaskChange(taskIndex, 'name', e.target.value)}
                  />
                  <textarea
                    placeholder="Task Description"
                    className="w-full p-2 border rounded-md"
                    value={task.description}
                    onChange={(e) => handleTaskChange(taskIndex, 'description', e.target.value)}
                  />

                  {/* Subtasks */}
                  {task.subtasks.map((subtask, subtaskIndex) => (
                    <div key={subtaskIndex} className="border-l-2 border-blue-200 pl-4 space-y-3">
                      <div className="flex justify-between items-center">
                        <h4 className="text-md font-medium">Subtask {subtaskIndex + 1}</h4>
                        {subtaskIndex > 0 && (
                          <button
                            onClick={() => removeSubtask(taskIndex, subtaskIndex)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 size={16} />
                          </button>
                        )}
                      </div>
                      
                      <input
                        type="text"
                        placeholder="Subtask Name"
                        className="w-full p-2 border rounded-md"
                        value={subtask.name}
                        onChange={(e) => handleSubtaskChange(taskIndex, subtaskIndex, 'name', e.target.value)}
                      />
                      <textarea
                        placeholder="Subtask Description"
                        className="w-full p-2 border rounded-md"
                        value={subtask.description}
                        onChange={(e) => handleSubtaskChange(taskIndex, subtaskIndex, 'description', e.target.value)}
                      />

                      {/* Assignees */}
                      <div className="space-y-2">
                        {subtask.assignees.map((assignee, assigneeIndex) => (
                          <div key={assigneeIndex} className="flex gap-2">
                            <input
                              type="text"
                              placeholder="Enter PID/Username"
                              className="flex-1 p-2 border rounded-md"
                              value={assignee}
                              onChange={(e) => handleAssigneeChange(taskIndex, subtaskIndex, assigneeIndex, e.target.value)}
                            />
                            {assigneeIndex > 0 && (
                              <button
                                onClick={() => removeAssignee(taskIndex, subtaskIndex, assigneeIndex)}
                                className="text-red-500 hover:text-red-700"
                              >
                                <Trash2 size={16} />
                              </button>
                            )}
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={() => handleAddAssignee(taskIndex, subtaskIndex)}
                          className="text-blue-500 hover:text-blue-700 text-sm flex items-center gap-1"
                        >
                          <Plus size={16} /> Add Another Assignee
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">Due Date</label>
                          <input
                            type="date"
                            className="w-full p-2 border rounded-md"
                            value={subtask.dueDate}
                            onChange={(e) => handleSubtaskChange(taskIndex, subtaskIndex, 'dueDate', e.target.value)}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Priority</label>
                          <select
                            className="w-full p-2 border rounded-md"
                            value={subtask.priority}
                            onChange={(e) => handleSubtaskChange(taskIndex, subtaskIndex, 'priority', e.target.value)}
                          >
                            <option value="low">Low</option>
                            <option value="normal">Normal</option>
                            <option value="urgent">Urgent</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={() => handleAddSubtask(taskIndex)}
                    className="text-blue-500 hover:text-blue-700 text-sm flex items-center gap-1"
                  >
                    <Plus size={16} /> Add Another Subtask
                  </button>
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={handleAddTask}
              className="w-full p-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-500 flex items-center justify-center gap-2"
            >
              <Plus size={20} /> Add Another Task
            </button>

            <div className="flex justify-end pt-4">
              <button
                onClick={handleSubmit}
                className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Create Project
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default ProjectModal;


// import { X } from 'lucide-react';
// import React, { useState } from 'react';
// import { Plus } from 'react-bootstrap-icons';

// function ProjectModal({ showModal, setShowModal, addTask }) {
//   const [taskName, setTaskName] = useState('');
//   const [taskDescription, setTaskDescription] = useState('');
//   const [taskDueDate, setTaskDueDate] = useState('');
//   const [taskPriority, setTaskPriority] = useState('low');
//   const [taskAssignedBy, setTaskAssignedBy] = useState('');
//   const [taskCreatedAt, setTaskCreatedAt] = useState('');
//   const [taskStatus, setTaskStatus] = useState('pending');
//   const [todos, setTodos] = useState([{ name: '', description: '', dueDate: '' }]);

//   const handleAddSubtask = () => {
//     setTodos([...todos, { name: '', description: '', dueDate: '' }]);
//   };

//   const handleTodoChange = (index, field, value) => {
//     const updatedTodos = [...todos];
//     updatedTodos[index][field] = value;
//     setTodos(updatedTodos);
//   };

//   const handleSubmit = () => {
//     const newTask = {
//       id: Date.now(), // You can change this to any unique ID generator
//       name: taskName,
//       description: taskDescription,
//       dueDate: taskDueDate,
//       priority: taskPriority,
//       assignedBy: taskAssignedBy,
//       createdAt: taskCreatedAt,
//       status: taskStatus,
//       todos: todos,
//     };
//     addTask(newTask);
//     setShowModal(false);
//   };

//   return (
//     showModal && (
//       <div className="fixed inset-0 z-50 flex py-5 pt-80 items-center overflow-y-auto justify-center bg-black bg-opacity-50">
        
//         <div className="bg-white p-6 pt-32 rounded-lg shadow-lg w-full max-w-lg overflow-y-auto">
//           <div className='flex'>
//             <X onClick={() => {setShowModal(false)}} className='relative left-[90%] bg-blue-300 text-base rounded-full p-1 h-8 w-auto'/>
//             <h2 className="text-lg font-medium mb-4">Create New Task</h2>
//           </div>
//           <form>
//             {/* Task Name */}
            
//             <div className="mb-4">
//               <label className="block text-sm font-medium">Task Name</label>
//               <input
//                 type="text"
//                 className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
//                 value={taskName}
//                 onChange={(e) => setTaskName(e.target.value)}
//               />
//             </div>

//             {/* Task Description */}
//             <div className="mb-4">
//               <label className="block text-sm font-medium">Description</label>
//               <textarea
//                 className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
//                 value={taskDescription}
//                 onChange={(e) => setTaskDescription(e.target.value)}
//               />
//             </div>

//             {/* Task Due Date */}
//             <div className="mb-4">
//               <label className="block text-sm font-medium">Due Date</label>
//               <input
//                 type="date"
//                 className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
//                 value={taskDueDate}
//                 onChange={(e) => setTaskDueDate(e.target.value)}
//               />
//             </div>

//             {/* Task Priority */}
//             <div className="mb-4">
//               <label className="block text-sm font-medium">Priority</label>
//               <select
//                 className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
//                 value={taskPriority}
//                 onChange={(e) => setTaskPriority(e.target.value)}
//               >
//                 <option value="low">Low</option>
//                 <option value="normal">Normal</option>
//                 <option value="urgent">Urgent</option>
//               </select>
//             </div>

//             {/* Assigned By */}
//             <div className="mb-4">
//               <label className="block text-sm font-medium">Assigned By</label>
//               <input
//                 type="text"
//                 className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
//                 value={taskAssignedBy}
//                 onChange={(e) => setTaskAssignedBy(e.target.value)}
//               />
//             </div>

//             {/* Created At */}
//             <div className="mb-4">
//               <label className="block text-sm font-medium">Created At</label>
//               <input
//                 type="date"
//                 className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
//                 value={taskCreatedAt}
//                 onChange={(e) => setTaskCreatedAt(e.target.value)}
//               />
//             </div>

//             {/* Task Status */}
//             <div className="mb-4">
//               <label className="block text-sm font-medium">Status</label>
//               <select
//                 className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
//                 value={taskStatus}
//                 onChange={(e) => setTaskStatus(e.target.value)}
//               >
//                 <option value="pending">Pending</option>
//                 <option value="in progress">In Progress</option>
//                 <option value="complete">Complete</option>
//                 <option value="not started">Not Started</option>
//               </select>
//             </div>

//             {/* Subtasks */}
//             <h3 className="text-sm font-medium mb-2">Subtasks</h3>
//             {todos.map((todo, index) => (
//               <div key={index} className="mb-4">
//                 <label className="block text-sm font-medium">Subtask {index + 1}</label>
//                 <input
//                   type="text"
//                   placeholder="Subtask Name"
//                   className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
//                   value={todo.name}
//                   onChange={(e) => handleTodoChange(index, 'name', e.target.value)}
//                 />
//                 <textarea
//                   placeholder="Subtask Description"
//                   className="mt-2 block w-full p-2 border border-gray-300 rounded-md"
//                   value={todo.description}
//                   onChange={(e) => handleTodoChange(index, 'description', e.target.value)}
//                 />
//                 <input
//                   type="date"
//                   className="mt-2 block w-full p-2 border border-gray-300 rounded-md"
//                   value={todo.dueDate}
//                   onChange={(e) => handleTodoChange(index, 'dueDate', e.target.value)}
//                 />
//               </div>
//             ))}

//             <button
//               type="button"
//               onClick={handleAddSubtask}
//               className="text-blue-500 hover:text-blue-700 text-sm font-medium"
//             >
//               Add another subtask
//             </button>
//           </form>

//           {/* Submit Button */}
//           <div className="mt-6 flex justify-end">
//             <button
//               onClick={handleSubmit}
//               className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
//             >
//               Create Task
//             </button>
//           </div>
//         </div>
//       </div>
//     )
//   );
// }

// export default ProjectModal;

