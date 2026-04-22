import React, { useRef, useEffect } from "react";

export function AddTaskForm({
  isExpanded,
  onExpand,
  onClose,
  title,
  setTitle,
  description,
  setDescription,
  onAdd,
  disabled,
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!isExpanded) return;
    const handleClick = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [isExpanded, onClose]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onAdd();
    }
    if (e.key === "Escape") onClose();
  };

  return (
    <div
      className={`add-task-bar ${isExpanded ? "expanded" : ""}`}
      ref={containerRef}
    >
      <div className="addbar-inputs">
        <input
          type="text"
          placeholder="Add Task"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onFocus={onExpand}
          onKeyDown={handleKeyDown}
          className="addbar-title-input"
          disabled={disabled}
        />
        {isExpanded && (
          <input
            type="text"
            placeholder="Add description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            onKeyDown={handleKeyDown}
            className="addbar-desc-input"
          />
        )}
      </div>

      {/* Circle + button — always on the right, submits the task */}
      <button
        className="add-circle-btn"
        onClick={onAdd}
        disabled={!title.trim() || disabled}
        aria-label="Add task"
        type="button"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" width="14" height="14">
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </button>
    </div>
  );
}