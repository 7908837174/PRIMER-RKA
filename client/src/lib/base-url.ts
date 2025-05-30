// Default to '/api' if the environment variable is not set
export const baseURL = import.meta.env.VITE_API_BASE_URL || '/api';

// Log the base URL for debugging
console.log('API Base URL:', baseURL);