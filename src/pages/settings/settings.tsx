import { UserRole } from "../../types/user";

const SettingsPage = ({ role }: { role: UserRole }) => {
  return <div className={`${role}`}>SettingsPage</div>;
};

export default SettingsPage;
