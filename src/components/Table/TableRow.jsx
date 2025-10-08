import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faUser,
  faPlus,
  faCommentMedical,
} from "@fortawesome/free-solid-svg-icons";

export default function TableRow({ task, onUpdate }) {
  const [editingField, setEditingField] = useState(null);

  const handleChange = (key, newValue) => {
    const updated = { ...task, [key]: newValue };
    onUpdate(updated);
    setEditingField(null);
  };

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

  // Render dropdown field
  const renderDropdownField = (field, value, options, colorClass) => {
    if (editingField === field) {
      return (
        <select
          value={value || ""}
          onChange={(e) => handleChange(field, e.target.value)}
          onBlur={() => setEditingField(null)}
          autoFocus
          className={`w-full px-2 py-1 text-xs rounded border-0 focus:ring-2 focus:ring-blue-500 ${colorClass}`}
          style={{ 
            appearance: 'none',
            WebkitAppearance: 'none',
            MozAppearance: 'none'
          }}
        >
          <option value="">Select...</option>
          {options.map(option => (
            <option key={option} value={option} className="text-gray-800 bg-white">
              {option}
            </option>
          ))}
        </select>
      );
    }

    return (
      <div 
        className={`w-full px-2 py-1 text-xs rounded cursor-pointer ${colorClass} flex items-center justify-between`}
        onClick={() => setEditingField(field)}
      >
        <span>{value || "Select..."}</span>
        <FontAwesomeIcon icon={faChevronDown} className="ml-1 text-xs" />
      </div>
    );
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
      
      {/* Status dengan dropdown */}
      <td className="px-4 py-3">
        <div className="min-h-[32px] flex items-center">
          {renderDropdownField(
            "status", 
            task.status, 
            ["Ready to start", "In Progress", "Waiting for review", "Pending Deploy", "Done", "Stuck"],
            getStatusColor(task.status)
          )}
        </div>
      </td>
      
      {/* Priority dengan dropdown */}
      <td className="px-4 py-3">
        <div className="min-h-[32px] flex items-center">
          {renderDropdownField(
            "priority", 
            task.priority, 
            ["Critical", "High", "Medium", "Low", "Best Effort"],
            getPriorityColor(task.priority)
          )}
        </div>
      </td>
      
      {/* Type dengan dropdown */}
      <td className="px-4 py-3">
        <div className="min-h-[32px] flex items-center">
          {renderDropdownField(
            "type", 
            task.type, 
            ["Feature Enhancements", "Bug", "Other"],
            getTypeColor(task.type)
          )}
        </div>
      </td>
      
      {/* Date */}
      <td className="px-4 py-3 text-center ">
        <span className="text-gray-300">{task.date || "-"}</span>
      </td>
      
      {/* Estimated SP */}
      <td className="px-4 py-3 text-center">
        <span className="text-gray-300 ">{task["Estimated SP"] || "-"}</span>
      </td>
      
      {/* Actual SP */}
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