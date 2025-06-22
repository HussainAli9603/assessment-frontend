// client/src/components/TaskInput.js
import React, { useState } from 'react';
import "../style/taskInput.css"

/**
 * TaskInput Component
 * Allows users to add new tasks by typing into an input field and submitting.
 * @param {function} onAddTask - Function to call when a new task is added.
 * This function typically handles the API call to create the task.
 */
const TaskInput = ({ onAddTask }) => {
  const [taskText, setTaskText] = useState(''); // State to hold the current value of the input field

  /**
   * Handles the form submission event.
   * Prevents default form submission, validates the input, and calls onAddTask if valid.
   * @param {object} e - The form submission event.
   */
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default browser form submission behavior
    // Check if the task text is not empty or just whitespace
    if (taskText.trim()) {
      onAddTask(taskText.trim()); // Call the parent function with the trimmed task text
      setTaskText(''); // Clear the input field after submission
    }
  };

  return (
    <form onSubmit={handleSubmit} className="task-input-form">
      <input
        type="text"
        className="flex-grow p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 text-lg text-gray-800"
        placeholder="Add a new task..."
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)} // Update taskText state on input change
        aria-label="New task input field" // Accessibility: describes the purpose of the input
      />
      <button
        type="submit"
        className="task-submit-button"
        aria-label="Add Task button" // Accessibility: describes the purpose of the button
      >
        Add Task
      </button>
    </form>
  );
};

export default TaskInput;
