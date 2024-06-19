import React, { useState } from 'react';
import axios from 'axios';
import { FaPlus } from 'react-icons/fa';

const AddTask = ({ onTaskAdded }) => {
  const [description, setDescription] = useState('');

  const addTask = async () => {
    try {
      if (description.trim()) {
        const response = await axios.post('http://localhost:5000/api/tasks', { description });
        onTaskAdded(response.data);
        setDescription('');
      }
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  return (
    <div className="add-task-container">
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Add new task"
        className="task-input"
      />
      <button onClick={addTask} className="add-button">
        <FaPlus className="plus-icon" /> Add Task
      </button>
    </div>
  );
};

export default AddTask;
