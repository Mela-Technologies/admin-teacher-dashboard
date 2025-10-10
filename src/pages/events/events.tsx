import { UserRole } from "../../types/user";

const EventsPage = ({ role }: { role: UserRole }) => {
  return <div className={`${role}`}>EventsPage</div>;
};

export default EventsPage;
