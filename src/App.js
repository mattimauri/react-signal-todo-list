import React, { useState } from "react";
import { signal } from "@preact/signals-react";
import "./App.css";
import { StyledTask } from "./App.styled";

const scrollSignal = signal();

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, newTask]);
      setNewTask("");
    }
  };

  const removeTask = (index) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };

  const handleScroll = () => {
    // Emit signal on scroll
    scrollSignal.emit();
  };

  return (
    <div className="App" onScroll={handleScroll}>
      <h1>Todo List with Signal</h1>
      <div>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      <ul>
        {tasks.map((task, index) => (
          <StyledTask key={index}>
            {task}
            <button className="addBtn" onClick={() => removeTask(index)}>
              ❌
            </button>
          </StyledTask>
        ))}
      </ul>
    </div>
  );
}

export default App;
