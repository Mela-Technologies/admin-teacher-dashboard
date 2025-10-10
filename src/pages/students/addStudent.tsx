// src/pages/AddStudentsPage.tsx
import { useStudentRegistrationController } from "./studentForm/studentRegistrationController";
import StudentRegistrationForm from "./studentForm/studentRegistrationForm";
import { useTranslation } from "react-i18next";
import { UserRole } from "../../types/user";

const AddStudentsPage = ({ role }: { role: UserRole }) => {
  const { initialValues, registerStudent, loading } =
    useStudentRegistrationController();
  const { t } = useTranslation();
  return (
    <div className={`h-full ${role}`}>
      <h2 className="p-2 text-xl font-semibold border-b border-gray-200">
        {t("addNewStudent")}
      </h2>
      <div className="px-6 pb-12 h-full overflow-y-auto">
        <StudentRegistrationForm
          initialValues={initialValues}
          onSubmit={registerStudent}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default AddStudentsPage;
