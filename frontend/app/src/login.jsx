import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { encryptData, decryptData } from "./crypto"; // Import encryption utilities

const Login = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Encrypt formData before sending
            const encryptedPayload = encryptData(formData);

            const response = await fetch("http://127.0.0.1:8000/api/login/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ encrypted_data: encryptedPayload }),
            });

            const data = await response.json();

            if (response.ok) {
                // Decrypt response
                const decryptedResponse = decryptData(data.encrypted_response);

                alert("Login successful!");
                localStorage.setItem("token", decryptedResponse.token); // Save decrypted token
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
