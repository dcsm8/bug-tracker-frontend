import { User } from '@interfaces/user-interface';
import { parseJwt } from '@utils/local-storage';
import { createContext, useContext, useEffect, useState } from 'react';

interface UserContextInterface {
  user: Partial<User>;
  accessToken: string | null;
  setAccessToken: React.Dispatch<React.SetStateAction<string | null>>;
}

const initialState = {
  user: {},
  accessToken: null,
};

const UserContext = createContext<Partial<UserContextInterface>>(initialState);

export function UserProvider({ children }) {
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem('access_token'),
  );
  const [user, setUser] = useState<Partial<User>>({});

  function handleAccessTokenChange() {
    if (!user.username && accessToken) {
      localStorage.setItem('access_token', accessToken);
      const user = parseJwt(accessToken);
      if (user) {
        setUser(user);
      }
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
