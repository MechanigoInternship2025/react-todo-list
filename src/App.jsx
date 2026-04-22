import React from "react";
import { useTasks } from "./hooks/useTasks";
import { Navbar } from "./components/Navbar";
import { AddTaskForm } from "./components/TaskItem";   // merged into TaskItem file
import { TaskList } from "./components/TaskList";
import { LoadingSpinner } from "./components/LoadingSpinner";

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
    <div className="min-h-screen bg-slate-100">
      <Navbar
        searchQuery={searchQuery}
        onSearch={setSearchQuery}
        isLoading={isLoading}
      />

      <main className="flex justify-center px-4 py-8">
        <div className="w-full max-w-xl bg-white rounded-xl shadow-sm border border-slate-200 p-5 flex flex-col gap-3">

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

          {error && (
            <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-red-50 border border-red-200 text-red-600 text-[13px]" role="alert">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
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
              filter={filter}
              onFilterChange={setFilter}
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
      </main>
    </div>
  );
}