import { LoginDto } from 'views/login/login-form/types';
import { apiClient } from './api';

export const authenticate = async (data: LoginDto) => {
  const response = await apiClient.post('/auth/login', data);
  return response.data;
};
