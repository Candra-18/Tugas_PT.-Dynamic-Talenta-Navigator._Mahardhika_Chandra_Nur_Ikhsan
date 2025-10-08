import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faPlus,
  faCommentMedical,
  faEdit,
  faSave,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

export default function TableRow({ task, onUpdate }) {
  const [isEditingDate, setIsEditingDate] = useState(false);
  const [editedDate, setEditedDate] = useState(task.date || "");

  const handleCheckboxChange = (e) => {
    const updated = { 
      ...task, 
      completed: e.target.checked
    };
    onUpdate(updated);
  };

  // Format developer names dengan icon
  const formatDevelopers = (developers) => {
    if (!developers || developers.length === 0) return (
      <div className="flex items-center gap-2">
        <FontAwesomeIcon icon={faUser} className="text-xs text-gray-400" />
        <span className="text-xs text-gray-400">-</span>
      </div>
    );
    
    if (Array.isArray(developers)) {
      return developers.slice(0, 2).map((dev, index) => (
        <div key={index} className="flex items-center gap-2 mb-1 last:mb-0">
          <FontAwesomeIcon icon={faUser} className="text-xs text-gray-300" />
          <span className="text-xs text-gray-300">{dev}</span>
        </div>
      ));
    }
    
    return (
      <div className="flex items-center gap-2">
        <FontAwesomeIcon icon={faUser} className="text-xs text-gray-300" />
        <span className="text-xs text-gray-300">{developers}</span>
      </div>
    );
  };

  // Format tanggal menjadi DD-MM-YYYY
  const formatDate = (dateString) => {
    if (!dateString) return "-";
    
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "-";
      
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();
      
      return `${day}-${month}-${year}`;
    } catch {
      return "-";
    }
  };

  // Warna untuk status, priority, dan type
  const getStatusColor = (status) => {
    const colors = {
      "Ready to start": "bg-gray-500 text-white",
      "In Progress": "bg-blue-600 text-white",
      "Waiting for review": "bg-yellow-500 text-white",
      "Pending Deploy": "bg-orange-500 text-white",
      "Done": "bg-green-600 text-white",
      "Stuck": "bg-red-600 text-white",
    };
    return colors[status] || "bg-gray-500 text-white";
  };

  const getPriorityColor = (priority) => {
    const colors = {
      "Critical": "bg-red-700 text-white",
      "High": "bg-orange-600 text-white",
      "Medium": "bg-yellow-500 text-white",
      "Low": "bg-green-600 text-white",
      "Best Effort": "bg-blue-500 text-white",
    };
    return colors[priority] || "bg-gray-500 text-white";
  };

  const getTypeColor = (type) => {
    const colors = {
      "Feature Enhancements": "bg-purple-600 text-white",
      "Bug": "bg-pink-600 text-white",
      "Other": "bg-gray-500 text-white",
    };
    return colors[type] || "bg-gray-500 text-white";
  };

  // Handle Date Edit - SIMPAN DI LOCALSTORAGE DAN UPDATE UI
  const handleEditDate = () => {
    setIsEditingDate(true);
    setEditedDate(task.date || "");
  };

  const handleSaveDate = () => {
    // 1. Simpan ke localStorage
    const taskDates = JSON.parse(localStorage.getItem('taskDates') || '{}');
    taskDates[task._id || task.title] = editedDate;
    localStorage.setItem('taskDates', JSON.stringify(taskDates));
    
    console.log('💾 Date saved to localStorage:', { 
      taskId: task._id || task.title, 
      date: editedDate 
    });
    
    // 2. Update UI dengan memanggil onUpdate (tanpa kirim ke API)
    const updatedTask = { 
      ...task, 
      date: editedDate 
    };
    onUpdate(updatedTask);
    
    // 3. Tutup mode edit
    setIsEditingDate(false);
  };

  const handleCancelDate = () => {
    setEditedDate(task.date || "");
    setIsEditingDate(false);
  };

  const handleDateChange = (e) => {
    setEditedDate(e.target.value);
  };

  return (
    <tr className="hover:bg-gray-700">
      {/* Checkbox */}
      <td className="px-4 py-3">
        <div className="flex items-center justify-center">
          <input
            type="checkbox"
            checked={task.completed || false}
            onChange={handleCheckboxChange}
            className="w-4 h-4 text-blue-600 bg-gray-800 border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
          />
        </div>
      </td>
      
      {/* Title */}
      <td className="px-4 py-3">
        <span className="text-gray-200">{task.title || "-"}</span>
      </td>
      
      {/* Icon CommentMedical */}
      <td className="px-4 py-3">
        <FontAwesomeIcon 
          icon={faCommentMedical} 
          className="text-sm text-gray-400 transition-colors cursor-pointer hover:text-blue-400" 
        />
      </td>
      
      {/* Developer */}
      <td className="px-4 py-3">
        {formatDevelopers(task.developer)}
      </td>
      
      {/* Status - READ ONLY */}
      <td className="px-4 py-3">
        <div className="min-h-[32px] flex items-center">
          <div className={`w-full px-2 py-1 text-xs rounded ${getStatusColor(task.status)}`}>
            <span>{task.status || "Select..."}</span>
          </div>
        </div>
      </td>
      
      {/* Priority - READ ONLY */}
      <td className="px-4 py-3">
        <div className="min-h-[32px] flex items-center">
          <div className={`w-full px-2 py-1 text-xs rounded ${getPriorityColor(task.priority)}`}>
            <span>{task.priority || "Select..."}</span>
          </div>
        </div>
      </td>
      
      {/* Type - READ ONLY */}
      <td className="px-4 py-3">
        <div className="min-h-[32px] flex items-center">
          <div className={`w-full px-2 py-1 text-xs rounded ${getTypeColor(task.type)}`}>
            <span>{task.type || "Select..."}</span>
          </div>
        </div>
      </td>
      
      {/* Date - EDITABLE (LocalStorage only) */}
      <td className="px-4 py-3 text-center">
        {isEditingDate ? (
          <div className="flex items-center gap-1">
            <input
              type="date"
              value={editedDate}
              onChange={handleDateChange}
              className="px-2 py-1 text-xs text-white bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <button
              onClick={handleSaveDate}
              className="p-1 text-green-400 transition-colors rounded hover:bg-gray-600"
              title="Save to LocalStorage"
            >
              <FontAwesomeIcon icon={faSave} className="w-3 h-3" />
            </button>
            <button
              onClick={handleCancelDate}
              className="p-1 text-red-400 transition-colors rounded hover:bg-gray-600"
              title="Cancel"
            >
              <FontAwesomeIcon icon={faTimes} className="w-3 h-3" />
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-1">
            <span className="text-gray-300">
              {formatDate(task.date)}
            </span>
            <button
              onClick={handleEditDate}
              className="p-1 text-gray-400 transition-colors rounded hover:text-blue-400 hover:bg-gray-600"
              title="Edit Date (LocalStorage only)"
            >
              <FontAwesomeIcon icon={faEdit} className="w-3 h-3" />
            </button>
          </div>
        )}
      </td>
      
      {/* Estimated SP - READ ONLY */}
      <td className="px-4 py-3 text-center">
        <span className="text-gray-300">{task["Estimated SP"] || "-"}</span>
      </td>
      
      {/* Actual SP - READ ONLY */}
      <td className="px-4 py-3 text-center">
        <span className="text-gray-300">{task["Actual SP"] || "-"}</span>
      </td>
      
      {/* Kolom kosong dengan icon plus */}
      <td className="px-4 py-3">
        <button className="flex items-center justify-center w-6 h-6 text-gray-400 transition-colors rounded hover:text-blue-400 hover:bg-gray-600">
          <FontAwesomeIcon icon={faPlus} className="text-xs" />
        </button>
      </td>
    </tr>
  );
}