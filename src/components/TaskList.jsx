import React from "react";
import { TaskItem } from "./TaskItem";

const TABS = [
  { key: "all", label: "All" },
  { key: "undone", label: "Undone" },
  { key: "completed", label: "Completed" },
];

export function TaskList({
  tasks,
  searchQuery,
  filter,
  onFilterChange,
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
  return (
    <div className="flex flex-col gap-3">

      {/* Tabs Filter */}
      <div className="flex gap-1 bg-slate-100 rounded-lg p-1">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => onFilterChange(tab.key)}
            className={`flex-1 text-[13px] font-medium py-1.5 rounded-md transition-colors ${
              filter === tab.key
                ? "bg-yellow-400 text-white"
                : "text-slate-500 hover:text-slate-800 hover:bg-slate-200"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Task Item List */}
      {tasks.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 gap-3 text-slate-400">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="40" height="40">
            {searchQuery ? (
              <>
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
                <line x1="8" y1="11" x2="14" y2="11" />
              </>
            ) : (
              <>
                <rect x="3" y="3" width="18" height="18" rx="3" />
                <path d="M9 12l2 2 4-4" />
              </>
            )}
          </svg>
          <p className="text-[13.5px] text-center max-w-[200px]">
            {searchQuery ? `No tasks matching "${searchQuery}"` : "No tasks here"}
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
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
      )}
    </div>
  );
}