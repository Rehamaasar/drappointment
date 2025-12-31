const API_BASE = "http://localhost:5000";

export async function apiRequest(endpoint, options = {}) {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_BASE}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    ...options,
  });

  const data = await res.json();
  if (!res.ok) throw data;
  return data;
}

// ✅ Default export to support: import api from "../api";
const api = {
  get: (endpoint) => apiRequest(endpoint),
  post: (endpoint, bodyObj) =>
    apiRequest(endpoint, { method: "POST", body: JSON.stringify(bodyObj) }),
  put: (endpoint, bodyObj) =>
    apiRequest(endpoint, { method: "PUT", body: JSON.stringify(bodyObj) }),
  delete: (endpoint) => apiRequest(endpoint, { method: "DELETE" }),
};

export default api;
