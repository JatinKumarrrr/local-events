import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar({ user, onLogout }) {
  const navigate = useNavigate();

  const logoutNow = () => {
    if (onLogout) onLogout();
    navigate("/");
  };

  return (
    <nav className="app-nav">
      <div>
        <Link to="/" className="app-brand">
          LocalEvents
        </Link>
      </div>

      <div className="nav-links">
        <Link to="/">Events</Link>

        {user?.role === "organizer" && <Link to="/create">Create</Link>}

        {!user && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}

        {user && (
          <button onClick={logoutNow} className="btn">
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
