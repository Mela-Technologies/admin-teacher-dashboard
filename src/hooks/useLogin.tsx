import { useState } from "react";
import { message } from "antd";
// import { useAxios } from "./useAxios";
import { useNavigate } from "react-router-dom";
import { LoginProps } from "../types/login";
import { useAuthContext } from "../contexts/auth/useAuthContext";
import { UserRole } from "../types/user";

const useLogin = () => {
  const navigator = useNavigate();
  const [loading, setLoading] = useState(false);
  const { updateUser } = useAuthContext();
  // const axios = useAxios();
  const login = async (data: LoginProps) => {
    setLoading(true);
    try {
      console.log(data);
      // const response = await axios.post("/api/users/login", data);
      // console.log(response);
      const userRole = (data.role as UserRole) ?? "admin";
      updateUser({
        id: "",
        name: data.email ?? "",
        role: userRole,
        email: data.email ?? "",
      });
      navigator(`/${userRole}/dashboard`);
    } catch (error) {
      message.error(`${error}`);
    } finally {
      setLoading(false);
    }
  };

  return { login, loading };
};

export default useLogin;
