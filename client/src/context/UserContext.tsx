import { createContext, useContext, useState } from "react";

interface User {
  username: string;
  password: string;
}

interface UserContextProps {
  user: User | null;
  login: (username: string, password: string) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextProps>({
  user: null,
  login: () => {},
  logout: () => {},
});

const UserProvider: React.FC<UserContextProps> = () => {
  const [user, setUser] = useState<User | null>(null);
  const handleLogin = (username: string, password: string) => {
    // Here you can implement the logic to authenticate the user
    // and set the user state accordingly
    setUser({ username, password });
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider
      value={{ user, login: handleLogin, logout: handleLogout }}
    >
    </UserContext.Provider>
  );
};

const useUserContext = () => useContext(UserContext);

export { UserProvider, useUserContext };