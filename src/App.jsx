import React from "react";
import { useTasks } from "./hooks/useTasks";
import { SearchBar } from "./components/SearchBar";
import { AddTaskForm } from "./components/AddTaskForm";
import { FilterTabs } from "./components/FilterTabs";
import { TaskList } from "./components/TaskList";
import "./App.css";

export default function App() {
  const {
    filteredTasks,
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
        <SearchBar value={searchQuery} onChange={setSearchQuery} />

        <AddTaskForm
          isExpanded={isAddingTask}
          onExpand={openAddTask}
          onClose={closeAddTask}
          title={newTaskTitle}
          setTitle={setNewTaskTitle}
          description={newTaskDescription}
          setDescription={setNewTaskDescription}
          onAdd={addTask}
        />

        <FilterTabs active={filter} onChange={setFilter} />

        <TaskList
          tasks={filteredTasks}
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
      </div>
    </div>
  );
}