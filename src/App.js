// Importez les bibliothèques nécessaires
import React, { useState } from 'react';
import { createStore } from 'redux';
import { Provider, useDispatch, useSelector } from 'react-redux';

// Actions
const ADD_TASK = 'ADD_TASK';
const TOGGLE_TASK = 'TOGGLE_TASK';
const FILTER_TASKS = 'FILTER_TASKS';

// Action Creators
const addTask = (description) => ({ type: ADD_TASK, payload: { description } });
const toggleTask = (id) => ({ type: TOGGLE_TASK, payload: { id } });
const filterTasks = (status) => ({ type: FILTER_TASKS, payload: { status } });

// Reducer
const initialState = { tasks: [] };

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TASK:
      return { tasks: [...state.tasks, { id: state.tasks.length + 1, description: action.payload.description, isDone: false }] };

    case TOGGLE_TASK:
      return { tasks: state.tasks.map(task => (task.id === action.payload.id ? { ...task, isDone: !task.isDone } : task)) };

    case FILTER_TASKS:
      return state; // You can implement filtering logic here if needed

    default:
      return state;
  }
};

// Create Redux store
const store = createStore(todoReducer);

// App Component
function App() {
  return (
    <Provider store={store}>
      <TaskManager />
    </Provider>
  );
}

// TaskManager Component
function TaskManager() {
  const dispatch = useDispatch();
  const tasks = useSelector(state => state.tasks);

  const addNewTask = (description) => {
    dispatch(addTask(description));
  };

  const toggleTaskStatus = (id) => {
    dispatch(toggleTask(id));
  };

  const filterTasksByStatus = (status) => {
    dispatch(filterTasks(status));
  };

  return (
    <div>
      <AddTask onAddTask={addNewTask} />
      <TaskList tasks={tasks} onToggleTaskStatus={toggleTaskStatus} />
      {/* Add filter component and functionality */}
    </div>
  );
}

// AddTask Component
function AddTask({ onAddTask }) {
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const dispatch = useDispatch();

  const handleAddTask = () => {
    if (newTaskDescription.trim() !== "") {
      onAddTask(newTaskDescription);
      setNewTaskDescription("");
    }
  };

  return (
    <div>
      <input
        type="text"
        value={newTaskDescription}
        onChange={(e) => setNewTaskDescription(e.target.value)}
      />
      <button onClick={handleAddTask}>Add Task</button>
    </div>
  );
}

// TaskList Component
function TaskList({ tasks, onToggleTaskStatus }) {
  return (
    <ul>
      {tasks.map((task) => (
        <Task key={task.id} task={task} onToggleTaskStatus={onToggleTaskStatus} />
      ))}
    </ul>
  );
}

// Task Component
function Task({ task, onToggleTaskStatus }) {
  return (
    <li>
      <input
        type="checkbox"
        checked={task.isDone}
        onChange={() => onToggleTaskStatus(task.id)}
      />
      <span>{task.description}</span>
    </li>
  );
}

export default App;
