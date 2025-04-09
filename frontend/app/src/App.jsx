import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./signup";
import Login from "./login";
import Home from "./home";

const App = () => {
    return (
        <Router>
            <div style={{ textAlign: "center", marginTop: "50px" }}>
                <h1>Welcome to the Authentication System</h1>
                <Routes>
                    <Route path="/" element={<Login />} />         {/* Default route = login */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="*" element={<h2>404 Not Found</h2>} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
