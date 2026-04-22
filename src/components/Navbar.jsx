import React from "react";

export function Navbar({ searchQuery, onSearch, isLoading }) {
  return (
    <nav className="navbar" aria-label="Main navigation">
      <div className="navbar-inner">
        {/* Logo */}
        <a href="#" className="navbar-logo" aria-label="Todo App home">
          <svg width="28" height="28" viewBox="0 0 32 32" fill="none" aria-hidden="true">
            <rect width="32" height="32" rx="8" fill="#6366f1" />
            <path d="M9 16.5l4.5 4.5 9-9" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="navbar-brand">Todo List</span>
        </a>

        {/* Nav links */}
        <ul className="navbar-links" role="list">
          <li><a href="#" className="navbar-link active" aria-current="page">Tasks</a></li>
        </ul>

        {/* Search */}
        <form className="navbar-search" role="search" onSubmit={(e) => e.preventDefault()}>
          <div className={`navbar-search-inner ${isLoading ? "loading" : ""}`}>
            <label htmlFor="nav-search" className="sr-only">Search tasks</label>
            {isLoading ? (
              <div className="nav-spinner" aria-hidden="true" />
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 192.904 192.904"
                className="nav-search-icon"
                aria-hidden="true"
              >
                <path d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z" />
              </svg>
            )}
            <input
              type="search"
              id="nav-search"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => onSearch(e.target.value)}
              className="navbar-search-input"
              autoComplete="off"
            />
            {searchQuery && (
              <button
                type="button"
                className="nav-clear-btn"
                onClick={() => onSearch("")}
                aria-label="Clear search"
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