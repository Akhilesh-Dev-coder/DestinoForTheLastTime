import axios from "axios";
import { useNavigate } from "react-router-dom";

const BASE_URL = "http://localhost:5000/api/auth"; 

export const authAPI = {
  signup: async (name: string, email: string, password: string) => {
    const response = await axios.post(`${BASE_URL}/register`, {
      username: name,
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
  verifyToken: async (token) => {
    const response = await axios.get(`${BASE_URL}/verify-token`, { 
      headers : { 
        Authorization : `Bearer ${token}` 
      } 
    });
    return response.data;
  },
  logout: () => {
    localStorage.clear();
    alert('Logged Out Successfully...redirecting to login page');
    window.location.href = 'http://localhost:8080/login';
  }
};