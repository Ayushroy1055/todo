import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {disableReactDevTools} from '@fvilers/disable-react-devtools'

//Right Click
// document.oncontextmenu=()=>{
//     //alert("Right click prohibited")
//     return false
// }
// //F12 key
// document.onkeydown=e=>{
//     if(e.key=="F12")
//     {
//         // alert("Don't open inspect element")
//         return false
//     }
//     if(e.ctrlKey && e.shiftKey  && e.key == 'C'.charCodeAt(0)){
//         return false
//     }
    
// }


// Only disable in production
if (process.env.NODE_ENV === 'production') {
    disableReactDevTools();
  }

const Login = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const navigate = useNavigate(); // This must be inside the component
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await fetch("http://127.0.0.1:8000/api/login/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (response.ok) {
            alert("Login successful!");
            localStorage.setItem("token", data.token); // Save auth token
            navigate("/home");
        } else {
            alert(data.detail || data.message || "Login failed");
        }
    } catch (error) {
        console.error("Fetch error:", error);
        alert("Failed to connect to server. Please check your backend.");
    }
};

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h2>Login</h2>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    required
                    value={formData.username}
                    onChange={handleChange}
                    style={{ margin: "5px", padding: "8px" }}

                />
                <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                required
                value={formData.phone}
                onChange={handleChange}
                style={{ margin: "5px", padding: "8px" }}
            />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    style={{ margin: "5px", padding: "8px" }}
                />
                <button type="submit" style={{ margin: "10px", padding: "10px 20px", cursor: "pointer" }}>Login</button>
            </form>
            <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
        </div>
    );
};

export default Login;
