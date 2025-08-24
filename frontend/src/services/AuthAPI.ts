// src/services/authAPI.ts
import axios from "axios";

const BASE_URL = "http://localhost:5000/api/auth"; // ✅ Confirm port (was 1833?)

export const authAPI = {
  signup: async (name: string, email: string, password: string) => {
    const response = await axios.post(`${BASE_URL}/register`, {
      username: name, // ←←← Fixed: was "name", should map to "username"
      email,
      password,
    });
    return response.data;
  },
  login: async (email: string, password: string) => {
    const response = await axios.post(`${BASE_URL}/login`, {
      email,
      password,
    });
    return response.data;
  },
  verifyToken: async () => {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${BASE_URL}/verify-token`, { headers : { Authorization : `Bearer ${token}` } });
    return response.data;
  }
};