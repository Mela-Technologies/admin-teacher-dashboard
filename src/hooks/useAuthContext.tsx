import { useContext } from "react";
import { AuthContext } from "../contexts/auth/authContext";

export const useAuthContext = () => {
  return useContext(AuthContext);
};
