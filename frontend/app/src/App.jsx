import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./signup";
import Login from "./login";
import Todo from "./todo";
import Home from "./home";
import Delete from "./delete";
import Assign from "./assign"
import Logout from "./logout"; // adjust path as needed
document.oncontextmenu=()=>{
    //alert("Right click prohibited")
    return false
}
//F12 key
document.onkeydown=e=>{
    if(e.key=="F12")
    {
        // alert("Don't open inspect element")
        return false
    }
    if(e.ctrlKey && e.shiftKey  && e.key == 'C'.charCodeAt(0)){
        return false
    }
    
}

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
                    <Route path="/todo" element={<Todo />} />
                    <Route path="/delete" element={<Delete />} />
                    <Route path="/assign" element={<Assign />} />
                    <Route path="/logout" element={<Logout />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
