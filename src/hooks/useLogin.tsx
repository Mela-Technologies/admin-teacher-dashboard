import { useState } from "react";
import { message } from "antd";
import { useAxios } from "./useAxios";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const axios = useAxios();
  const login = async (data: {}) => {
    setLoading(true);
    try {
      axios.post("API", data);
    } catch (error) {
      message.error(`${error}`);
    } finally {
      setLoading(false);
    }
  };

  return { login, loading };
};

export default useLogin;
