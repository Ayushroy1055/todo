import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:8000/api/todos/";

const Home = () => {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);

  // Load todos from backend on page load
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
      const response = await axios.post(API_URL, {
        text: task,
        done: false
      });
      setTodos([...todos, response.data]);
      setTask("");
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}${id}/`);
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
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
    <div className="home-container" style={{ textAlign: "center", padding: "20px" }}>
      <h1>📝 My To-Do List</h1>

      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Enter a new task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          style={{ padding: "10px", width: "250px" }}
        />
        <button onClick={handleAdd} style={{ marginLeft: "10px", padding: "10px 20px" }}>
          Add
        </button>
      </div>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {todos.map((todo) => (
          <li key={todo.id} style={{ margin: "10px 0" }}>
            <span
              onClick={() => toggleDone(todo)}
              style={{
                textDecoration: todo.done ? "line-through" : "none",
                cursor: "pointer",
                marginRight: "10px"
              }}
            >
              {todo.text}
            </span>
            <button onClick={() => handleDelete(todo.id)} style={{ color: "red" }}>
              Delete
            </button>
          </li>
        ))}
      </ul>

      <div className="buttons" style={{ marginTop: "40px" }}>
        <Link to="/signup" className="btn">Sign Up</Link> &nbsp;
        <Link to="/login" className="btn">Login</Link>
      </div>
    </div>
  );
};

export default Home;
