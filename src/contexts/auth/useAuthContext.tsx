import { useContext } from "react";
import { AuthContext } from "./authContext";

export const useAuthContext = () => {
  return useContext(AuthContext);
};
