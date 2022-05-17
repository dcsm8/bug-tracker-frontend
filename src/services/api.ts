import axios from 'axios';

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem('access_token');
    config.headers = {
      Authorization: `Bearer ${accessToken}`,
    };
    return config;
  },
  (error) => {
    Promise.reject(error);
  },
);

apiClient.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    const originalConfig = error.config;
    if (originalConfig.url !== '/auth/login' && error.response) {
      if (error.response.status === 401) {
        localStorage.removeItem('access_token');
        return (window.location.href = '/login');
      }
    }
  },
);
