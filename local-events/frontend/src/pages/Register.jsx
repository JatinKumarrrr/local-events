import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/api";

export default function Register({ onRegister }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/register", { name, email, password, role });
      const userObj = {
        id: res.user.id || res.user._id,
        name: res.user.name,
        role: res.user.role,
        email: res.user.email,
      };
      if (onRegister) onRegister(userObj, res.token);
      nav("/");
    } catch (err) {
      alert(err.data?.msg || err.message);
    }
  };

  return (
    <main style={{ padding: "20px 12px" }}>
      <div className="form-card" role="form" aria-label="register form">
        <h2 style={{ marginTop: 0 }}>Register</h2>

        <form onSubmit={submit}>
          <label htmlFor="reg-name">Name</label>
          <input
            id="reg-name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
          />

          <label htmlFor="reg-email">Email</label>
          <input
            id="reg-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />

          <label htmlFor="reg-password">Password</label>
          <input
            id="reg-password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
          />

          <label htmlFor="reg-role">Role</label>
          <select
            id="reg-role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            aria-label="role"
          >
            <option value="user">User</option>
            <option value="organizer">Organizer</option>
          </select>

          <div style={{ marginTop: 12 }}>
            <button type="submit" className="btn">
              Register
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
