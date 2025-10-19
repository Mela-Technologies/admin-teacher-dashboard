import { UserRole } from "../../types/user";
import AdminCoursePage from "./adminCourse";
import TeacherCoursePage from "./teacherCourse";

const CoursePage = ({ role }: { role: UserRole }) => {
  if (role == "admin") return <AdminCoursePage role="admin" />;
  return <TeacherCoursePage role="teacher" />;
};

export default CoursePage;
