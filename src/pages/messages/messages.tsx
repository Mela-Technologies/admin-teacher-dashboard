import { UserRole } from "../../types/user";

const MessagesPage = ({ role }: { role: UserRole }) => {
  return <div className={`${role}`}>AdminMessagePage</div>;
};

export default MessagesPage;
