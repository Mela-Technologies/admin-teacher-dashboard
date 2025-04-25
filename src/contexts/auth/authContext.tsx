import { createContext, useState, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthService } from "../../services/auth/authServices";

type User = {
  id: string;
  name: string;
  email: string;
  role: "admin" | "teacher";
};

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const navigate = useNavigate();
  const authServices = useAuthService();
  const login = async (email: string, password: string) => {
    try {
      const response = await authServices.login(email, password);
      setUser(response.user);
      localStorage.setItem("user", JSON.stringify(response.user));
      navigate(`/${response.user.role}/dashboard`);
    } catch (error) {
      console.error("Login failed", error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
