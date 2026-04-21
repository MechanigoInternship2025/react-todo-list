import React from "react";

export function LoadingSpinner() {
  return (
    <div className="loading-container" aria-label="Loading tasks">
      <div className="spinner" />
      <span className="loading-text">Fetching tasks…</span>
    </div>
  );
}