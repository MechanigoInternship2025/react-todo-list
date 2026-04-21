import { useState, useEffect, useRef } from "react";
import { useDebounce } from "./useDebounce";
import { fetchTasks } from "../services/mockApi";

/**
 * useTasks — central state manager for the task list.
 *
 * State owned here:
 *  - tasks          : source-of-truth task array (mutated by add/delete/toggle/edit)
 *  - visibleTasks   : what the UI actually renders (result of last API fetch)
 *  - searchQuery    : raw value from the search input (updates on every keystroke)
 *  - isLoading      : true while the mock API promise is in-flight
 *  - error          : holds an error message if the mock API rejects
 *
 * Search flow:
 *  searchQuery → useDebounce (400ms) → debouncedQuery → useEffect
 *  → fetchTasks() Promise → setVisibleTasks / setIsLoading / setError
 *
 * Mutations (add/delete/toggle/edit) update `tasks` directly and then
 * re-trigger the debounced search so visibleTasks stays consistent.
 */
export function useTasks() {
  // ── Core state ────────────────────────────────────────────────────────────
  const [tasks, setTasks] = useState([
    { id: 1, title: "Buy Groceries", description: "", completed: false },
    { id: 2, title: "Example", description: "Add description", completed: false },
    { id: 3, title: "Programming", description: "Work on the project", completed: true },
  ]);

  const [visibleTasks, setVisibleTasks] = useState([]);
  const [filter, setFilter] = useState("all"); // "all" | "undone" | "completed"
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // ── Add-task form state ───────────────────────────────────────────────────
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");

  // ── Edit state ────────────────────────────────────────────────────────────
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  // ── Debounce ──────────────────────────────────────────────────────────────
  // searchQuery updates instantly so typing feels snappy.
  // debouncedQuery only changes after 400ms of inactivity — this is what
  // triggers the mock API call, preventing a fetch on every keystroke.
  const debouncedQuery = useDebounce(searchQuery, 400);

  // Keep a ref to the latest tasks so the effect always sees fresh data
  // without needing `tasks` in the dependency array (which would cause
  // extra fetches on every mutation).
  const tasksRef = useRef(tasks);
  useEffect(() => { tasksRef.current = tasks; }, [tasks]);

  // ── Search effect ─────────────────────────────────────────────────────────
  // Runs whenever debouncedQuery or filter changes.
  // Uses an `active` flag to discard results from stale (cancelled) fetches —
  // this prevents a slow fetch from overwriting a faster, newer one.
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

  // ── Helpers that mutate tasks and re-sync visible list ────────────────────

  // After any mutation we immediately update `tasks` state and let the
  // existing useEffect re-run on the next debounce cycle. However, since
  // mutations should feel instant we also optimistically patch visibleTasks.

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
      // Re-apply tab filter so toggling moves tasks between tabs instantly
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
    // Displayed data
    filteredTasks: visibleTasks,
    isLoading,
    error,
    // Filter tab
    filter,
    setFilter,
    // Search
    searchQuery,
    setSearchQuery,
    // Add form
    isAddingTask,
    newTaskTitle,
    setNewTaskTitle,
    newTaskDescription,
    setNewTaskDescription,
    addTask,
    openAddTask,
    closeAddTask,
    // Edit
    editingTaskId,
    editTitle,
    setEditTitle,
    editDescription,
    setEditDescription,
    startEdit,
    saveEdit,
    cancelEdit,
    // Mutations
    deleteTask,
    toggleComplete,
  };
}