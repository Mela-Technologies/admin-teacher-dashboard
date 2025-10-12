import { UserRole } from "../../types/user";
import AdminProfilePage from "./adminProfile";
import TeacherProfilePage from "./teacherProfile";

const Profilepage = ({ role }: { role: UserRole }) => {
  if (role == "admin") return <AdminProfilePage />;
  return <TeacherProfilePage />;
};

export default Profilepage;
