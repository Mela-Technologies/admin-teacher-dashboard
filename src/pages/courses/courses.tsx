import { UserRole } from "../../types/user";

const CoursesPage = ({ role }: { role: UserRole }) => {
  return <div>CoursesPage {role}</div>;
};

export default CoursesPage;
