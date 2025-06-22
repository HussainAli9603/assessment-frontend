// client/src/components/TaskItem.js
import React, { useState, useRef, useEffect } from 'react';
import "../style/taskItem.css";

/**
 * TaskItem Component
 * Displays an individual task and provides actions for it.
 * @param {object} props.task - The task object to display { id, text, completed }.
 * @param {function} props.onToggleComplete - Function to call to toggle task completion.
 * @param {function} props.onEditTask - Function to call to edit task text.
 * @param {function} props.onDeleteTask - Function to call to delete task.
 */
const TaskItem = ({ task, onToggleComplete, onEditTask, onDeleteTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);
  const inputRef = useRef(null); // Ref for the input field when editing

  // Focus the input when editing starts
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  /**
   * Handles the submission of an edited task.
   * Updates the task if text is not empty and has changed.
   */
  const handleEditSubmit = () => {
    if (editText.trim() && editText.trim() !== task.text) {
      onEditTask(task.id, editText.trim());
    }
    setIsEditing(false); // Exit editing mode
  };

  /**
   * Handles key presses in the edit input field.
   * Submits on Enter, cancels on Escape.
   * @param {object} e - KeyboardEvent object.
   */
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleEditSubmit();
    } else if (e.key === 'Escape') {
      setIsEditing(false);
      setEditText(task.text); // Revert changes on escape
    }
  };

 return (
  <li className="task-item">
    <div className="task-content-wrapper">
      {/* Checkbox for completion status */}
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggleComplete(task.id)}
        className="task-checkbox"
        aria-label={`Mark task "${task.text}" as complete`}
      />
      {isEditing ? (
        // Input field for editing task text
        <input
          ref={inputRef}
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onBlur={handleEditSubmit} // Submit when input loses focus
          onKeyDown={handleKeyDown}
          className="task-edit-btn"
          aria-label={`Edit task "${task.text}"`}
        />
      ) : (
        // Display task text, with strikethrough if completed
        <span
          className={`task-text ${
            task.completed ? 'task-text--completed' : ''
          }`}
          onDoubleClick={() => setIsEditing(true)} // Double-click to edit
          aria-label={`Task: ${task.text}. Double click to edit.`}
        >
          {task.text}
        </span>
      )}
    </div>

    {/* Action buttons */}
    <div className="task-actions">
      {!isEditing && ( // Show edit button only when not editing
        <button
          onClick={() => setIsEditing(true)}
          className="task-edit-btn"
          aria-label={`Edit task "${task.text}"`}
        >
          Edit
        </button>
      )}
      <button
        onClick={() => onDeleteTask(task.id)}
        className="task-delete-btn"
        aria-label={`Delete task "${task.text}"`}
      >
        Delete
      </button>
    </div>
  </li>
);

};

export default TaskItem;
