import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Welcome to the To-Do App ✅</h1>
      <div style={{ marginTop: "30px" }}>
        <Link to="/todo" className="btn">Manage Tasks</Link> &nbsp;
        <Link to="/delete" className="btn">Delete Tasks</Link> &nbsp;
        <Link to="/assign" className="btn">Assign Task</Link> &nbsp;
        <Link to="/logout" className="btn">Logout</Link>
        {/* <Link to="/login" className="btn">Login</Link> */}
      </div>
    </div>
  );
};

export default Home;
