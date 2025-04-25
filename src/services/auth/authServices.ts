import { useAxios } from "../../hooks/useAxios";


export const useAuthService = () => {
  const axios = useAxios();

  const login = async (email: string, password: string) => {
    const response = await axios.post("/auth/login", { email, password });
    return response.data;
  };

  const register = async (data: any) => {
    const response = await axios.post("/auth/register", data);
    return response.data;
  };

  const logout = async () => {
    const response = await axios.post("/auth/logout");
    return response.data;
  };

  return {
    login,
    register,
    logout,
  };
};
