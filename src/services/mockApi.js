const TASK_DB = [
  { id: 1, title: "Buy Groceries", description: "", completed: false },
  { id: 2, title: "Example", description: "Add description", completed: false },
  { id: 3, title: "Programming", description: "Work on the project", completed: true },
];


export function fetchTasks(searchTerm = "", tasks = TASK_DB) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
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

      resolve(filtered.map((t) => ({ ...t })));
    }, 500);
  });
}