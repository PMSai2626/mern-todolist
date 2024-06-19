// TaskList.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTrashAlt, FaDownload, FaEdit, FaSave, FaTimes } from 'react-icons/fa';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const TaskList = ({ tasks, setTasks }) => {
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTaskDescription, setEditedTaskDescription] = useState('');

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

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`);
      setTasks(tasks.filter(task => task._id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const toggleComplete = async (id, completed) => {
    try {
      await axios.put(`http://localhost:5000/api/tasks/${id}`, { completed });
      fetchTasks();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleEditClick = (task) => {
    setEditingTaskId(task._id);
    setEditedTaskDescription(task.description);
  };

  const handleCancelEdit = () => {
    setEditingTaskId(null);
    setEditedTaskDescription('');
  };

  const handleSaveEdit = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/tasks/${id}`, { description: editedTaskDescription });
      fetchTasks();
      setEditingTaskId(null);
      setEditedTaskDescription('');
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const downloadPDF = () => {
    const input = document.getElementById('task-list');
    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'PNG', 0, 0);
        pdf.save('tasks.pdf');
      })
      .catch((error) => {
        console.error('Error generating PDF:', error);
      });
  };

  return (
    <div className="task-list-container">
      <h2 className="task-list-title">Task List</h2>
      <ul className="task-ul" id="task-list">
        {tasks.map(task => (
          <li key={task._id} className="task-item">
            {editingTaskId === task._id ? (
              <>
                <input
                  type="text"
                  value={editedTaskDescription}
                  onChange={(e) => setEditedTaskDescription(e.target.value)}
                  className="edit-task-input"
                />
                <button onClick={() => handleSaveEdit(task._id)} className="edit-button">
                  <FaSave className="save-icon" />
                </button>
                <button onClick={handleCancelEdit} className="edit-button">
                  <FaTimes className="cancel-icon" />
                </button>
              </>
            ) : (
              <>
                <div className="task-item-content">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleComplete(task._id, !task.completed)}
                    className="task-checkbox"
                  />
                  <span className={task.completed ? 'task-completed' : ''}>{task.description}</span>
                </div>
                <div>
                  <button onClick={() => handleEditClick(task)} className="edit-button">
                    <FaEdit className="edit-icon" /> Edit
                  </button>
                  <button onClick={() => deleteTask(task._id)} className="task-delete-button">
                    <FaTrashAlt className="trash-icon" /> Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
      <button onClick={downloadPDF} className="download-pdf-button">
        <FaDownload className="download-icon" /> Download as PDF
      </button>
    </div>
  );
};

export default TaskList;
