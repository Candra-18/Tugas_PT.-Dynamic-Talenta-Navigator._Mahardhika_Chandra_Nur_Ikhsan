import React from "react";

export default function KanbanCard({ task }) {
  // Priority styling
  const getPriorityStyle = (priority) => {
    switch (priority) {
      case 'Critical': return 'bg-red-100 text-red-800 border-red-300';
      case 'High': return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'Low': return 'bg-green-100 text-green-800 border-green-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  // Type styling
  const getTypeStyle = (type) => {
    switch (type) {
      case 'Bug': return 'bg-red-50 text-red-700 border-red-200';
      case 'Feature Enhancements': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Other': return 'bg-gray-50 text-gray-700 border-gray-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="p-4 mb-2 transition-shadow bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md">
      {/* Task Title */}
      <h3 className="mb-3 font-semibold text-gray-800 text-md">{task.title}</h3>
      
      {/* Priority and Type Badges */}
      <div className="flex flex-wrap gap-2 mb-3">
        {task.priority && (
          <span className={`px-3 py-1 text-xs font-medium border rounded-full ${getPriorityStyle(task.priority)}`}>
            {task.priority}
          </span>
        )}
        
        {task.type && (
          <span className={`px-3 py-1 text-xs font-medium border rounded-full ${getTypeStyle(task.type)}`}>
            {task.type}
          </span>
        )}
      </div>
      
      {/* Details Section */}
      <div className="space-y-2 text-sm text-gray-600">
        {/* Developer */}
        {task.developer && (
          <div className="flex items-center">
            <span className="mr-2 font-medium">Developer:</span>
            <span>{Array.isArray(task.developer) ? task.developer.join(', ') : task.developer}</span>
          </div>
        )}
        
        {/* SP Estimates */}
        <div className="flex gap-4">
          {task['Estimated SP'] !== undefined && (
            <div className="flex items-center">
              <span className="mr-1 font-medium">Est. SP:</span>
              <span className="px-2 py-1 bg-gray-100 rounded">{task['Estimated SP']}</span>
            </div>
          )}
          
          {task['Actual SP'] !== undefined && (
            <div className="flex items-center">
              <span className="mr-1 font-medium">Actual SP:</span>
              <span className="px-2 py-1 bg-gray-100 rounded">{task['Actual SP']}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}