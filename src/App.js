import react, { useState } from 'react';
import AddTaskForm from './components/AddTaskForm/AddTaskForm';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("All");


  const addTask = (newtask) => {
    setTasks([...tasks, { ...newtask, id: tasks.length + 1 }]);
    toast.success("Task Added!");
  }
  return (
    <div className="App">
      <h1>Task Manager</h1>
      <AddTaskForm addTask={addTask} />
      <div className="filter-container">
        <label>Filter by Status: </label>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="All">All</option>
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
