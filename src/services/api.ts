import axios from 'axios';
import { parseJwt } from 'utils/local-storage';

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
