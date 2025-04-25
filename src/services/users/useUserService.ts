import { useAxios } from "../../hooks/useAxios";


export const useUserService = () => {
  const axios = useAxios();

  const getUsers = async () => {
    const response = await axios.get("/API");
    return response.data;
  };

  const updateUser = async (id: string, data: any) => {
    const response = await axios.put(`/API/${id}`, data);
    return response.data;
  };

  return {
    getUsers,
    updateUser,
  };
};
