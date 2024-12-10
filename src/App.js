import react, { useState } from 'react';
import AddTaskForm from './components/AddTaskForm/AddTaskForm';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([]);

  const addTask = (newtask) => {
    setTasks([...tasks, { ...newtask, id: tasks.length + 1 }]);
    toast.success("Task Added!");
  }
  return (
    <div className="App">
      <h1>Task Manager</h1>
      <AddTaskForm addTask={addTask} />
      <ToastContainer />
    </div>
  );
}

export default App;
