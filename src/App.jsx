import React from "react";
import { useTasks } from "./hooks/useTasks";
import { SearchBar } from "./components/SearchBar";
import { AddTaskForm } from "./components/AddTaskForm";
import { FilterTabs } from "./components/FilterTabs";
import { TaskList } from "./components/TaskList";
import { LoadingSpinner } from "./components/LoadingSpinner";
import "./App.css";

export default function App() {
  const {
    filteredTasks,
    isLoading,
    error,
    filter, setFilter,
    searchQuery, setSearchQuery,
    isAddingTask,
    newTaskTitle, setNewTaskTitle,
    newTaskDescription, setNewTaskDescription,
    editingTaskId,
    editTitle, setEditTitle,
    editDescription, setEditDescription,
    addTask, deleteTask, toggleComplete,
    startEdit, saveEdit, cancelEdit,
    openAddTask, closeAddTask,
  } = useTasks();

  return (
    <div className="app-bg">
      <div className="app-card">
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          isLoading={isLoading}
        />

        <AddTaskForm
          isExpanded={isAddingTask}
          onExpand={openAddTask}
          onClose={closeAddTask}
          title={newTaskTitle}
          setTitle={setNewTaskTitle}
          description={newTaskDescription}
          setDescription={setNewTaskDescription}
          onAdd={addTask}
          disabled={isLoading}
        />

        <FilterTabs active={filter} onChange={setFilter} />

        {error && (
          <div className="error-banner" role="alert">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            {error}
          </div>
        )}

        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <TaskList
            tasks={filteredTasks}
            searchQuery={searchQuery}
            editingTaskId={editingTaskId}
            editTitle={editTitle}
            setEditTitle={setEditTitle}
            editDescription={editDescription}
            setEditDescription={setEditDescription}
            onDelete={deleteTask}
            onToggle={toggleComplete}
            onStartEdit={startEdit}
            onSaveEdit={saveEdit}
            onCancelEdit={cancelEdit}
          />
        )}
      </div>
    </div>
  );
}