import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faSort,
  faSortUp,
  faSortDown,
  faUserTie,
  faListCheck,
  faFlag,
  faClipboardList,
  faClock,
  faChartLine,
  faHashtag,
} from "@fortawesome/free-solid-svg-icons";

export default function SortMenu({ sorts, setSorts }) {
  const [open, setOpen] = useState(false);
  const [selectedField, setSelectedField] = useState(sorts[0]?.key || "title");
  const [selectedDir, setSelectedDir] = useState(sorts[0]?.dir || "asc");

  const sortOptions = [
    { key: "title", label: "Title", icon: faClipboardList },
    { key: "developer", label: "Developer", icon: faUserTie },
    { key: "status", label: "Status", icon: faListCheck },
    { key: "priority", label: "Priority", icon: faFlag },
    { key: "type", label: "Type", icon: faChartLine },
    { key: "Estimated SP", label: "Estimated SP", icon: faClock },
    { key: "Actual SP", label: "Actual SP", icon: faHashtag },
    { key: "date", label: "Date", icon: faClock }, // Tambahkan date jika ada
  ];

  const toggle = () => setOpen(!open);

  const applySort = (field, dir) => {
    setSelectedField(field);
    setSelectedDir(dir);
    setSorts([{ key: field, dir }]);
    setOpen(false);
  };

  const sortIcon =
    selectedDir === "asc"
      ? faSortUp
      : selectedDir === "desc"
      ? faSortDown
      : faSort;

  const currentLabel =
    sortOptions.find((o) => o.key === selectedField)?.label || selectedField;

  return (
    <div className="relative">
      {/* Tombol utama */}
      <button
        onClick={toggle}
        className="flex items-center gap-2 px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        <FontAwesomeIcon icon={faSort} className="text-gray-500" />
        <span className="font-medium">{currentLabel}</span>
        <FontAwesomeIcon icon={sortIcon} className="text-blue-600" />
        <FontAwesomeIcon 
          icon={faChevronDown} 
          className={`w-3 h-3 text-gray-500 transition-transform ${open ? 'rotate-180' : ''}`} 
        />
      </button>

      {/* Dropdown Sort */}
      {open && (
        <div className="absolute right-0 z-50 w-56 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg">
          <div className="p-3 text-sm font-semibold text-gray-700 border-b border-gray-200">
            Sort by field
          </div>

          {/* Field options */}
          <div className="overflow-y-auto max-h-60">
            {sortOptions.map((opt) => (
              <button
                key={opt.key}
                onClick={() => applySort(opt.key, selectedDir)}
                className={`w-full px-3 py-2 text-sm text-left hover:bg-gray-50 flex items-center gap-3 transition-colors ${
                  selectedField === opt.key
                    ? "text-blue-600 font-medium bg-blue-50"
                    : "text-gray-700"
                }`}
              >
                <FontAwesomeIcon
                  icon={opt.icon}
                  className={`w-4 h-4 ${
                    selectedField === opt.key ? "text-blue-600" : "text-gray-500"
                  }`}
                />
                <span>{opt.label}</span>
              </button>
            ))}
          </div>

          {/* Sort direction buttons */}
          <div className="flex p-3 border-t border-gray-200 rounded-b-lg bg-gray-50">
            <button
              onClick={() => applySort(selectedField, "asc")}
              className={`flex-1 px-3 py-2 rounded text-sm flex items-center justify-center gap-2 transition-colors ${
                selectedDir === "asc"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
              }`}
            >
              <FontAwesomeIcon icon={faSortUp} />
              Ascending
            </button>
            <div className="w-2"></div>
            <button
              onClick={() => applySort(selectedField, "desc")}
              className={`flex-1 px-3 py-2 rounded text-sm flex items-center justify-center gap-2 transition-colors ${
                selectedDir === "desc"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
              }`}
            >
              <FontAwesomeIcon icon={faSortDown} />
              Descending
            </button>
          </div>
        </div>
      )}
    </div>
  );
}