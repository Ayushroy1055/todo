import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_LOGOUT_URL = "http://127.0.0.1:8000/api/logout/";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      const token = localStorage.getItem("token");

      if (token) {
        axios
          .post(
            API_LOGOUT_URL,
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((response) => {
            console.log("Logout successful:", response.data);
            localStorage.removeItem("token");
            navigate("/login");
          })
          .catch((error) => {
            console.error("Error during logout:", error);
            // Still remove token and redirect to login for safety
            localStorage.removeItem("token");
            navigate("/login");
          });
      } else {
        // No token found, redirect to login anyway
        navigate("/login");
      }
    } else {
      // Cancel logout, redirect back to home
      navigate("/");
    }
  }, [navigate]);

  return null;
};

export default Logout;
