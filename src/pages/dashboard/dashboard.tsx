import { useAuthContext } from "../../contexts/auth/useAuthContext";
import DashBoardAdmin from "./dashboardAdmin";
import DashBoardStaff from "./dashboardStaff";

const DashBoard = () => {
  const { user } = useAuthContext();
  if (user?.role == "admin") return <DashBoardAdmin />;
  return <DashBoardStaff />;
};

export default DashBoard;
