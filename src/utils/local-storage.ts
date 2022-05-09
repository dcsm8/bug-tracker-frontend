export const isLogin = (): boolean => {
  return localStorage.getItem('access_token') ? true : false;
};
