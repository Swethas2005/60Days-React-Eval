import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./Navbar.css";
import Home from "../pages/Home";
import Login from "../pages/Login";
import ProductDetails from "../pages/ProductDetails";

function Navbar() {
  const { isAuthenticated, email, logout } = useContext(AuthContext);

  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px", backgroundColor: "#f0f0f0" }}>
      <div>
        <Link to="/">Home</Link>
        {isAuthenticated && <p style={{ margin: "0", marginLeft: "10px" }}>{email}</p>}
      </div>
      
      <div>
        {isAuthenticated ? (
          <button onClick={logout} style={{ padding: "10px", borderRadius: "5px", border: "none", backgroundColor: "#dc3545", color: "#fff", cursor: "pointer" }}>Logout</button>
        ) : (
          <Link to="/login" style={{ textDecoration: "none", padding: "10px", borderRadius: "5px", border: "1px solid #007bff", backgroundColor: "#007bff", color: "#fff", cursor: "pointer" }}>Login</Link>

        )}
      </div>
      <div>

        <Link to ="/product-details">Product Details</Link>
      </div>
    </div>
  );
}

export default Navbar;
