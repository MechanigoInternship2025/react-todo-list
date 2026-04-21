import { useState } from "react";

const INITIAL_TASKS = [
  { id: 1, title: "Buy Groceries", description: "", completed: false },
  { id: 2, title: "Example", description: "Add description", completed: false },
  { id: 3, title: "Programming", description: "", completed: true },
];

export function useTasks() {
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [filter, setFilter] = useState("all"); // "all" | "undone" | "completed"
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const addTask = () => {
    if (!newTaskTitle.trim()) return;
    const newTask = {
      id: Date.now(),
      title: newTaskTitle.trim(),
      description: newTaskDescription.trim(),
      completed: false,
    };
    setTasks((prev) => [newTask, ...prev]);
    setNewTaskTitle("");
    setNewTaskDescription("");
    setIsAddingTask(false);
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const toggleComplete = (id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const startEdit = (task) => {
    setEditingTaskId(task.id);
    setEditTitle(task.title);
    setEditDescription(task.description);
  };

  const saveEdit = () => {
    if (!editTitle.trim()) return;
    setTasks((prev) =>
      prev.map((t) =>
        t.id === editingTaskId
          ? { ...t, title: editTitle.trim(), description: editDescription.trim() }
          : t
      )
    );
    setEditingTaskId(null);
  };

  const cancelEdit = () => {
    setEditingTaskId(null);
  };

  const openAddTask = () => setIsAddingTask(true);
  const closeAddTask = () => {
    setIsAddingTask(false);
    setNewTaskTitle("");
    setNewTaskDescription("");
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesFilter =
      filter === "all" ||
      (filter === "undone" && !task.completed) ||
      (filter === "completed" && task.completed);
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return {
    tasks,
    filteredTasks,
    filter,
    setFilter,
    searchQuery,
    setSearchQuery,
    isAddingTask,
    newTaskTitle,
    setNewTaskTitle,
    newTaskDescription,
    setNewTaskDescription,
    editingTaskId,
    editTitle,
    setEditTitle,
    editDescription,
    setEditDescription,
    addTask,
    deleteTask,
    toggleComplete,
    startEdit,
    saveEdit,
    cancelEdit,
    openAddTask,
    closeAddTask,
  };
}