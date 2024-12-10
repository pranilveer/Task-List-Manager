import react, { useState, useEffect } from 'react';
import AddTaskForm from './components/AddTaskForm/AddTaskForm';
import TaskTable from './components/TaskTable/TaskTable';
import { fetchTasks } from "./api/fetchTasks";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const loadTasks = async () => {
        const data = await fetchTasks();
        setTasks(data);
    };
    loadTasks();
}, []);

  const addTask = (newtask) => {
    setTasks([...tasks, { ...newtask, id: tasks.length + 1 }]);
    toast.success("Task Added!");
  }

  const updateTask = (updatedTask) => {
    setTasks(tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)));
    toast.success("Task updated!");
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
    toast.error("Task deleted!");
  };

  const filteredTasks =
    filter === "All"
      ? tasks
      : tasks.filter((task) => task.status === filter);

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
      <TaskTable tasks={filteredTasks} updateTask={updateTask} deleteTask={deleteTask} />
      <ToastContainer />
    </div>
  );
}

export default App;
