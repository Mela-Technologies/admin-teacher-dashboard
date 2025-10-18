import {
  StudentFormValues,
  useStudentRegistrationController,
} from "./studentForm/studentRegistrationController";
import StudentRegistrationForm from "./studentForm/studentRegistrationForm";
import { useTranslation } from "react-i18next";
import { UserRole } from "../../types/user";
import { Button } from "antd";
import { ArrowLeftOutlined, SaveOutlined } from "@ant-design/icons";
import { useState } from "react";
interface AddStudentProps {
  role: UserRole;
  isEditing?: boolean;
  editData?: StudentFormValues;
  onClose?: () => void;
}
const AddStudentsPage = ({
  role,
  isEditing = false,
  editData,
  onClose,
}: AddStudentProps) => {
  const rgsController = useStudentRegistrationController();
  const { t } = useTranslation();
  const [open, setOpen] = useState(isEditing);
  console.log(editData, open, setOpen);
  return (
    <div className={`h-full ${role}`}>
      {/*  */}
      <div className="mb-1 p-2 px-4 flex gap-4 items-center justify-between border-b border-gray-200 w-full">
        <div className="flex gap-4">
          <Button
            icon={<ArrowLeftOutlined />}
            onClick={() => (isEditing ? onClose?.() : window.history.back())}
            className="flex items-center"
          >
            {t("back")}
          </Button>
          <h2 className="m-0! text-lg font-semibold">
            {isEditing ? t("Edit Student") : t("addNewStudent")}
          </h2>
        </div>
        <Button
          icon={<SaveOutlined />}
          loading={rgsController.loading}
          className="flex items-center"
          onClick={() => rgsController.form.submit()}
        >
          {t("save")}
        </Button>
      </div>
      {/*  */}
      <div className="px-6 pb-12 h-full overflow-y-auto">
        <StudentRegistrationForm
          form={rgsController.form}
          initialValues={rgsController.initialValues}
          registerStudent={rgsController.registerStudent}
          loading={rgsController.loading}
        />
      </div>
    </div>
  );
};

export default AddStudentsPage;
