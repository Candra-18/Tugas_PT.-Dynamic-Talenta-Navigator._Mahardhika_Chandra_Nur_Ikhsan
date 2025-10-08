// src/components/PersonFilter.jsx
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserTie } from "@fortawesome/free-solid-svg-icons";

export default function PersonFilter({ persons, selected, onToggle }) {
  const handleChange = (e) => {
    const value = e.target.value;
    onToggle(value === "" ? null : value);
  };

  // Pastikan selected value adalah string
  const selectedValue = Array.isArray(selected) 
    ? (selected.length > 0 ? selected[0] : "") 
    : (selected || "");

  return (
    <div className="flex items-center gap-2">
      
      <div className="relative">
        <FontAwesomeIcon
          icon={faUserTie}
          className="absolute text-gray-500 -translate-y-1/2 left-3 top-1/2"
        />

        <select
          id="person-filter"
          onChange={handleChange}
          value={selectedValue}
          className="py-2 pl-10 pr-8 text-sm text-gray-700 bg-white border border-gray-300 rounded-md appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Persons</option>
          {persons.map((person) => (
            <option key={person} value={person}>
              {person}
            </option>
          ))}
        </select>

        <div className="absolute text-gray-400 -translate-y-1/2 pointer-events-none right-2 top-1/2">
          ▼
        </div>
      </div>
    </div>
  );
}