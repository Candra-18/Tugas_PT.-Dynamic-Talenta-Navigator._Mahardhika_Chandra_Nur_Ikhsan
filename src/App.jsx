import React, { useEffect, useState, useCallback } from "react";
import { Routes, Route, Navigate, Link, useLocation } from "react-router-dom";
import { fetchTasks } from "./api/taskService";
import TablePage from "./pages/TablePage";
import KanbanPage from "./pages/KanbanPage";

// Komponen Navigation untuk underline active link
function Navigation() {
  const location = useLocation();
  
  return (
    <nav className="bg-gray-800 border-b ">
      <div className="flex items-center justify-between px-8 py-4">
        <div className="flex items-center gap-8">
          <div className="flex items-center h-10">
            <Link
              to="/table"
              className={`relative px-4 py-2 text-sm font-medium transition-colors ${
                location.pathname === '/table' 
                  ? 'text-white' 
                  : 'text-gray-500 hover:text-gray-500'
              }`}
            >
              Tabel
              {location.pathname === '/table' && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-500 rounded-t"></div>
              )}
            </Link>
            <Link
              to="/kanban"
              className={`relative px-4 py-2 text-sm font-medium transition-colors ${
                location.pathname === '/kanban' 
                  ? 'text-white' 
                  : 'text-gray-500 hover:text-gray-500'
              }`}
            >
              Kanban
              {location.pathname === '/kanban' && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-500 rounded-t"></div>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  // Ambil data pertama kali
  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetchTasks();
      setTasks(res?.data || []);
    } catch (err) {
      console.error("fetch tasks error", err);
      setTasks([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  // Tambah task — langsung tampil tanpa reload
  const addTask = (task) => {
    const newTask = { id: `local-${Date.now()}`, ...task };
    setTasks((prev) => [newTask, ...prev]);
  };

  // Update task — langsung update di UI
  const updateTask = (id, patch) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...patch } : t))
    );
  };

  //  Hapus task — langsung hilang dari UI
  const removeTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-800">
      {/* Navigation */}
      <Navigation />
      
      {/* Main Content */}
      <div className="p-6">
        <Routes>
          <Route path="/" element={<Navigate to="/table" replace />} />
          <Route
            path="/table"
            element={
              <TablePage
                tasks={tasks}
                loading={loading}
                addTask={addTask}
                updateTask={updateTask}
                removeTask={removeTask}
              />
            }
          />
          <Route
            path="/kanban"
            element={
              <KanbanPage
                tasks={tasks}
                loading={loading}
                addTask={addTask}
                updateTask={updateTask}
              />
            }
          />
        </Routes>
      </div>
    </div>
  );
}