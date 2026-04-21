import React from "react";
import { TaskItem } from "./TaskItem";

export function TaskList({
  tasks,
  searchQuery,
  editingTaskId,
  editTitle,
  setEditTitle,
  editDescription,
  setEditDescription,
  onDelete,
  onToggle,
  onStartEdit,
  onSaveEdit,
  onCancelEdit,
}) {
  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="40" height="40">
          {searchQuery ? (
            <><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="8" y1="11" x2="14" y2="11"/></>
          ) : (
            <><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M9 12l2 2 4-4"/></>
          )}
        </svg>
        <p>{searchQuery ? `No tasks matching "${searchQuery}"` : "No tasks here"}</p>
      </div>
    );
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onDelete={onDelete}
          onToggle={onToggle}
          onStartEdit={onStartEdit}
          isEditing={editingTaskId === task.id}
          editTitle={editTitle}
          setEditTitle={setEditTitle}
          editDescription={editDescription}
          setEditDescription={setEditDescription}
          onSaveEdit={onSaveEdit}
          onCancelEdit={onCancelEdit}
        />
      ))}
    </div>
  );
}