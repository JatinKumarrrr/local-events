import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import AuthLayout from "./layouts/AuthLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Events from "./pages/Events";
import EventDetails from "./pages/EventDetails";
import Register from "./pages/Register";
import Login from "./pages/Login";
import CreateEvent from "./pages/CreateEvent";
import EditEvent from "./pages/EditEvent";

export default function App() {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem("user");
    console.log(
      "🔐 App initialized - User from localStorage:",
      raw ? JSON.parse(raw) : null
    );
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
    <Routes>
      {/* Public Landing Page - AppLayout */}
      <Route
        path="/"
        element={
          <AppLayout user={user} onLogout={handleLogout}>
            <Landing />
          </AppLayout>
        }
      />

      {/* Auth Routes - AuthLayout */}
      <Route
        path="/register"
        element={
          <AuthLayout>
            <Register onRegister={handleLogin} />
          </AuthLayout>
        }
      />

      <Route
        path="/login"
        element={
          <AuthLayout>
            <Login onLogin={handleLogin} />
          </AuthLayout>
        }
      />

      {/* Protected Dashboard Routes - DashboardLayout */}
      <Route
        path="/dashboard"
        element={
          user ? (
            <DashboardLayout user={user} onLogout={handleLogout}>
              <Dashboard user={user} />
            </DashboardLayout>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      <Route
        path="/events"
        element={
          user ? (
            <DashboardLayout user={user} onLogout={handleLogout}>
              <Events />
            </DashboardLayout>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      <Route
        path="/events/:id"
        element={
          user ? (
            <DashboardLayout user={user} onLogout={handleLogout}>
              <EventDetails user={user} />
            </DashboardLayout>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      <Route
        path="/events/create"
        element={
          user?.role === "organizer" ? (
            <DashboardLayout user={user} onLogout={handleLogout}>
              <CreateEvent user={user} />
            </DashboardLayout>
          ) : (
            <Navigate to="/dashboard" replace />
          )
        }
      />
      <Route
        path="/events/:id/edit"
        element={
          user?.role === "organizer" ? (
            <DashboardLayout user={user} onLogout={handleLogout}>
              <EditEvent user={user} />
            </DashboardLayout>
          ) : (
            <Navigate to="/dashboard" replace />
          )
        }
      />

      <Route
        path="/my-rsvps"
        element={
          user ? (
            <DashboardLayout user={user} onLogout={handleLogout}>
              <div className="text-center py-16">
                <h1 className="text-3xl font-display font-bold text-slate-900 mb-4">
                  My RSVPs
                </h1>
                <p className="text-slate-600">
                  Coming soon! You'll see all your event bookings here.
                </p>
              </div>
            </DashboardLayout>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
    </Routes>
  );
}
