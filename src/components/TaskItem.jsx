import React, { useState } from 'react';

const TaskItem = ({ task, onDelete, onToggle, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const trimmed = editText.trim();
    if (trimmed === '') return;
    onEdit(task.id, trimmed);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditText(task.text);
  };

  return (
    <li className={`task-item ${task.completed ? 'completed' : ''}`}>
      {isEditing ? (
        <form className="edit-form" onSubmit={handleEditSubmit}>
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            autoFocus
          />
          <div className="edit-actions">
            <button type="submit" className="save-btn">✓ Save</button>
            <button type="button" className="cancel-btn" onClick={handleCancelEdit}>✗ Cancel</button>
          </div>
        </form>
      ) : (
        <>
          <div className="task-content">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => onToggle(task.id)}
              className="task-checkbox"
            />
            <span className="task-text">{task.text}</span>
          </div>
          <div className="task-actions">
            <button
              className="edit-btn"
              onClick={() => setIsEditing(true)}
              aria-label="Edit task"
            >
            Edit
            </button>
            <button
              className="delete-btn"
              onClick={() => onDelete(task.id)}
              aria-label="Delete task"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </li>
  );
};

export default TaskItem;