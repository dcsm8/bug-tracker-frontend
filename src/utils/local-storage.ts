export const isLogin = (): boolean => {
  return localStorage.getItem('access_token') ? true : false;
};

export const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};
