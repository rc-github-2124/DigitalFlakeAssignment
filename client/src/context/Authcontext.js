import React, { createContext, useState, useContext, useEffect } from "react";
import axios from 'axios';

// Creating AuthContext to manage authentication state
const AuthContext = createContext();

// Custom hook to easily access AuthContext data
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Store user data
  const [token, setToken] = useState(localStorage.getItem("token") || null); // Store JWT token

  // Check if user is already logged in using the token in localStorage
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`; // Set token in axios headers for future requests
      axios.get('http://localhost:8000/api/auth/current-user') // Backend route to get user details (replace with your backend route)
        .then(response => setUser(response.data)) // If user is found, update the user state
        .catch(error => {
          console.error("Error fetching user data:", error);
          setUser(null);
          setToken(null);
          localStorage.removeItem("token"); // Clear the token from localStorage if there’s an error
        });
    }
  }, [token]); // Re-run this effect when the token changes

  // Login function to authenticate the user
  const login = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:8000/api/auth/login', { email, password }); // POST request for login
      const { token, user } = response.data; // Destructure token and user from response
      setToken(token); // Store token in state
      setUser(user); // Store user in state
      localStorage.setItem("token", token); // Store token in localStorage for persistence
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`; // Set Authorization header for future requests
    } catch (error) {
      console.error("Login failed:", error); // Handle login failure
    }
  };

  // Logout function to remove authentication data
const logout = async () => {
  try {
      await axios.post('http://localhost:8000/api/auth/logout'); // Call the logout endpoint
      setUser(null); // Clear user data
      setToken(null); // Clear token
      localStorage.removeItem("token"); // Remove token from localStorage
      delete axios.defaults.headers.common["Authorization"]; // Remove Authorization header from Axios
  } catch (error) {
      console.error("Logout failed:", error); // Handle logout failure
  }
};

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children} {/* Render children components that are wrapped with AuthProvider */}
    </AuthContext.Provider>
  );
};
