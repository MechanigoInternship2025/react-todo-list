import React, { useState, useRef, useEffect } from "react";

/* Add Task */
export function AddTaskForm({ isExpanded, onExpand, onClose, title, setTitle, description, setDescription, onAdd, disabled }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!isExpanded) return;
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) onClose();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isExpanded, onClose]);

  const onKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); onAdd(); }
    if (e.key === "Escape") onClose();
  };

  return (
    <div
      ref={ref}
      className={`flex items-center gap-2 px-3 rounded-lg border transition-all cursor-text ${
        isExpanded
          ? "border-indigo-400 bg-slate-50 py-2.5"
          : "border-indigo-200 bg-slate-50 min-h-[44px]"
      }`}
    >
      <div className="flex-1 flex flex-col gap-1.5 min-w-0">
        <input
          type="text"
          placeholder="Add Task"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onFocus={onExpand}
          onKeyDown={onKeyDown}
          disabled={disabled}
          className="w-full bg-transparent text-[13.5px] font-medium text-slate-900 placeholder:text-slate-400 placeholder:font-normal outline-none disabled:opacity-50"
        />
        {isExpanded && (
          <input
            type="text"
            placeholder="Add description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            onKeyDown={onKeyDown}
            className="w-full bg-transparent text-[13px] text-slate-500 placeholder:text-slate-400 outline-none"
          />
        )}
      </div>

      <button
        type="button"
        onClick={onAdd}
        disabled={!title.trim() || disabled}
        aria-label="Add task"
        className="w-7 h-7 shrink-0 rounded-full border-2 border-slate-300 bg-white text-slate-400 flex items-center justify-center transition-all duration-200
          enabled:hover:border-indigo-500 enabled:hover:bg-indigo-500 enabled:hover:text-white enabled:hover:scale-105 enabled:hover:shadow-md enabled:hover:shadow-indigo-500/25
          disabled:opacity-35 disabled:cursor-not-allowed
          active:enabled:scale-95"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" width="13" height="13">
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </button>
    </div>
  );
}

/* Task Items */
export function TaskItem({
  task,
  onDelete,
  onToggle,
  onStartEdit,
  isEditing,
  editTitle,
  setEditTitle,
  editDescription,
  setEditDescription,
  onSaveEdit,
  onCancelEdit,
}) {
  const [hovered, setHovered] = useState(false);

  const onKeyDown = (e) => {
    if (e.key === "Enter") onSaveEdit();
    if (e.key === "Escape") onCancelEdit();
  };

  /* Edit */
  if (isEditing) {
    return (
      <div className="bg-white rounded-lg border border-indigo-400 shadow-lg shadow-indigo-100 p-3 transition-all">
        <div className="flex items-start gap-3">
          <CheckboxButton completed={task.completed} onToggle={() => onToggle(task.id)} />
          <div className="flex-1 flex flex-col gap-1.5 min-w-0">
            <input
              autoFocus
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              onKeyDown={onKeyDown}
              className="w-full bg-transparent text-[14px] font-medium text-slate-900 outline-none"
              placeholder="Task title"
            />
            <input
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder="Add description"
              className="w-full bg-transparent text-[13px] text-slate-500 placeholder:text-slate-400 outline-none"
            />
            <div className="flex justify-end gap-2 mt-1">
              <button
                onClick={onCancelEdit}
                className="text-[12px] font-medium px-3 py-1 rounded-md border border-slate-200 text-slate-500 hover:bg-slate-100 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={onSaveEdit}
                className="text-[12px] font-medium px-3 py-1 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* Default */
  return (
    <div
      className={`bg-white rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200 p-3 ${
        task.completed ? "opacity-60" : ""
      }`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex items-start gap-3">
        <CheckboxButton completed={task.completed} onToggle={() => onToggle(task.id)} />

        <div className="flex-1 flex flex-col gap-0.5 min-w-0">
          <span className={`text-[14px] font-medium text-slate-900 leading-snug ${task.completed ? "line-through text-slate-400" : ""}`}>
            {task.title}
          </span>
          {task.description && (
            <span className="text-[12.5px] text-slate-400 leading-snug">{task.description}</span>
          )}
        </div>

        <div className={`flex gap-1 shrink-0 transition-opacity duration-200 ${hovered ? "opacity-100" : "opacity-0"}`}>
          <ActionBtn onClick={() => onStartEdit(task)} label="Edit">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
          </ActionBtn>
          <ActionBtn onClick={() => onDelete(task.id)} label="Delete" danger>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6l-1 14H6L5 6" />
              <path d="M10 11v6M14 11v6" />
              <path d="M9 6V4h6v2" />
            </svg>
          </ActionBtn>
        </div>
      </div>
    </div>
  );
}

function CheckboxButton({ completed, onToggle }) {
  return (
    <button
      onClick={onToggle}
      aria-label="Toggle complete"
      className={`w-[18px] h-[18px] mt-0.5 shrink-0 rounded-full border-2 flex items-center justify-center transition-colors ${
        completed
          ? "bg-yellow-500 border-yellow-500"
          : "border-slate-300 hover:border-yellow-400"
      }`}
    >
      {completed && (
        <svg viewBox="0 0 12 12" fill="none" stroke="white" strokeWidth="2.2" width="10" height="10">
          <polyline points="2,6 5,9 10,3" />
        </svg>
      )}
    </button>
  );
}

function ActionBtn({ onClick, label, danger, children }) {
  return (
    <button
      onClick={onClick}
      title={label}
      className={`flex items-center justify-center p-1.5 rounded-md border transition-all duration-200 ${
        danger
          ? "border-slate-200 text-slate-400 hover:bg-red-50 hover:text-red-500 hover:border-red-200"
          : "border-slate-200 text-slate-400 hover:bg-slate-100 hover:text-slate-700 hover:border-slate-300"
      }`}
    >
      {children}
    </button>
  );
}