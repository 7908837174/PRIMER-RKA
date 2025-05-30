import { CustomError } from "@/types/custom-error.type";
import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL || '/api';

const options = {
  baseURL,
  withCredentials: true,
  timeout: 15000, // Increased timeout
};

const API = axios.create(options);

// Add request interceptor for debugging
API.interceptors.request.use(
  (config) => {
    // Log request for debugging
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

API.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    // Handle case where response doesn't exist
    if (!error.response) {
      console.error('Network Error:', error.message);
      const customError: CustomError = {
        ...error,
        message: 'Network error. Please check your connection and try again.',
        errorCode: 'NETWORK_ERROR',
      };
      return Promise.reject(customError);
    }

    const { data, status } = error.response;

    // Handle unauthorized errors
    if ((data === "Unauthorized" || status === 401) && window.location.pathname !== '/') {
      console.log('Unauthorized access detected, redirecting to login page');
      window.location.href = "/";
      return Promise.reject(new Error('Session expired. Please log in again.'));
    }

    // Create a custom error with more information
    const customError: CustomError = {
      ...error,
      message: data?.message || error.message || 'An unknown error occurred',
      errorCode: data?.errorCode || "UNKNOWN_ERROR",
    };

    console.error('API Response Error:', {
      status,
      url: error.config?.url,
      message: customError.message,
      errorCode: customError.errorCode
    });

    return Promise.reject(customError);
  }
);

export default API;