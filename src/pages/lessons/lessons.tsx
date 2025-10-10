import { UserRole } from "../../types/user";

const LessonsPage = ({ role }: { role: UserRole }) => {
  return <div>LessonsPage {role}</div>;
};

export default LessonsPage;
