import { parseJwt } from '@utils/local-storage';
import { createContext, useContext, useEffect, useState } from 'react';

const getCurrentUser = (accessToken) => {
  return parseJwt(accessToken);
};

const initialState = {
  user: {},
  accessToken: undefined,
};

const UserContext = createContext(initialState);

export function UserProvider({ children }) {
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem('access_token'),
  );
  const [user, setUser] = useState({});

  function handleAccessTokenChange() {
    if (!user.username && accessToken) {
      localStorage.setItem('access_token', accessToken);
      const user = getCurrentUser(accessToken);
      setUser(user);
    } else if (!accessToken) {
      // Log Out
      localStorage.removeItem('access_token');
      setUser({});
    }
  }

  useEffect(() => {
    handleAccessTokenChange();
  }, [accessToken]);

  return (
    <UserContext.Provider value={{ user, accessToken, setAccessToken }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
