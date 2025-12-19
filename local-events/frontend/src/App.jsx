
import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Events from "./pages/Events";
import EventDetails from "./pages/EventDetails";
import Register from "./pages/Register";
import Login from "./pages/Login";
import CreateEvent from "./pages/CreateEvent";



export default function App() {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem("user");
    return raw ? JSON.parse(raw) : null;
  });

  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  }, [user]);

  const handleLogin = (userObj, token) => {
    localStorage.setItem("token", token);
    setUser(userObj);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <>
      <Navbar user={user} onLogout={handleLogout} />
      <main style={{ maxWidth: 980, margin: "24px auto", padding: "0 16px" }}>
        <Routes>
          <Route path="/" element={<Events />} />
          <Route path="/events/:id" element={<EventDetails user={user} />} />
          <Route path="/register" element={<Register onRegister={handleLogin} />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/create" element={<CreateEvent user={user} />} />
        </Routes>
      </main>
    </>
  );
}
