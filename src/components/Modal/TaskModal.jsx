// src/components/Modal/TaskModal.jsx
import React, { useState } from "react";

const STATUS_OPTIONS = [
  "Ready to start",
  "In Progress",
  "Waiting for review",
  "Pending Deploy",
  "Done",
  "Stuck",
];

const PRIORITY_OPTIONS = [
  "Critical",
  "High",
  "Medium",
  "Low",
  "Best Effort",
];

const TYPE_OPTIONS = [
  "Feature Enhancements",
  "Other",
  "Bug",
];

export default function TaskModal({ open, onClose, onAdd }) {
  const [form, setForm] = useState({
    title: "",
    developer: "",
    status: STATUS_OPTIONS[0],
    priority: PRIORITY_OPTIONS[0],
    type: TYPE_OPTIONS[0],
    date: new Date().toISOString().split("T")[0],
    EstimatedSP: "",
    ActualSP: "",
  });

  if (!open) return null;

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = {
      title: form.title,
      developer: form.developer.split(",").map((d) => d.trim()),
      status: form.status,
      priority: form.priority,
      type: form.type,
      date: form.date,
      "Estimated SP": Number(form.EstimatedSP),
      "Actual SP": Number(form.ActualSP),
    };
    onAdd(newTask);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-lg w-[480px] p-6">
        <h2 className="mb-4 text-lg font-semibold">New Task</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            placeholder="Task title"
            value={form.title}
            onChange={(e) => handleChange("title", e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
          <input
            type="text"
            placeholder="Developer(s), comma separated"
            value={form.developer}
            onChange={(e) => handleChange("developer", e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
          <div className="flex gap-2">
            <select
              value={form.status}
              onChange={(e) => handleChange("status", e.target.value)}
              className="w-1/3 px-2 py-2 border rounded"
            >
              {STATUS_OPTIONS.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
            <select
              value={form.priority}
              onChange={(e) => handleChange("priority", e.target.value)}
              className="w-1/3 px-2 py-2 border rounded"
            >
              {PRIORITY_OPTIONS.map((p) => (
                <option key={p}>{p}</option>
              ))}
            </select>
            <select
              value={form.type}
              onChange={(e) => handleChange("type", e.target.value)}
              className="w-1/3 px-2 py-2 border rounded"
            >
              {TYPE_OPTIONS.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </div>
          <div className="flex gap-2">
            <input
              type="date"
              value={form.date}
              onChange={(e) => handleChange("date", e.target.value)}
              className="w-1/2 px-3 py-2 border rounded"
            />
            <input
              type="number"
              placeholder="Estimated SP"
              value={form.EstimatedSP}
              onChange={(e) => handleChange("EstimatedSP", e.target.value)}
              className="w-1/4 px-3 py-2 border rounded"
            />
            <input
              type="number"
              placeholder="Actual SP"
              value={form.ActualSP}
              onChange={(e) => handleChange("ActualSP", e.target.value)}
              className="w-1/4 px-3 py-2 border rounded"
            />
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
            >
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
