import { createContext, useState, ReactNode, useEffect } from "react";
import { secureStorage } from "../../utils/secureStorage";

type User = {
  id: string;
  name: string;
  email: string;
  role: "admin" | "teacher";
  phone_number: string;
  token: string | null;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  updateUser: (updatedUser: User | null) => void;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  updateUser: () => {},
  loading: true,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const storedUser = secureStorage.getItem("user");
    if (storedUser) {
      console.log("setting stored user", storedUser);
      setUser(storedUser);
    }
  }, []);

  useEffect(() => {
    const storedUser = secureStorage.getItem("user");
    if (storedUser) {
      setUser(storedUser);
    }
    setLoading(false);
  }, []);

  const updateUser = (updatedUser: User | null) => {
    setUser(updatedUser);
    if (updatedUser) {
      secureStorage.setItem("user", updatedUser);
    } else {
      secureStorage.removeItem("user");
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};
