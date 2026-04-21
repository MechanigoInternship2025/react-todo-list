import React, { useState } from "react";

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

  const handleKeyDown = (e) => {
    if (e.key === "Enter") onSaveEdit();
    if (e.key === "Escape") onCancelEdit();
  };

  if (isEditing) {
    return (
      <div className="task-item editing">
        <div className="task-checkbox-col">
          <button
            className={`task-checkbox ${task.completed ? "checked" : ""}`}
            onClick={() => onToggle(task.id)}
            aria-label="Toggle complete"
          >
            {task.completed && (
              <svg viewBox="0 0 12 12" fill="none" stroke="white" strokeWidth="2">
                <polyline points="2,6 5,9 10,3" />
              </svg>
            )}
          </button>
        </div>
        <div className="task-content">
          <input
            autoFocus
            className="edit-title-input"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <input
            className="edit-desc-input"
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Add description"
          />
          <div className="edit-actions">
            <button className="btn-cancel-sm" onClick={onCancelEdit}>Cancel</button>
            <button className="btn-save-sm" onClick={onSaveEdit}>Save</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`task-item ${task.completed ? "completed" : ""} ${hovered ? "hovered" : ""}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="task-checkbox-col">
        <button
          className={`task-checkbox ${task.completed ? "checked" : ""}`}
          onClick={() => onToggle(task.id)}
          aria-label="Toggle complete"
        >
          {task.completed && (
            <svg viewBox="0 0 12 12" fill="none" stroke="white" strokeWidth="2.2">
              <polyline points="2,6 5,9 10,3" />
            </svg>
          )}
        </button>
      </div>

      <div className="task-content">
        <span className="task-title">{task.title}</span>
        {task.description && (
          <span className="task-description">{task.description}</span>
        )}
      </div>

      <div className={`task-actions ${hovered ? "visible" : ""}`}>
        <button
          className="action-btn edit-btn"
          onClick={() => onStartEdit(task)}
          title="Edit"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
        </button>
        <button
          className="action-btn delete-btn"
          onClick={() => onDelete(task.id)}
          title="Delete"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15">
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6l-1 14H6L5 6" />
            <path d="M10 11v6M14 11v6" />
            <path d="M9 6V4h6v2" />
          </svg>
        </button>
      </div>
    </div>
  );
}