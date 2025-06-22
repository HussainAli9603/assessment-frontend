// client/src/pages/DashboardPage.js
import React, { useState, useEffect, useCallback } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext'; 
import "../style/dashboard.css"
import TaskInput from '../components/TaskInput'; // Component to add new tasks
import TaskItem from '../components/TaskItem';   // Component for individual tasks

const DashboardPage = () => {
  const { user } = useAuth(); // Get the authenticated user (if needed for display, etc.)
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Fetches tasks from the backend API.
   * Uses useCallback to memoize the function for useEffect dependencies.
   */
  const fetchTasks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get('/tasks');
      setTasks(response.data);
    } catch (err) {
      console.error('Failed to fetch tasks:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'Failed to load tasks.');
    } finally {
      setLoading(false);
    }
  }, []); // Empty dependency array means this function is created once

  // Fetch tasks when the component mounts or user changes (though user change usually implies re-render)
  useEffect(() => {
    if (user) { // Only fetch if a user is authenticated
      fetchTasks();
    }
  }, [user, fetchTasks]); // Depend on user and fetchTasks

  /**
   * Adds a new task.
   * @param {string} text - The text of the new task.
   */
  const handleAddTask = async (text) => {
    try {
      const response = await api.post('/tasks', { text });
      setTasks((prevTasks) => [...prevTasks, response.data]); // Add new task to state
    } catch (err) {
      console.error('Failed to add task:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'Failed to add task.');
    }
  };

  /**
   * Toggles the completion status of a task.
   * @param {string} id - The ID of the task to toggle.
   */
  const handleToggleComplete = async (id) => {
    const taskToToggle = tasks.find((task) => task.id === id);
    if (!taskToToggle) return;

    try {
      const response = await api.put(`/tasks/${id}`, { completed: !taskToToggle.completed });
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === id ? response.data : task)) // Update task in state
      );
    } catch (err) {
      console.error('Failed to update task:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'Failed to update task.');
    }
  };

  /**
   * Edits the text of a task.
   * @param {string} id - The ID of the task to edit.
   * @param {string} newText - The new text for the task.
   */
  const handleEditTask = async (id, newText) => {
    try {
      const response = await api.put(`/tasks/${id}`, { text: newText });
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === id ? response.data : task)) // Update task in state
      );
    } catch (err) {
      console.error('Failed to edit task:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'Failed to edit task.');
    }
  };

  /**
   * Deletes a task.
   * @param {string} id - The ID of the task to delete.
   */
  const handleDeleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id)); // Remove task from state
    } catch (err) {
      console.error('Failed to delete task:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'Failed to delete task.');
    }
  };

  // Conditional rendering for loading, error, and empty states
  if (loading) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
        <p className="ml-4 text-xl text-gray-700">Loading tasks...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-red-50 p-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md relative text-center">
          <strong className="font-bold">Error! </strong>
          <span className="block sm:inline">{error}</span>
          <button
            onClick={fetchTasks}
            className="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
     <div class="dashboard-container">
        <div class="task-card">
            <h1 class="dashboard-title">
                My To-Do List
            </h1>

             <TaskInput onAddTask={handleAddTask} />

         {/* Task List */}
          {tasks.length === 0 ? (
           <p className="text-center text-gray-500 text-xl py-6">No tasks yet! Add one above.</p>
           ) : (

            <ul className="space-y-4">
                  {tasks.map((task) => (
                    <TaskItem
                        key={task.id}
                        task={task}
                        onToggleComplete={handleToggleComplete}
                        onEditTask={handleEditTask}
                        onDeleteTask={handleDeleteTask}
                      />
                ))}
            </ul>
    )}

  </div>
  </div>
  );
};

export default DashboardPage;
