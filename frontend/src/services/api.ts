import axios from 'axios';

// Base API configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';


const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for authentication
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Authentication APIs
export const authAPI = {
  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },
  
  signup: async (name: string, email: string, password: string) => {
    const response = await api.post('/auth/signup', { name, email, password });
    return response.data;
  },
  
  forgotPassword: async (email: string) => {
    const response = await api.post('/auth/forgot-password', { email });
    return response.data;
  },
  
  adminLogin: async (email: string, password: string) => {
    const response = await api.post('/auth/admin-login', { email, password });
    return response.data;
  },
};

// Travel Planning APIs
export const travelAPI = {
  createTravelPlan: async (planData: {
    startLocation: string;
    destination: string;
    travelMode: string;
    departureDate: string;
    travelers: string;
  }) => {
    const response = await api.post('/travel/create-plan', planData);
    return response.data;
  },
  
  getTravelResults: async (planId: string) => {
    const response = await api.get(`/travel/results/${planId}`);
    return response.data;
  },
  
  getDestinations: async () => {
    const response = await api.get('/travel/destinations');
    return response.data;
  },
  
  getHotels: async (destination: string) => {
    const response = await api.get(`/travel/hotels?destination=${destination}`);
    return response.data;
  },
  
  getRestaurants: async (destination: string) => {
    const response = await api.get(`/travel/restaurants?destination=${destination}`);
    return response.data;
  },
  
  getAttractions: async (destination: string) => {
    const response = await api.get(`/travel/attractions?destination=${destination}`);
    return response.data;
  },
  
  getWeather: async (destination: string) => {
    const response = await api.get(`/travel/weather?destination=${destination}`);
    return response.data;
  },
};

// Admin APIs
export const adminAPI = {
  // User management
  getUsers: async () => {
    const response = await api.get('/admin/users');
    return response.data;
  },
  
  createUser: async (userData: any) => {
    const response = await api.post('/admin/users', userData);
    return response.data;
  },
  
  updateUser: async (userId: string, userData: any) => {
    const response = await api.put(`/admin/users/${userId}`, userData);
    return response.data;
  },
  
  deleteUser: async (userId: string) => {
    const response = await api.delete(`/admin/users/${userId}`);
    return response.data;
  },
  
  // Destination management
  getDestinationsAdmin: async () => {
    const response = await api.get('/admin/destinations');
    return response.data;
  },
  
  createDestination: async (destinationData: any) => {
    const response = await api.post('/admin/destinations', destinationData);
    return response.data;
  },
  
  updateDestination: async (destinationId: string, destinationData: any) => {
    const response = await api.put(`/admin/destinations/${destinationId}`, destinationData);
    return response.data;
  },
  
  deleteDestination: async (destinationId: string) => {
    const response = await api.delete(`/admin/destinations/${destinationId}`);
    return response.data;
  },
  
  // Hotel management
  getHotelsAdmin: async () => {
    const response = await api.get('/admin/hotels');
    return response.data;
  },
  
  createHotel: async (hotelData: any) => {
    const response = await api.post('/admin/hotels', hotelData);
    return response.data;
  },
  
  updateHotel: async (hotelId: string, hotelData: any) => {
    const response = await api.put(`/admin/hotels/${hotelId}`, hotelData);
    return response.data;
  },
  
  deleteHotel: async (hotelId: string) => {
    const response = await api.delete(`/admin/hotels/${hotelId}`);
    return response.data;
  },
  
  // Restaurant management
  getRestaurantsAdmin: async () => {
    const response = await api.get('/admin/restaurants');
    return response.data;
  },
  
  createRestaurant: async (restaurantData: any) => {
    const response = await api.post('/admin/restaurants', restaurantData);
    return response.data;
  },
  
  updateRestaurant: async (restaurantId: string, restaurantData: any) => {
    const response = await api.put(`/admin/restaurants/${restaurantId}`, restaurantData);
    return response.data;
  },
  
  deleteRestaurant: async (restaurantId: string) => {
    const response = await api.delete(`/admin/restaurants/${restaurantId}`);
    return response.data;
  },
  
  // Attraction management
  getAttractionsAdmin: async () => {
    const response = await api.get('/admin/attractions');
    return response.data;
  },
  
  createAttraction: async (attractionData: any) => {
    const response = await api.post('/admin/attractions', attractionData);
    return response.data;
  },
  
  updateAttraction: async (attractionId: string, attractionData: any) => {
    const response = await api.put(`/admin/attractions/${attractionId}`, attractionData);
    return response.data;
  },
  
  deleteAttraction: async (attractionId: string) => {
    const response = await api.delete(`/admin/attractions/${attractionId}`);
    return response.data;
  },
  
  // Dashboard stats
  getDashboardStats: async () => {
    const response = await api.get('/admin/stats');
    return response.data;
  },
};

export default api;