// Projects page table
import React, { useState } from 'react';
import { X, Users, Folder, List } from 'lucide-react';

// Members Modal Component
const MembersModal = ({ members, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl w-80 max-w-sm mx-4">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-800">Project Members</h2>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        <div className="p-4">
          <ul className="space-y-2">
            {members.length > 0 ? (
                members.map((member, index) => (
                    <li key={index} className="flex items-center space-x-2 text-gray-700">
                        <Users size={16} className="text-gray-500" />
                        <span>{member}</span>
                    </li>
                ))
            ) : (
                <li className="text-gray-500">No members found</li>
            )}
        </ul>

        </div>
      </div>
    </div>
  );
};

function Table({ projects }) {
    const [expandedProjects, setExpandedProjects] = useState({});
    const [selectedMembers, setSelectedMembers] = useState(null);

    const toggleProject = (projectId) => { 
        setExpandedProjects(prevState => ({
            ...prevState,
            [projectId]: !prevState[projectId]
        }));
    }

    const openMembersModal = (members) => {
        
        setSelectedMembers(members);
    }

    const closeMembersModal = () => {
        setSelectedMembers(null);
    }

    return (
        <>
            <div className="w-full overflow-x-auto shadow-md rounded-lg">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            {['Project Name', 'Description', 'Tasks', 'Created At', 'Created By', 'Members'].map((header) => (
                                <th key={header} className="px-4 py-3">{header}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {projects.map((project) => (
                            <React.Fragment key={project.id}>
                                <tr 
                                    className="border-b hover:bg-gray-100 cursor-pointer"
                                    onClick={() => toggleProject(project.id)}
                                >
                                    <td className="px-4 py-3 font-medium text-gray-900">
                                        {expandedProjects[project.id] ? '▴' : '►'} {project.name}
                                    </td>
                                    <td className="px-4 py-3 max-w-[200px] truncate">{project.description}</td>
                                    <td className="px-4 py-3 flex items-center">
                                        <List size={16} className="mr-2 text-gray-500" />
                                        {project.tasks.length} Tasks
                                    </td>
                                    <td className="px-4 py-3">
                                        {new Date(Number(project.createdAt) / 1_000_000).toLocaleDateString()}
                                    </td>
                                    <td className="px-4 py-3">{project.createdBy.toString()}</td>
                                    <td className="px-4 py-3">
                                        <button 
                                            // onClick={(e) => {
                                            //     e.stopPropagation();
                                            //     openMembersModal(typeof project.members === 'string'
                                            //         ? project.members
                                            //         : Object.keys(project.members || {}).join(', ') || 'None')
                                            // }} 
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                const normalizedMembers =
                                                    Array.isArray(project.members)
                                                        ? project.members
                                                        : typeof project.members === 'object'
                                                        ? Object.values(project.members)
                                                        : [];
                                                openMembersModal(normalizedMembers);
                                            }}
                                            
                                            className="flex items-center text-blue-600 hover:underline"
                                        >
                                            <Users size={16} className="mr-2" />
                                            {project.members.length} Members
                                        </button>
                                    </td>
                                </tr>

                                {/* Expanded Project Details */}
                                {expandedProjects[project.id] && (
                                    <tr className="bg-gray-50">
                                        <td colSpan="6" className="px-6 py-4">
                                            <div className="bg-white shadow rounded-lg p-4">
                                                <h3 className="text-lg font-semibold mb-4 flex items-center">
                                                    <Folder size={20} className="mr-2 text-gray-500" />
                                                    Project Tasks
                                                </h3>
                                                <table className="w-full">
                                                    <thead className="bg-gray-100">
                                                        <tr>
                                                            <th className="px-4 py-2 text-left">Task Name</th>
                                                            <th className="px-4 py-2 text-left">Description</th>
                                                            <th className="px-4 py-2 text-left">Subtasks</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {project.tasks.map((task) => (
                                                            <tr key={task.id} className="border-b hover:bg-gray-50">
                                                                <td className="px-4 py-2">{task.name}</td>
                                                                <td className="px-4 py-2 max-w-[300px] truncate">{task.description}</td>
                                                                <td className="px-4 py-2 flex items-center">
                                                                    <List size={16} className="mr-2 text-gray-500" />
                                                                    {task.subtasks.length} Subtasks
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Members Modal */}
            {selectedMembers && (
                <MembersModal 
                    members={selectedMembers} 
                    onClose={closeMembersModal} 
                />
            )}
        </>
    )
}

export default Table;


// import React, { useState} from 'react';
// import { ChevronDown, ThreeDotsVertical } from 'react-bootstrap-icons';

// function Table() { 
//   const [expandedTask, setExpandedTask] = useState(null);
//   const [statusDropdown, setStatusDropdown] = useState(null); // For task status dropdown
//   const [taskActionModal, setTaskActionModal] = useState(null); // For task actions modal
//   const [selectedStatus, setSelectedStatus] = useState('in progress'); // Default status

//     const toggleTask = (taskId) => setExpandedTask(expandedTask === taskId ? null : taskId);
//     const toggleStatusDropdown = (taskId) => setStatusDropdown(statusDropdown === taskId ? null : taskId);
//     const toggleTaskActionModal = (taskId) => setTaskActionModal(taskActionModal === taskId ? null : taskId);
  
    
//   const tasks = [
//     {
//       id: 1,
//       name: 'Task 1',
//       description: 'Task desc',
//       dueDate: '24/03/25',
//       priority: 'low',
//       assignedBy: 'PID: tyhe-ye...',
//       createdAt: '24/07/24',
//       status: 'in progress',
//       todos: [
//         { id: 11, name: 'Subtask 1', description: 'Description of subtask 1', dueDate: '24/03/10' },
//         { id: 12, name: 'Subtask 2', description: 'Description of subtask 2', dueDate: '24/03/12' }
//       ]
//     },
//     {
//       id: 2,
//       name: 'Task 2',
//       description: 'Task description for task 2',
//       dueDate: '24/04/15',
//       priority: 'urgent',
//       assignedBy: 'PID: asdf-ty...',
//       createdAt: '24/07/24',
//       status: 'pending',
//       todos: [
//         { id: 21, name: 'Subtask A', description: 'Subtask A description', dueDate: '24/04/10' }
//       ]
//     }
//   ];

//   const statusOptions = ['pending', 'in progress', 'complete', 'not started'];

//   return (
//     <table className="min-w-full divide-y divide-gray-200 table-auto">
//     <thead className="bg-gray-50">
//       <tr>
//         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Task Name</th>
//         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
//         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
//         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
//         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned By</th>
//         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
//         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
//       </tr>
//     </thead>
//     <tbody className="bg-white divide-y divide-gray-200">
//       {tasks.map((task) => (
//         <React.Fragment key={task.id}>
//           <tr>
//             <td className="px-6 py-4 whitespace-nowrap">{task.name}</td>
//             <td className="px-6 py-4 whitespace-nowrap">{task.description}</td>
//             <td className="px-6 py-4 whitespace-nowrap">{task.dueDate}</td>
//             <td className="px-6 py-4 whitespace-nowrap">{task.priority}</td>
//             <td className="px-6 py-4 whitespace-nowrap">{task.assignedBy}</td>
//             <td className="px-6 py-4 whitespace-nowrap">{task.createdAt}</td>

//             {/* Status Dropdown */}
//             <td className="px-6 py-4 whitespace-nowrap">
//               <div className="relative">
//                 <button
//                   onClick={() => toggleStatusDropdown(task.id)}
//                   className="text-gray-700 hover:text-gray-900"
//                 >
//                   {task.status} <ChevronDown className="inline-block h-4 w-4" />
//                 </button>
//                 {statusDropdown === task.id && (
//                   <div className="absolute z-10 mt-1 w-36 bg-white shadow-md rounded-md">
//                     {statusOptions.map((status) => (
//                       <div
//                         key={status}
//                         onClick={() => {
//                           setSelectedStatus(status);
//                           setStatusDropdown(null);
//                         }}
//                         className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
//                       >
//                         {status}
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             </td>

//             {/* Task actions (3 dots) */}
//             <td className="px-6 py-4 whitespace-nowrap text-right">
//               <button
//                 onClick={() => toggleTaskActionModal(task.id)}
//                 className="text-gray-500 hover:text-gray-700"
//               >
//                 <ThreeDotsVertical className="h-5 w-5" />
//               </button>

//               {taskActionModal === task.id && (
//                 <div className="absolute z-10 mt-2 w-48 bg-white shadow-lg rounded-md">
//                   <ul>
//                     <li className="py-2 px-4 hover:bg-gray-100 cursor-pointer">Delete</li>
//                     <li className="py-2 px-4 hover:bg-gray-100 cursor-pointer">Request Removal</li>
//                     <li className="py-2 px-4 hover:bg-gray-100 cursor-pointer">Mark Complete</li>
//                   </ul>
//                 </div>
//               )}
//             </td>
//           </tr>

//           {/* Task To-dos */}
//           {expandedTask === task.id && task.todos.map((todo) => (
//             <tr key={todo.id} className="bg-gray-50">
//               <td className="px-6 py-4 pl-12">{todo.name}</td>
//               <td className="px-6 py-4">{todo.description}</td>
//               <td className="px-6 py-4">{todo.dueDate}</td>
//               <td colSpan="5"></td>
//             </tr>
//           ))}
//         </React.Fragment>
//       ))}
//     </tbody>
//   </table>
//   )
// }

// export default Table