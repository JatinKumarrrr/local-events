import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import Landing from "./pages/Landing";
import Events from "./pages/Events";
import EventDetails from "./pages/EventDetails";
import Register from "./pages/Register";
import Login from "./pages/Login";
import CreateEvent from "./pages/CreateEvent";

export default function App() {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem("user");
    console.log("🔐 App initialized - User from localStorage:", raw ? JSON.parse(raw) : null);
    return raw ? JSON.parse(raw) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      console.log("💾 User saved to localStorage:", user);
    } else {
      localStorage.removeItem("user");
      console.log("🗑️ User removed from localStorage");
    }
  }, [user]);

  const handleLogin = (userObj, token) => {
    console.log("✅ Login successful - User:", userObj, "Token:", token);
    localStorage.setItem("token", token);
    setUser(userObj);
  };

  const handleLogout = () => {
    console.log("🚪 Logout triggered");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AppLayout user={user} onLogout={handleLogout}>
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<Landing />} />
        
        {/* Events Routes */}
        <Route path="/events" element={<Events />} />
        <Route path="/events/:id" element={<EventDetails user={user} />} />
        <Route path="/events/create" element={<CreateEvent user={user} />} />
        
        {/* Auth Routes */}
        <Route path="/register" element={<Register onRegister={handleLogin} />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
      </Routes>
    </AppLayout>
  );
}
