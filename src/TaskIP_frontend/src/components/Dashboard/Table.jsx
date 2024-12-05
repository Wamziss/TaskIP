//Dashboard table
import React, { useState } from 'react';
import { X, Users } from 'lucide-react';

// Assignees Modal Component
const AssigneesModal = ({ assignees, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl w-80 max-w-sm mx-4">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-800">Assignees</h2>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        <div className="p-4">
          <ul className="space-y-2">
            {assignees.map((assignee, index) => (
              <li 
                key={index} 
                className="flex items-center space-x-2 text-gray-700"
              >
                <Users size={16} className="text-gray-500" />
                <span>{assignee}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

function Table({ tasks }) {
    const [expandedTasks, setExpandedTasks] = useState({});
    const [selectedAssignees, setSelectedAssignees] = useState(null);

    const toggleTask = (taskId) => { 
        setExpandedTasks(prevState => ({
            ...prevState,
            [taskId]: !prevState[taskId]
        }));
    }

    const openAssigneesModal = (assignees) => {
        setSelectedAssignees(assignees);
    }

    const closeAssigneesModal = () => {
        setSelectedAssignees(null);
    }

    const getPriorityStyles = (priority) => {
        if(priority === 'urgent') {
            return 'bg-red-100 text-red-800';
        } else if(priority === 'normal') {
            return 'bg-green-100 text-green-800';
        } else {
            return 'bg-gray-100 text-gray-800';
        }
    }

    return (
        <>
            <div className="w-full overflow-x-auto shadow-md rounded-lg">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            {['Tasks', 'Description', 'Assignees', 'Due Date', 'Priority', 'Created at'].map((header) => (
                                <th key={header} className="px-4 py-3">{header}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.map((task) => (
                            <React.Fragment key={task.id}>
                                <tr 
                                    className="border-b hover:bg-gray-100 cursor-pointer"
                                    onClick={() => toggleTask(task.id)}
                                >
                                    <td className="px-4 py-3 font-medium text-gray-900">
                                        {expandedTasks[task.id] ? '▴' : '►'} {task.name}
                                    </td>
                                    <td className="px-4 py-3">{task.description}</td>
                                    <td className="px-4 py-3">
                                        <button 
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                openAssigneesModal(task.subtasks[0].assignees || [])
                                            }}
                                            className="text-blue-600 hover:underline max-w-[150px] truncate block"
                                        >
                                            {task.subtasks[0].assignees ? task.subtasks[0].assignees.slice(0, 2).join(', ') + (task.subtasks[0].assignees.length > 2 ? '...' : '') : 'Unassigned'}
                                        </button>
                                    </td>
                                    <td className="px-4 py-3">
                                        {task.subtasks && task.subtasks.length > 0 
                                            ? new Date(task.subtasks[0].dueDate).toLocaleDateString() 
                                            : 'N/A'}
                                    </td>
                                    <td className="px-4 py-3">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                            getPriorityStyles(task.subtasks?.[0]?.priority)
                                        }`}>
                                            {/* {typeof task.subtasks?.[0]?.priority === 'string'
                                                ? task.subtasks?.[0]?.priority
                                                : 'None'} */}
                                                {typeof task.subtasks?.[0]?.priority === 'string'
                                                ? task.subtasks?.[0]?.priority
                                                : Object.keys(task.subtasks?.[0]?.priority || {}).join(', ') || 'None'}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3">
                                        {new Date(Number(task.createdAt) / 1_000_000).toLocaleDateString()}
                                    </td>
                                </tr>

                                {/* Subtasks Rendering */}
                                {expandedTasks[task.id] && task.subtasks?.map((subtask) => (
                                    <tr key={subtask.id} className="bg-gray-50 hover:bg-gray-100">
                                        <td className="px-4 py-3 pl-10 font-medium text-gray-900">▫ {subtask.name}</td>
                                        <td className="px-4 py-3">{subtask.description}</td>
                                        <td className="px-4 py-3">
                                            <button 
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    openAssigneesModal(subtask.assignees || [])
                                                }}
                                                className="text-blue-600 hover:underline max-w-[150px] truncate block"
                                            >
                                                {subtask.assignees ? subtask.assignees.slice(0, 2).join(', ') + (subtask.assignees.length > 2 ? '...' : '') : 'Unassigned'}
                                            </button>
                                        </td>
                                        <td className="px-4 py-3">
                                            {new Date(subtask.dueDate).toLocaleDateString()}
                                        </td>
                                        <td className="px-4 py-3">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                getPriorityStyles(subtask.priority)
                                            }`}>
                                                    {typeof subtask.priority === 'string'
                                                    ? subtask.priority
                                                    : Object.keys(subtask.priority || {}).join(', ') || 'None'}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3">
                                            {new Date(Number(subtask.createdAt) / 1_000_000).toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Assignees Modal */}
            {selectedAssignees && (
                <AssigneesModal 
                    assignees={selectedAssignees} 
                    onClose={closeAssigneesModal} 
                />
            )}
        </>
    )
}

export default Table;

// import React, { useState} from 'react'

// function Table() {
//     const [expandedTask, setExpandedTask] = useState(null);

//     const toggleTask = (taskId) => setExpandedTask(expandedTask === taskId ? null : taskId);
      
//   const tasks = [
//     {
//       id: 1,
//       name: 'Design UI',
//       todos: [
//         { id: 11, name: 'Create wireframes', description: 'Create wireframe templates', assignee: 'tg..', dueDate: '2024-03-10' },
//         { id: 12, name: 'Design mockups', description: 'Design the app mockups', assignee: 'thy..', dueDate: '2024-03-12' },
//       ],
//       description: 'Design the user interface for the new feature',
//       assignee: 'tg-ht...',
//       dueDate: '2024-03-15',
//       priority: 'urgent',
//       assignedBy: 'PID: rtdg-ht...',
//       createdAt: '2024-02-01',
//     },
//     {
//       id: 2,
//       name: 'Implement Backend',
//       todos: [
//         { id: 21, name: 'Set up database', description: 'Set up PostgreSQL', assignee: 'fhyg-i', dueDate: '2024-03-25' },
//       ],
//       description: 'Develop the backend infrastructure for the project',
//       assignee: 'PID: jg6qm-zyaaa...',
//       dueDate: '2024-03-30',
//       priority: 'normal',
//       assignedBy: 'PID: rtdg-ht...',
//       createdAt: '2024-02-05',
//     },
//   ];

//   return (
//     <table className="min-w-full divide-y divide-gray-200 table-auto">
//             <thead className="bg-gray-50">
//                 <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tasks</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assignee</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned By</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
//                 </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//                 {tasks.map((task) => (
//                 <React.Fragment key={task.id}>
//                     <tr className="cursor-pointer" onClick={() => toggleTask(task.id)}>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                         {expandedTask === task.id ? '▴' : '►'} {task.name}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{task.description}</td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{task.assignee}</td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{task.dueDate}</td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                         <span
//                         className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
//                             task.priority === 'urgent'
//                             ? 'bg-red-100 text-red-800'
//                             : task.priority === 'normal'
//                             ? 'bg-green-100 text-green-800'
//                             : 'bg-gray-100 text-gray-800'
//                         }`}
//                         >
//                         {task.priority}
//                         </span>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{task.assignedBy}</td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{task.createdAt}</td>
//                     </tr>

//                     {/* Display todos if the task is expanded */}
//                     {expandedTask === task.id && task.todos.map((todo) => (
//                     <tr key={todo.id} className="bg-gray-50">
//                         <td className="px-6 py-4 pl-10 text-sm font-medium text-gray-900">▫ {todo.name}</td>
//                         <td className="px-6 py-4 text-sm text-gray-500">{todo.description}</td>
//                         <td className="px-6 py-4 text-sm text-gray-500">PID: {todo.assignee}</td>
//                         <td className="px-6 py-4 text-sm text-gray-500">{todo.dueDate}</td>
//                         <td colSpan={3}></td>
//                     </tr>
//                     ))}
//                 </React.Fragment>
//                 ))}
//             </tbody>
//         </table>
//   )
// }

// export default Table