import { useState, useEffect, useRef } from "react";
import { useDebounce } from "./useDebounce";
import { fetchTasks } from "../services/mockApi";

export function useTasks() {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Buy Groceries", description: "", completed: false },
    { id: 2, title: "Example", description: "Add description", completed: false },
    { id: 3, title: "Programming", description: "Work on the project", completed: true },
  ]);

  const [visibleTasks, setVisibleTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [isAddingTask, setIsAddingTask] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");

  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  // Debounce (400ms delay)
  const debouncedQuery = useDebounce(searchQuery, 400);

  const tasksRef = useRef(tasks);
  useEffect(() => { tasksRef.current = tasks; }, [tasks]);

  useEffect(() => {
    let active = true;

    setIsLoading(true);
    setError(null);

    fetchTasks(debouncedQuery, tasksRef.current)
      .then((fetched) => {
        if (!active) return; // stale — discard

        // Apply the tab filter on top of the search result
        const filtered = fetched.filter((task) => {
          if (filter === "undone") return !task.completed;
          if (filter === "completed") return task.completed;
          return true;
        });

        setVisibleTasks(filtered);
        setIsLoading(false);
      })
      .catch((err) => {
        if (!active) return;
        setError(err.message);
        setIsLoading(false);
      });

    return () => { active = false; }; // cleanup: mark this fetch as stale
  }, [debouncedQuery, filter]);

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
    // Optimistically prepend to visible list if it would match current filter/search
    const matchesFilter = filter === "all" || filter === "undone";
    const term = debouncedQuery.toLowerCase();
    const matchesSearch =
      !term ||
      newTask.title.toLowerCase().includes(term) ||
      newTask.description.toLowerCase().includes(term);
    if (matchesFilter && matchesSearch) {
      setVisibleTasks((prev) => [newTask, ...prev]);
    }
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
    setVisibleTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const toggleComplete = (id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
    setVisibleTasks((prev) => {
      const updated = prev.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      );
      return updated.filter((t) => {
        if (filter === "undone") return !t.completed;
        if (filter === "completed") return t.completed;
        return true;
      });
    });
  };

  const startEdit = (task) => {
    setEditingTaskId(task.id);
    setEditTitle(task.title);
    setEditDescription(task.description);
  };

  const saveEdit = () => {
    if (!editTitle.trim()) return;
    const updated = { title: editTitle.trim(), description: editDescription.trim() };
    setTasks((prev) =>
      prev.map((t) => (t.id === editingTaskId ? { ...t, ...updated } : t))
    );
    setVisibleTasks((prev) =>
      prev.map((t) => (t.id === editingTaskId ? { ...t, ...updated } : t))
    );
    setEditingTaskId(null);
  };

  const cancelEdit = () => setEditingTaskId(null);

  const openAddTask = () => setIsAddingTask(true);
  const closeAddTask = () => {
    setIsAddingTask(false);
    setNewTaskTitle("");
    setNewTaskDescription("");
  };

  return {
    filteredTasks: visibleTasks,
    isLoading,
    error,
    filter,
    setFilter,
    searchQuery,
    setSearchQuery,
    isAddingTask,
    newTaskTitle,
    setNewTaskTitle,
    newTaskDescription,
    setNewTaskDescription,
    addTask,
    openAddTask,
    closeAddTask,
    editingTaskId,
    editTitle,
    setEditTitle,
    editDescription,
    setEditDescription,
    startEdit,
    saveEdit,
    cancelEdit,
    deleteTask,
    toggleComplete,
  };
}