// CreateTask.js
import axios from "axios";
import { useState } from "react";

const CreateTask = () => {
  const [task, setTask] = useState({
    title: "",
    description: "",
    due_date: "",
    assignee: "", // optional
  });

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleCreate = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post("http://127.0.0.1:8000/api/tasks/create/", task, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Task Created Successfully");
    } catch (err) {
      console.error(err);
      alert("Failed to create task");
    }
  };

  return (
    <div>
      <input name="title" onChange={handleChange} placeholder="Title" />
      <input name="description" onChange={handleChange} placeholder="Description" />
      <input name="due_date" type="date" onChange={handleChange} />
      <input name="assignee" onChange={handleChange} placeholder="Assignee ID" />
      <button onClick={handleCreate}>Create Task</button>
    </div>
  );
};

export default CreateTask;
