import React from "react";

export default function KanbanColumn({ status, children, isOver }) {
  const taskCount = React.Children.count(children);

  // Map status untuk styling yang berbeda
  const getStatusColor = (status) => {
    switch (status) {
      case 'Ready to start': return 'border-blue-500 bg-blue-50';
      case 'In Progress': return 'border-yellow-500 bg-yellow-50';
      case 'Waiting for review': return 'border-purple-500 bg-purple-50';
      case 'Pending Deploy': return 'border-orange-500 bg-orange-50';
      case 'Done': return 'border-green-500 bg-green-50';
      case 'Stuck': return 'border-red-500 bg-red-50';
      default: return 'border-gray-300 bg-gray-50';
    }
  };

  const getHeaderColor = (status) => {
    switch (status) {
      case 'Ready to start': return 'bg-blue-500 text-white';
      case 'In Progress': return 'bg-yellow-500 text-white';
      case 'Waiting for review': return 'bg-purple-500 text-white';
      case 'Pending Deploy': return 'bg-orange-500 text-white';
      case 'Done': return 'bg-green-500 text-white';
      case 'Stuck': return 'bg-red-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  return (
    <div className={`w-80 flex-shrink-0 rounded-lg border-2 ${getStatusColor(status)} ${isOver ? 'border-dashed border-blue-400 bg-blue-100' : ''}`}>
      {/* Header dengan count */}
      <div className={`p-3 rounded-t-lg ${getHeaderColor(status)}`}>
        <h2 className="text-lg font-semibold">
          {status} ({taskCount})
        </h2>
      </div>
      
      {/* Task Container dengan scroll vertical */}
      <div className="p-3 space-y-3 max-h-[calc(100vh-200px)] overflow-y-auto">
        {taskCount > 0 ? (
          children
        ) : (
          <div className={`flex items-center justify-center h-32 border-2 border-dashed rounded-lg ${
            isOver ? 'border-blue-400 bg-blue-100 text-blue-600' : 'border-gray-300 text-gray-400'
          }`}>
            {isOver ? "Drop here!" : "No tasks"}
          </div>
        )}
      </div>
    </div>
  );
}