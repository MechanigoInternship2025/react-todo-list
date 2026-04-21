// Mock task database — source of truth for the API layer.
// In a real app this would be a backend endpoint.
const TASK_DB = [
  { id: 1, title: "Buy Groceries", description: "", completed: false },
  { id: 2, title: "Example", description: "Add description", completed: false },
  { id: 3, title: "Programming", description: "Work on the project", completed: true },
];

/**
 * fetchTasks(searchTerm, tasks)
 *
 * Simulates a real API call:
 *  - Accepts an optional search term and the current task list
 *  - Returns a Promise that resolves after ~500ms (simulated network delay)
 *  - Filters results case-insensitively on title + description
 *  - Rejects with an error ~5% of the time to simulate network failure
 */
export function fetchTasks(searchTerm = "", tasks = TASK_DB) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate occasional network failure
      if (Math.random() < 0.05) {
        reject(new Error("Network error: failed to fetch tasks."));
        return;
      }

      const term = searchTerm.trim().toLowerCase();

      const filtered = term
        ? tasks.filter(
            (task) =>
              task.title.toLowerCase().includes(term) ||
              task.description.toLowerCase().includes(term)
          )
        : tasks;

      // Return a shallow copy so callers can't mutate the "DB"
      resolve(filtered.map((t) => ({ ...t })));
    }, 500);
  });
}