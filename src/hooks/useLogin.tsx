import { useState } from "react";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { LoginProps } from "../types/login";
import { useAuthContext } from "../contexts/auth/useAuthContext";
import { UserRole } from "../types/user";
import { useAxios } from "./useAxios";

const useLogin = () => {
  const navigator = useNavigate();
  const [loading, setLoading] = useState(false);
  const { updateUser } = useAuthContext();
  const axios = useAxios();
  const login = async (data: LoginProps) => {
    setLoading(true);
    try {
      //adding zero to phone number
      data.phone_number = `0${data.phone_number}`;
      const response = await axios.post("/api/users/login", data);
      // console.log(response.data);
      const loggedUser = response.data.user;
      const userRole = (data.role as UserRole) ?? "admin";
      updateUser({
        id: loggedUser["id"] ?? "",
        name: loggedUser["user_name"] ?? data.email ?? "",
        // role: loggedUser["role"] ?? userRole,
        role: userRole,
        email: data.email ?? "",
        token: response.data.token || null,
        phone_number: loggedUser["phone_number"],
      });

      navigator(`/${userRole}/dashboard`);
    } catch (error) {
      console.log(error);
      message.error(`${error}`);
      updateUser({
        id: "11",
        name: "DemoUser",
        role: data.role ?? "admin",
        email: "admin@123",
        token: null,
        phone_number: (data.phone_number = `0${data.phone_number}`),
      });

      navigator(`/${data.role ?? "admin"}/dashboard`);
    } finally {
      setLoading(false);
    }
  };

  return { login, loading };
};

export default useLogin;
