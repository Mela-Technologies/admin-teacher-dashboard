import { UserRole } from "../../types/user";

const TeacherPage = ({ role }: { role: UserRole }) => {
  return <div className={`${role}`}>TeacherPage</div>;
};

export default TeacherPage;
