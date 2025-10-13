import { UserRole } from "../../../types/user";
import ClassDetail from "./classDetail";
import SectionDetail from "./sectionDetail/sectionDetail";

const ClassDetailPage = ({ role }: { role: UserRole }) => {
  const queryParams = new URLSearchParams(location.search);
  const type = queryParams.get("type");
  console.log(type);
  if (type === "class") return <ClassDetail role={role} />;
  return <SectionDetail role={role} />;
};

export default ClassDetailPage;
