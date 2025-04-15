import React, { useState, useEffect } from "react";
import axios from "axios";

//const API_URL = "http://localhost:8000/api/profile/";

const Todo = () => {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get(API_URL);
      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const handleAdd = async () => {
    if (task.trim() === "") return;
    try {
      const response = await axios.post(API_URL, { text: task, done: false });
      setTodos([...todos, response.data]);
      setTask("");
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const toggleDone = async (todo) => {
    try {
      const updatedTodo = { ...todo, done: !todo.done };
      const response = await axios.put(`${API_URL}${todo.id}/`, updatedTodo);
      setTodos(todos.map((t) => (t.id === todo.id ? response.data : t)));
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>Create/View Tasks</h2>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Enter task"
        style={{ padding: "10px", width: "250px" }}
      />
      <button onClick={handleAdd} style={{ marginLeft: "10px", padding: "10px 20px" }}>
        Add
      </button>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {todos.map((todo) => (
          <li key={todo.id} style={{ margin: "10px 0" }}>
            <span
              onClick={() => toggleDone(todo)}
              style={{
                textDecoration: todo.done ? "line-through" : "none",
                cursor: "pointer"
              }}
            >
              {todo.text}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;
