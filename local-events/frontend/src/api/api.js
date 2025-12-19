// src/api/api.js
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

function getToken() {
  return localStorage.getItem("token");
}

async function request(path, opts = {}) {
  const url = `${API_BASE}${path}`;
  const headers = opts.headers || {};
  headers["Content-Type"] = "application/json";
  const token = getToken();
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(url, { ...opts, headers });
  const text = await res.text();
  const data = text ? JSON.parse(text) : null;
  if (!res.ok) {
    const err = new Error(data?.msg || "API error");
    err.status = res.status;
    err.data = data;
    throw err;
  }
  return data;
}

export const api = {
  get: (p) => request(p, { method: "GET" }),
  post: (p, body) => request(p, { method: "POST", body: JSON.stringify(body) }),
  put: (p, body) => request(p, { method: "PUT", body: JSON.stringify(body) }),
  del: (p) => request(p, { method: "DELETE" }),
};
