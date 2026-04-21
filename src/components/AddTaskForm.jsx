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
      <svg
        className="addbar-icon"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        width="15"
        height="15"
      >
        <line x1="12" y1="5" x2="12" y2="19" />
        <line x1="5" y1="12" x2="19" y2="12" />
      </svg>

      <div className="addbar-inputs">
        <input
          type="text"
          placeholder="Add Task"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onFocus={onExpand}
          onKeyDown={handleKeyDown}
          className="addbar-title-input"
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

      {isExpanded && (
        <button
          className="addbar-submit-btn"
          onClick={onAdd}
          disabled={!title.trim()}
        >
          Add Task
        </button>
      )}
    </div>
  );
}