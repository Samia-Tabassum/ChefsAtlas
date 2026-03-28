import axios from "axios";

const API_BASE = "http://127.0.0.1:8000/api";

export async function registerUser(payload) {
  const response = await axios.post(`${API_BASE}/register`, payload, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  return response.data;
}

export async function loginUser(payload) {
  const response = await axios.post(`${API_BASE}/login`, payload, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  return response.data;
}

export async function getCurrentUser(token) {
  const response = await axios.get(`${API_BASE}/me`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export async function logoutUser(token) {
  const response = await axios.post(
    `${API_BASE}/logout`,
    {},
    {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data;
}
