import React from "react";

const TABS = [
  { key: "all", label: "All" },
  { key: "undone", label: "Undone" },
  { key: "completed", label: "Completed" },
];

export function FilterTabs({ active, onChange }) {
  return (
    <div className="filter-tabs">
      {TABS.map((tab) => (
        <button
          key={tab.key}
          className={`filter-tab ${active === tab.key ? "active" : ""}`}
          onClick={() => onChange(tab.key)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}