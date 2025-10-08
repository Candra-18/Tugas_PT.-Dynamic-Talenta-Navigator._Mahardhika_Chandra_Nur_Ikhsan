import React, { useState, useMemo, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import PersonFilter from "../components/PersonFilter";
import SortMenu from "../components/SortMenu";
import TaskModal from "../components/Modal/TaskModal";
import KanbanView from "../components/Kanban/KanbanView";

export default function KanbanPage({ tasks, loading, addTask, updateTask }) {
  const [query, setQuery] = useState("");
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [sorts, setSorts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [tasksWithStatus, setTasksWithStatus] = useState([]);

  // Generate unique ID untuk task (sama seperti di TablePage)
  const generateTaskId = (task) => {
    const developerStr = Array.isArray(task.developer) 
      ? task.developer.join('') 
      : task.developer || '';
    
    return `${task.title}-${developerStr}-${task.date}`.replace(/\s+/g, '-');
  };

  // Load task status dari localStorage dan gabungkan dengan tasks
  useEffect(() => {
    if (tasks && tasks.length > 0) {
      const storedStatus = JSON.parse(localStorage.getItem('taskStatus') || '{}');
      
      const tasksWithCustomStatus = tasks.map(task => {
        const taskId = generateTaskId(task);
        const customStatus = storedStatus[taskId];
        
        return {
          ...task,
          _id: taskId, // Tambahkan _id sebagai identifier
          // Gunakan status dari localStorage jika ada, else dari API
          status: customStatus || task.status || 'Ready to start'
        };
      });
      
      setTasksWithStatus(tasksWithCustomStatus);
    }
  }, [tasks]);

  // Handle update task dengan localStorage untuk Kanban
  const handleUpdateTask = (updatedTask) => {    
    // Update local state
    setTasksWithStatus(prev => 
      prev.map(task => 
        task._id === updatedTask._id ? updatedTask : task
      )
    );
    
    // Simpan status ke localStorage
    const storedStatus = JSON.parse(localStorage.getItem('taskStatus') || '{}');
    storedStatus[updatedTask._id] = updatedTask.status;
    localStorage.setItem('taskStatus', JSON.stringify(storedStatus));
    // Kirim update ke API (tanpa _id property)
    const { _id, ...taskForAPI } = updatedTask;
    updateTask(taskForAPI);
  };

  // Ambil semua nama unik dari tasks
  const persons = useMemo(() => {
    const allPersons = Array.from(new Set(tasksWithStatus.flatMap(t => t.developer || [])));
    return allPersons;
  }, [tasksWithStatus]);

  // Filter tasks + Sorting
  const filtered = useMemo(() => {
    let arr = tasksWithStatus.slice();

    // 🔍 Filter by search
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      arr = arr.filter(t => t.title.toLowerCase().includes(q));
    }

    // 👤 Filter by selected person
    if (selectedPerson) {
      arr = arr.filter(t => t.developer?.includes(selectedPerson));
    }

    // ↕️ Sorting - TAMBAHKAN INI
    if (sorts.length > 0) {
      arr.sort((a, b) => {
        for (const s of sorts) {
          let va = a[s.key];
          let vb = b[s.key];

          // Handle berbagai tipe data
          if (typeof va === 'string') va = va.toLowerCase();
          if (typeof vb === 'string') vb = vb.toLowerCase();

          // Handle array (developer)
          if (Array.isArray(va)) va = va.join(', ').toLowerCase();
          if (Array.isArray(vb)) vb = vb.join(', ').toLowerCase();

          // Handle undefined/null
          if (va === undefined || va === null) va = "";
          if (vb === undefined || vb === null) vb = "";

          if (va === vb) continue;
          
          return s.dir === "asc" 
            ? (va > vb ? 1 : -1) 
            : (va > vb ? -1 : 1);
        }
        return 0;
      });
    }

    return arr;
  }, [tasksWithStatus, query, selectedPerson, sorts]); // TAMBAHKAN sorts di dependency

  // Status options untuk Kanban
  const statusOptions = ['Ready to start', 'In Progress', 'Waiting for review', 'Pending Deploy', 'Done', 'Stuck'];

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
        <KanbanView
          data={filtered}
          loading={loading}
          updateTask={handleUpdateTask}
          statusOptions={statusOptions}
        />
      </div>


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