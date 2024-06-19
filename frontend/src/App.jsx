import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import AddTask from './components/AddTask';
import './App.css'; // Import consolidated CSS styles
import { FaTasks } from 'react-icons/fa';
import axios from 'axios';

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleTaskAdded = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <FaTasks size={50} />
        <h1>To-Do List</h1>
      </header>
      <main className="app-main">
        <AddTask onTaskAdded={handleTaskAdded} />
        <TaskList tasks={tasks} setTasks={setTasks} />
      </main>
      <footer className="app-footer">
        <p>&copy; 2024 Your Company</p>
      </footer>
    </div>
  );
}

export default App;
