import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const ApiService = {
  get: async (endpoint, params = {}) => {
    try {
      const response = await axios.get(`${API_BASE_URL}${endpoint}`, {
        params,
      });
      return response.data;
    } catch (error) {
      console.error("GET request error:", error);
      throw error;
    }
  },

  post: async (endpoint, data) => {
    try {
      const response = await axios.post(`${API_BASE_URL}${endpoint}`, data);
      return response.data;
    } catch (error) {
      console.error("POST request error:", error);
      throw error;
    }
  },

  put: async (endpoint, data) => {
    try {
      const response = await axios.put(`${API_BASE_URL}${endpoint}`, data);
      return response.data;
    } catch (error) {
      console.error("PUT request error:", error);
      throw error;
    }
  },

  delete: async (endpoint) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}${endpoint}`);
      return response.data;
    } catch (error) {
      console.error("DELETE request error:", error);
      throw error;
    }
  },
};

export default ApiService;
