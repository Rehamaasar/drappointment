const API_BASE =
  process.env.REACT_APP_API_URL || "http://localhost:5000";

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

const api = {
  get: (endpoint) => apiRequest(endpoint),
  post: (endpoint, bodyObj) =>
    apiRequest(endpoint, { method: "POST", body: JSON.stringify(bodyObj) }),
  put: (endpoint, bodyObj) =>
    apiRequest(endpoint, { method: "PUT", body: JSON.stringify(bodyObj) }),
  delete: (endpoint) => apiRequest(endpoint, { method: "DELETE" }),
};

export default api;
