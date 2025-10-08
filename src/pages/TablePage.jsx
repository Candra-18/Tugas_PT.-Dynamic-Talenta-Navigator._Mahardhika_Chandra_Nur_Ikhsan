import React, { useState, useMemo, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import PersonFilter from "../components/PersonFilter";
import SortMenu from "../components/SortMenu";
import TaskModal from "../components/Modal/TaskModal";
import TableView from "../components/Table/TableView";

export default function TablePage({ tasks, loading, addTask, updateTask, removeTask }) {
  const [query, setQuery] = useState("");
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [sorts, setSorts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [tasksWithCompleted, setTasksWithCompleted] = useState([]);

  // Generate unique ID berdasarkan kombinasi field yang unik
  const generateTaskId = (task) => {
    // Gunakan kombinasi title + developer + date sebagai identifier
    const developerStr = Array.isArray(task.developer) 
      ? task.developer.join('') 
      : task.developer || '';
    
    return `${task.title}-${developerStr}-${task.date}`.replace(/\s+/g, '-');
  };

  // Load completed status dari localStorage dan gabungkan dengan tasks
  useEffect(() => {
    if (tasks && tasks.length > 0) {
      const storedCompleted = JSON.parse(localStorage.getItem('taskCompleted') || '{}');
      
      const tasksWithCompleted = tasks.map(task => {
        const taskId = generateTaskId(task);
        return {
          ...task,
          _id: taskId, // Tambahkan _id sebagai identifier
          completed: storedCompleted[taskId] || false
        };
      });
      
      setTasksWithCompleted(tasksWithCompleted);
    }
  }, [tasks]);

  // Handle update task dengan localStorage
  const handleUpdateTask = (updatedTask) => {   
    // Update local state
    setTasksWithCompleted(prev => 
      prev.map(task => 
        task._id === updatedTask._id ? updatedTask : task
      )
    );
    
    // Simpan completed status ke localStorage
    const storedCompleted = JSON.parse(localStorage.getItem('taskCompleted') || '{}');
    storedCompleted[updatedTask._id] = updatedTask.completed;
    localStorage.setItem('taskCompleted', JSON.stringify(storedCompleted));
    
    // Kirim update ke API (tanpa completed property dan _id)
    const {_id, ...taskForAPI } = updatedTask;
    updateTask(taskForAPI);
  };

  // Reset ke halaman 1 ketika filter berubah
  useEffect(() => {
    setCurrentPage(1);
  }, [query, selectedPerson, sorts]);

  // Ambil semua nama unik dari tasks
   const persons = useMemo(() => {
    const allPersons = Array.from(new Set(tasksWithCompleted.flatMap(t => t.developer || [])));
    return allPersons;
  }, [tasksWithCompleted]);

  // Filter + sort
  const filtered = useMemo(() => {
    let arr = tasksWithCompleted.slice();

    //  Filter by search
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      arr = arr.filter(t => t.title.toLowerCase().includes(q));
    }

    //  Filter by selected person
    if (selectedPerson) {
      arr = arr.filter(t => t.developer?.includes(selectedPerson));
    }

    // ↕ Sorting
    if (sorts.length > 0) {
      arr.sort((a, b) => {
        for (const s of sorts) {
          const va = (a[s.key] ?? "").toString().toLowerCase();
          const vb = (b[s.key] ?? "").toString().toLowerCase();
          if (va === vb) continue;
          return s.dir === "asc" ? (va > vb ? 1 : -1) : (va > vb ? -1 : 1);
        }
        return 0;
      });
    }

    return arr;
  }, [tasksWithCompleted, query, selectedPerson, sorts]);

  // Pagination logic
  const totalItems = filtered.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filtered.slice(startIndex, endIndex);

  // Handle page change
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    // Adjust start page if we're near the end
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    return pages;
  };

  return (
    <div className="min-h-screen p-6 bg-gray-800">
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 font-medium text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          + New Task
        </button>

        <SearchBar value={query} onChange={setQuery} />

        <PersonFilter
          persons={persons}
          selected={selectedPerson}
          onToggle={setSelectedPerson}
        />

        <SortMenu sorts={sorts} setSorts={setSorts} />
      </div>

      <div className="mt-6">
        <TableView
          data={currentItems}
          loading={loading}
          onUpdateTask={handleUpdateTask}
          onRemoveTask={removeTask}
        />
      </div>

      {/* Pagination Component - TAMPIL SELALU jika ada data */}
      {filtered.length > 0 && (
        <div className="flex items-center justify-center mt-6 space-x-2">
          {/* Previous Button */}
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg ${
              currentPage === 1 
                ? "bg-gray-700 text-gray-500 cursor-not-allowed" 
                : "bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-600"
            }`}
          >
            &lt; Previous
          </button>

          {/* Page Numbers */}
          {getPageNumbers().map(page => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-4 py-2 rounded-lg ${
                currentPage === page
                  ? "bg-blue-600 text-white"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-600"
              }`}
            >
              {page}
            </button>
          ))}

          {/* Next Button */}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-lg ${
              currentPage === totalPages
                ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-600"
            }`}
          >
            Next &gt;
          </button>
        </div>
      )}

      {/* Menampilkan pesan ketika tidak ada data setelah filter */}
      {filtered.length === 0 && tasksWithCompleted.length > 0 && (
        <div className="py-8 text-center text-gray-400">
          Tidak ada task yang sesuai dengan filter yang dipilih.
        </div>
      )}

      <TaskModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onAdd={(t) => {
          addTask(t);
          setShowModal(false);
        }}
      />
    </div>
  );
}