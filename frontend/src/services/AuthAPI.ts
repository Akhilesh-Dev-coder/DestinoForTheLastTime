// src/services/authAPI.ts
import axios from "axios";

const BASE_URL = "http://localhost:1833/api/auth"; // update if deployed

export const authAPI = {
  signup: async (name: string, email: string, password: string) => {
    const response = await axios.post(`${BASE_URL}/register`, { name, email, password });
    return response.data;
  },
  login: async (email: string, password: string) => {
    const response = await axios.post(`${BASE_URL}/login`, { email, password });
    return response.data;
  },
};
