const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export const apiClient = {
  request: async (endpoint, options = {}) => {
    const url = `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

    const defaultHeaders = {
      'Content-Type': 'application/json',
    };

    const config = {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
      credentials: 'include', // Include HTTP-only cookies
    };

    if (options.body && typeof options.body === 'object') {
      config.body = JSON.stringify(options.body);
    }

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        const error = new Error(data.message || 'An API error occurred');
        error.status = response.status;
        error.code = data.code;
        error.data = data;
        throw error;
      }

      return data;
    } catch (err) {
      if (!err.status) {
        console.warn(`[API Client Network Error] ${endpoint}:`, err.message);
      }
      throw err;
    }
  },

  get: (endpoint, options = {}) => {
    return apiClient.request(endpoint, { ...options, method: 'GET' });
  },

  post: (endpoint, body, options = {}) => {
    return apiClient.request(endpoint, { ...options, method: 'POST', body });
  },

  delete: (endpoint, options = {}) => {
    return apiClient.request(endpoint, { ...options, method: 'DELETE' });
  },
};
