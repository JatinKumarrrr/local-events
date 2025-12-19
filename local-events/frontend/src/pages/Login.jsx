import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/api";

export default function Login({ onLogin }) {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { email, password });

      const userObj = {
        id: res.user.id || res.user._id,
        name: res.user.name,
        role: res.user.role,
        email: res.user.email,
      };

      if (onLogin) onLogin(userObj, res.token);
      nav("/");
    } catch (err) {
      alert(err.data?.msg || err.message);
    }
  };

  return (
    <main style={{ padding: "20px 12px" }}>
      <div className="form-card" role="form" aria-label="login form">
        <h2 style={{ marginTop: 0 }}>Login</h2>

        <form onSubmit={submit}>
          <label htmlFor="login-email">Email</label>
          <input
            id="login-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />

          <label htmlFor="login-password">Password</label>
          <input
            id="login-password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />

          <div style={{ marginTop: 12 }}>
            <button type="submit" className="btn">
              Login
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
