import React, { useMemo } from "react";
import TableRow from "./TableRow";

const COLORS = {
  Status: {
    "Ready to start": "bg-gray-500",
    "In Progress": "bg-blue-600", 
    "Waiting for review": "bg-yellow-500",
    "Pending Deploy": "bg-orange-500",
    "Done": "bg-green-600",
    "Stuck": "bg-red-600",
  },
  Priority: {
    "Critical": "bg-red-700",
    "High": "bg-orange-600",
    "Medium": "bg-yellow-500",
    "Low": "bg-green-600",
    "Best Effort": "bg-blue-500",
  },
  Type: {
    "Feature Enhancements": "bg-purple-600",
    "Bug": "bg-pink-600",
    "Other": "bg-gray-500",
  },
};

export default function TableView({ data, loading, onUpdateTask }) {
  // Hitung total Estimated SP & Actual SP
  const totalEstimated = useMemo(
    () => data.reduce((sum, t) => sum + (Number(t["Estimated SP"]) || 0), 0),
    [data]
  );
  const totalActual = useMemo(
    () => data.reduce((sum, t) => sum + (Number(t["Actual SP"]) || 0), 0),
    [data]
  );

  // Hitung persentase untuk Status, Priority, Type
  const statusStats = useMemo(() => {
    const stats = Object.keys(COLORS.Status).map(status => {
      const count = data.filter(t => t.status === status).length;
      const percent = ((count / data.length) * 100).toFixed(1);
      return { status, count, percent, color: COLORS.Status[status] };
    });
    return stats.filter(stat => stat.count > 0);
  }, [data]);

  const priorityStats = useMemo(() => {
    const stats = Object.keys(COLORS.Priority).map(priority => {
      const count = data.filter(t => t.priority === priority).length;
      const percent = ((count / data.length) * 100).toFixed(1);
      return { priority, count, percent, color: COLORS.Priority[priority] };
    });
    return stats.filter(stat => stat.count > 0);
  }, [data]);

  const typeStats = useMemo(() => {
    const stats = Object.keys(COLORS.Type).map(type => {
      const count = data.filter(t => t.type === type).length;
      const percent = ((count / data.length) * 100).toFixed(1);
      return { type, count, percent, color: COLORS.Type[type] };
    });
    return stats.filter(stat => stat.count > 0);
  }, [data]);

  if (loading)
    return (
      <div className="p-6 italic text-center text-gray-400">
        Loading tasks...
      </div>
    );

  return (
    <div className="bg-gray-800 border border-gray-600 rounded-lg shadow-lg">
      {/* Header dengan judul */}
      <div className="px-6 py-4 bg-gray-800 border-b border-gray-600 rounded-t-lg">
        <h2 className="text-xl font-semibold text-white">All Tasks</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="px-6 py-4 bg-gray-800 border-b border-gray-600 rounded-t-lg">
            <tr>
              <th className="w-12 px-4 py-3 font-medium text-center text-gray-300">
              </th>
              <th className="px-4 py-3 font-medium text-center text-gray-300">
                Title
              </th>
              <th className="w-12 px-4 py-3 font-medium text-center text-gray-300">
              </th>
              <th className="px-4 py-3 font-medium text-center text-gray-300">Developer</th>
              <th className="px-4 py-3 font-medium text-center text-gray-300">Status</th>
              <th className="px-4 py-3 font-medium text-center text-gray-300">Priority</th>
              <th className="px-4 py-3 font-medium text-center text-gray-300">Type</th>
              <th className="px-4 py-3 font-medium text-center text-gray-300">Date</th>
              <th className="px-4 py-3 font-medium text-center text-gray-300">Estimated SP</th>
              <th className="px-4 py-3 font-medium text-center text-gray-300">Actual SP</th>
              <th className="w-12 px-4 py-3 font-medium text-center text-gray-300">
              </th>
            </tr>
          </thead>
         
          <tbody className="bg-gray-800 divide-y divide-gray-700">
            {data.map((task, idx) => (
              <TableRow key={idx} task={task} onUpdate={onUpdateTask} />
            ))}
          </tbody>

          {/* Total di bawah tabel */}
          {data.length > 0 && (
            <tfoot className="bg-gray-900 border-t border-gray-600">
              <tr>
                <td colSpan="7" className="px-6 py-3 text-right text-gray-300">
                  Total:
                </td>
                <td className="px-6 py-3 text-blue-400">{totalEstimated.toFixed(2)}</td>
                <td className="px-6 py-3 text-green-400">{totalActual.toFixed(2)}</td>
                <td className="px-6 py-3"></td>
              </tr>
            </tfoot>
          )}
        </table>
      </div>

      {/* Progress Bars untuk Status, Priority, dan Type dengan Persentase di dalam */}
      {data.length > 0 && (
        <div className="p-6 bg-gray-900 border-t border-gray-600">
          <div className="grid grid-cols-3 gap-6">
            {/* Status Progress */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-gray-300">Status</span>
              </div>
              <div className="relative flex h-6 gap-1 overflow-hidden bg-gray-700 rounded-full">
                {statusStats.map((stat) => (
                  <div
                    key={stat.status}
                    className={`${stat.color} relative flex items-center justify-center group`}
                    style={{ width: `${stat.percent}%` }}
                  >
                    {/* Persentase di dalam progress bar */}
                    {parseFloat(stat.percent) > 15 && (
                      <span className="text-xs font-medium text-white whitespace-nowrap">
                        {stat.percent}%
                      </span>
                    )}
                    {/* Tooltip untuk segment kecil */}
                    {parseFloat(stat.percent) <= 15 && (
                      <div className="absolute inset-0 flex items-center justify-center transition-opacity opacity-0 group-hover:opacity-100">
                        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                        <span className="relative z-10 text-xs font-medium text-white">
                          {stat.percent}%
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Priority Progress */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-gray-300">Priority</span>
              </div>
              <div className="relative flex h-6 gap-1 overflow-hidden bg-gray-700 rounded-full">
                {priorityStats.map((stat) => (
                  <div
                    key={stat.priority}
                    className={`${stat.color} relative flex items-center justify-center group`}
                    style={{ width: `${stat.percent}%` }}
                  >
                    {/* Persentase di dalam progress bar */}
                    {parseFloat(stat.percent) > 15 && (
                      <span className="text-xs font-medium text-white whitespace-nowrap">
                        {stat.percent}%
                      </span>
                    )}
                    {/* Tooltip untuk segment kecil */}
                    {parseFloat(stat.percent) <= 15 && (
                      <div className="absolute inset-0 flex items-center justify-center transition-opacity opacity-0 group-hover:opacity-100">
                        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                        <span className="relative z-10 text-xs font-medium text-white">
                          {stat.percent}%
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Type Progress */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-gray-300">Type</span>
              </div>
              <div className="relative flex h-6 gap-1 overflow-hidden bg-gray-700 rounded-full">
                {typeStats.map((stat) => (
                  <div
                    key={stat.type}
                    className={`${stat.color} relative flex items-center justify-center group`}
                    style={{ width: `${stat.percent}%` }}
                  >
                    {/* Persentase di dalam progress bar */}
                    {parseFloat(stat.percent) > 15 && (
                      <span className="text-xs font-medium text-white whitespace-nowrap">
                        {stat.percent}%
                      </span>
                    )}
                    {/* Tooltip untuk segment kecil */}
                    {parseFloat(stat.percent) <= 15 && (
                      <div className="absolute inset-0 flex items-center justify-center transition-opacity opacity-0 group-hover:opacity-100">
                        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                        <span className="relative z-10 text-xs font-medium text-white">
                          {stat.percent}%
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Pesan ketika tidak ada data */}
      {data.length === 0 && (
        <div className="px-6 py-12 text-center text-gray-400 bg-gray-800">
          No tasks found.
        </div>
      )}
    </div>
  );
}