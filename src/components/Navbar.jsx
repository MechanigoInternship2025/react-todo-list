import React from "react";

export function Navbar({ searchQuery, onSearch, isLoading }) {
  return (
    <nav
      className="flex py-2 px-4 md:px-8 bg-white border-b border-slate-200 min-h-[68px] sticky top-0 z-20"
      aria-label="Main navigation"
    >
      <div className="max-w-3xl mx-auto flex items-center gap-10 w-full">

        {/* Logo */}
        <a href="#" className="flex items-center gap-2 shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded">
          <svg width="28" height="28" viewBox="0 0 32 32" fill="none" aria-hidden="true">
            <rect width="32" height="32" rx="8" fill="#6366f1" />
            <path d="M9 16.5l4.5 4.5 9-9" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="text-[15px] font-semibold text-slate-900 tracking-tight">Todo List</span>
        </a>

        <ul className="hidden lg:flex items-center gap-1 list-none" role="list">
          {["Tasks"].map((label, i) => (
            <li key={label}>
              <a
                href="#"
                className={`text-[13.5px] font-medium px-3 py-1.5 rounded-md transition-colors ${
                  i === 0
                    ? "text-indigo-600"
                    : "text-slate-500 hover:text-slate-900 hover:bg-slate-100"
                }`}
                aria-current={i === 0 ? "page" : undefined}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* SearchBar */}
        <form className="m-auto w-1/2 max-sm:w-full" role="search" onSubmit={(e) => e.preventDefault()}>
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white outline outline-1 -outline-offset-1 outline-indigo-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-500 transition-all">
            <label htmlFor="nav-search" className="sr-only">Search tasks</label>

            {isLoading ? (
              <div className="w-3.5 h-3.5 border-2 border-slate-200 border-t-indigo-500 rounded-full animate-spin shrink-0" aria-hidden="true" />
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192.904 192.904" className="w-3.5 h-3.5 fill-slate-400 shrink-0" aria-hidden="true">
                <path d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z" />
              </svg>
            )}

            <input
              type="search"
              id="nav-search"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => onSearch(e.target.value)}
              className="flex-1 min-w-0 text-sm text-slate-900 bg-transparent outline-none placeholder:text-slate-400 [&::-webkit-search-cancel-button]:hidden"
              autoComplete="off"
            />

            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearch("")}
                aria-label="Clear search"
                className="shrink-0 text-slate-400 hover:text-slate-700 transition-colors p-0.5 rounded"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="12" height="12">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            )}
          </div>
        </form>

      </div>
    </nav>
  );
}