import React, { useState} from 'react'

function Table() {
    const [expandedTask, setExpandedTask] = useState(null);

    const toggleTask = (taskId) => setExpandedTask(expandedTask === taskId ? null : taskId);
      
  const tasks = [
    {
      id: 1,
      name: 'Design UI',
      todos: [
        { id: 11, name: 'Create wireframes', description: 'Create wireframe templates', assignee: 'tg..', dueDate: '2024-03-10' },
        { id: 12, name: 'Design mockups', description: 'Design the app mockups', assignee: 'thy..', dueDate: '2024-03-12' },
      ],
      description: 'Design the user interface for the new feature',
      assignee: 'tg-ht...',
      dueDate: '2024-03-15',
      priority: 'urgent',
      assignedBy: 'PID: rtdg-ht...',
      createdAt: '2024-02-01',
    },
    {
      id: 2,
      name: 'Implement Backend',
      todos: [
        { id: 21, name: 'Set up database', description: 'Set up PostgreSQL', assignee: 'fhyg-i', dueDate: '2024-03-25' },
      ],
      description: 'Develop the backend infrastructure for the project',
      assignee: 'PID: jg6qm-zyaaa...',
      dueDate: '2024-03-30',
      priority: 'normal',
      assignedBy: 'PID: rtdg-ht...',
      createdAt: '2024-02-05',
    },
  ];

  return (
    <table className="min-w-full divide-y divide-gray-200 table-auto">
            <thead className="bg-gray-50">
                <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tasks</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assignee</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned By</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
                {tasks.map((task) => (
                <React.Fragment key={task.id}>
                    <tr className="cursor-pointer" onClick={() => toggleTask(task.id)}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {expandedTask === task.id ? '▴' : '►'} {task.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{task.description}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{task.assignee}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{task.dueDate}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            task.priority === 'urgent'
                            ? 'bg-red-100 text-red-800'
                            : task.priority === 'normal'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                        >
                        {task.priority}
                        </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{task.assignedBy}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{task.createdAt}</td>
                    </tr>

                    {/* Display todos if the task is expanded */}
                    {expandedTask === task.id && task.todos.map((todo) => (
                    <tr key={todo.id} className="bg-gray-50">
                        <td className="px-6 py-4 pl-10 text-sm font-medium text-gray-900">▫ {todo.name}</td>
                        <td className="px-6 py-4 text-sm text-gray-500">{todo.description}</td>
                        <td className="px-6 py-4 text-sm text-gray-500">PID: {todo.assignee}</td>
                        <td className="px-6 py-4 text-sm text-gray-500">{todo.dueDate}</td>
                        <td colSpan={3}></td>
                    </tr>
                    ))}
                </React.Fragment>
                ))}
            </tbody>
        </table>
  )
}

export default Table