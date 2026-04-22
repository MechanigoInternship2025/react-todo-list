import React from "react";

export function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-12 gap-3" aria-label="Loading tasks">
      <div className="w-7 h-7 border-[2.5px] border-slate-200 border-t-indigo-500 rounded-full animate-spin" />
      <span className="text-[13px] text-slate-400">Fetching tasks…</span>
    </div>
  );
}