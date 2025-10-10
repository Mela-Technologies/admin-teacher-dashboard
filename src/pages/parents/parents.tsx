import { UserRole } from "../../types/user";

const ParentsPage = ({ role }: { role: UserRole }) => {
  return <div className={`${role}`}>ParentsPage</div>;
};

export default ParentsPage;
