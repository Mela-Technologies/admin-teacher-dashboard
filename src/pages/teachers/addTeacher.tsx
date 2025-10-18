import { useTranslation } from "react-i18next";
import { UserRole } from "../../types/user";
import { Button } from "antd";
import { ArrowLeftOutlined, SaveOutlined } from "@ant-design/icons";
import { useState } from "react";
import { StudentFormValues } from "../students/studentForm/studentRegistrationController";
import { useTeacherRegistrationController } from "./teacherForm/teacherRegistrationCtrl";
import TeacherRegistrationForm from "./teacherForm/teacherRegistrationForm";
interface AddStudentProps {
  role: UserRole;
  isEditing?: boolean;
  editData?: StudentFormValues;
  onClose?: () => void;
}
const AddTeacherPage = ({
  role,
  isEditing = false,
  editData,
  onClose,
}: AddStudentProps) => {
  const rgsController = useTeacherRegistrationController();
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
            {isEditing ? t("Edit Teacher") : t("Add New Teacher")}
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
        <TeacherRegistrationForm
          form={rgsController.form}
          initialValues={rgsController.initialValues}
          registerTeacher={rgsController.registerTeacher}
          loading={rgsController.loading}
        />
      </div>
    </div>
  );
};

export default AddTeacherPage;
