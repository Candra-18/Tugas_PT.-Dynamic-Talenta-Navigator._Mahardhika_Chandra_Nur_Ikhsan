import React from "react";
import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";
import KanbanColumn from "./KanbanColumn";
import KanbanCard from "./KanbanCard";

function DraggableKanbanCard({ task }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task._id || task.title,
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      {...listeners} 
      {...attributes}
      className="select-none touch-none"
    >
      <KanbanCard task={task} />
    </div>
  );
}

function DroppableKanbanColumn({ status, children }) {
  const { isOver, setNodeRef } = useDroppable({
    id: status,
  });

  return (
    <div ref={setNodeRef}>
      <KanbanColumn status={status} isOver={isOver}>
        {children}
      </KanbanColumn>
    </div>
  );
}

export default function KanbanView({ data, loading, updateTask, statusOptions }) {
  if (loading) {
    return <div className="p-6 italic text-center text-gray-500">Loading tasks...</div>;
  }

  if (!data || data.length === 0) {
    return <div className="p-6 text-center text-gray-500">No tasks found</div>;
  }

  const handleDragEnd = (event) => {
    const { active, over } = event;
    
    if (!over) {
      return;
    }

    const draggedId = active.id;
    const targetStatus = over.id;

    const task = data.find((t) => t._id === draggedId || t.title === draggedId);
    
    if (!task) {
      return;
    }

    if (task.status === targetStatus) {
      return;
    }    
    // Update task status
    const updatedTask = { ...task, status: targetStatus };
    updateTask(updatedTask);
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      {/* Container dengan scroll horizontal */}
      <div className="flex gap-4 pb-6 overflow-x-auto">
        {statusOptions.map((status) => {
          const tasks = data.filter((t) => t.status === status);
          return (
            <DroppableKanbanColumn key={status} status={status}>
              {tasks.map((task) => (
                <DraggableKanbanCard key={task._id || task.title} task={task} />
              ))}
            </DroppableKanbanColumn>
          );
        })}
      </div>
    </DndContext>
  );
}