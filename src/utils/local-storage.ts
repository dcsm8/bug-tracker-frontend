import { User } from './../interfaces/user-interface';
import jwtDecode from 'jwt-decode';

export const isLogin = (): boolean => {
  return localStorage.getItem('access_token') ? true : false;
};

export const parseJwt = (token): Partial<User | null> => {
  try {
    return jwtDecode(token);
  } catch (e) {
    return null;
  }
};
