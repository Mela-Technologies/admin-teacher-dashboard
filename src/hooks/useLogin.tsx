import { useState } from "react";
import { message } from "antd";
// import { useAxios } from "./useAxios";
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
      console.log(data);
      const response = await axios.post("/api/users/login", data);
      console.log(response);
      const userRole = (data.role as UserRole) ?? "admin";
      updateUser({
        id: "",
        name: data.email ?? "",
        role: userRole,
        email: data.email ?? "",
      });
      navigator(`/${userRole}/dashboard`);
    } catch (error) {
      console.log(error);
      message.error(`${error}`);
    } finally {
      setLoading(false);
    }
  };

  return { login, loading };
};

export default useLogin;
