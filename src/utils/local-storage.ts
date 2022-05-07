export const isLogin = (): boolean => {
  return localStorage.getItem('currentUser') ? true : false;
};

export const saveToken = (token: string) => {
  localStorage.setItem('currentUser', token);
};

export const getCurrentUser = () => {
  const token = localStorage.getItem('currentUser');
  if (token) {
    return parseJwt(token);
  } else {
    return null;
  }
};

export const logout = () => {
  localStorage.removeItem('currentUser');
};

export const parseJwt = (token: string) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};
