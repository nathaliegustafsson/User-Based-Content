import { createContext, useContext, useEffect, useState } from "react";

interface User {
  username: string;
  password: string;
}

interface Props {
  children: React.ReactNode;
}

interface UserContextProps {
  user: User | null;
  login: (username: string, password: string) => void;
  logout: () => void;
  register: (username: string, password: string) => void;
}

const UserContext = createContext<UserContextProps>({
  user: null,
  login: () => {},
  logout: () => {},
  register: () => {},
});

export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`/api/users/auth`);
        if (!response.ok) {
          throw new Error("Failed to fetch user information");
        }
        const userResponse = await response.json();
        setUser(userResponse);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, []);

  const RegisterUser = async (username: string, password: string) => {
    try {
      const response = await fetch("/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (!response.ok) {
        throw new Error("Failed to register user");
      }
      const user = await response.json();
      setUser(user);
      // LogInUser(user.username, user.password);
      return user;
    } catch (error: any) {
      throw new Error(error.message || "Failed to register user");
    }
  };

  const LogInUser = async (username: string, password: string) => {
    try {
      const response = await fetch("/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (!response.ok) {
        throw new Error("Failed to log in user");
      }
      const user = await response.json();
      setUser(user);
      return user;
    } catch (error: any) {
      throw new Error(error.message || "Failed to log in user");
    }
  };

  const LogoutUser = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        register: RegisterUser,
        login: LogInUser,
        logout: LogoutUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
