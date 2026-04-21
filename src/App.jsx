import React from 'react';
import TaskList from './components/TaskList';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <h1>React To-Do List</h1>
      <TaskList />
    </div>
  );
}

export default App;