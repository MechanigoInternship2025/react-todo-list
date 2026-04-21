import React, { useState, useEffect } from 'react';
import TaskItem from './TaskItem';

const TaskList = () => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('todoTasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [newTaskText, setNewTaskText] = useState('');

  // Persist tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('todoTasks', JSON.stringify(tasks));
  }, [tasks]);

  // Create task
  const addTask = (e) => {
    e.preventDefault();
    const trimmedText = newTaskText.trim();
    if (trimmedText === '') return;

    const newTask = {
      id: Date.now(),
      text: trimmedText,
      completed: false,
    };
    setTasks([...tasks, newTask]);
    setNewTaskText('');
  };

  // Delete task
  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  // Toggle complete (crossed out)
  const toggleComplete = (taskId) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  // Edit task text
  const editTask = (taskId, newText) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, text: newText } : task
    ));
  };

  const remainingTasks = tasks.filter(task => !task.completed).length;

  return (
    <div className="tasklist-container">
      <form className="task-form" onSubmit={addTask}>
        <input
          type="text"
          placeholder="What needs to be done?"
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
        />
        <button type="submit">+ Add task</button>
      </form>

      {tasks.length === 0 ? (
        <div className="empty-state">
          ✨ Your to-do list is quiet. Add a task to get started!
        </div>
      ) : (
        <>
          <ul className="task-list">
            {tasks.map(task => (
              <TaskItem
                key={task.id}
                task={task}
                onDelete={deleteTask}
                onToggle={toggleComplete}
                onEdit={editTask}
              />
            ))}
          </ul>
          <div className="task-stats">
            {remainingTasks} task{remainingTasks !== 1 ? 's' : ''} left • {tasks.length} total
          </div>
        </>
      )}
    </div>
  );
};

export default TaskList;