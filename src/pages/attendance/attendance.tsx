import { UserRole } from "../../types/user";

const AttendancePage = ({ role }: { role: UserRole }) => {
  return <div className={`${role}`}>AttendancePage</div>;
};

export default AttendancePage;
