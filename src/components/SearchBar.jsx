// src/components/SearchBar.jsx
import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";

export default function SearchBar({ value, onChange }) {
  const [inputValue, setInputValue] = useState(value);

  // Debounce effect untuk performance
  useEffect(() => {
    const timer = setTimeout(() => {
      onChange(inputValue);
    }, 300);

    return () => clearTimeout(timer);
  }, [inputValue, onChange]);

  // Sync dengan value dari parent jika berubah
  useEffect(() => {
    setInputValue(value);
  }, [value]);

  return (
    <div className="flex items-center w-64 px-3 py-2 transition-colors bg-white border border-gray-300 rounded-lg shadow-sm focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 hover:border-gray-400">
      <Search className="w-4 h-4 mr-2 text-gray-500" />
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Search task..."
        className="flex-1 text-sm text-gray-700 placeholder-gray-400 outline-none"
      />
      
      {/* Clear button ketika ada teks */}
      {inputValue && (
        <button
          onClick={() => setInputValue("")}
          className="ml-2 text-gray-400 transition-colors hover:text-gray-600"
        >
          ✕
        </button>
      )}
    </div>
  );
}