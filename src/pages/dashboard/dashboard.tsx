import { useAuthContext } from "../../contexts/auth/useAuthContext";
import DashBoardAdmin from "./dashboardAdmin";

const DashBoard = () => {
  const { user } = useAuthContext();
  if (user?.role == "admin") return <DashBoardAdmin />;
  return <div>DashBoard teacher</div>;
};

export default DashBoard;
