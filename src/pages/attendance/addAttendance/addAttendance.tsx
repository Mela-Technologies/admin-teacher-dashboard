import { useState } from "react";
import { Button, Modal, message } from "antd";
import { useTranslation } from "react-i18next";
import { ArrowLeftOutlined, SaveOutlined } from "@ant-design/icons";
import { UserRole } from "../../../types/user";
import useAttendanceCtrl, {
  AttendanceFormValues,
} from "../attendanceController";
import AddAttendanceForm from "./addAttendanceForm";

interface AddAttendancePageProps {
  role: UserRole;
  isEditing?: boolean;
  editData?: AttendanceFormValues;
  onClose?: () => void;
}

const AddAttendancePage = ({
  role,
  isEditing = false,
  editData,
  onClose,
}: AddAttendancePageProps) => {
  const ctrl = useAttendanceCtrl(editData);
  const [open, setOpen] = useState(isEditing);
  const { t } = useTranslation();

  const onSubmit = async (values: AttendanceFormValues) => {
    try {
      await ctrl.submit(values);
      message.success(t("Attendance saved successfully!"));
      setOpen(false);
      onClose?.();
    } catch (err) {
      console.error(err);
      message.error(t("Error submitting attendance"));
    }
  };

  const handleSubmit = async () => {
    try {
      await ctrl.form.validateFields();
      const validRows = ctrl.students.map((s) => ({
        id: s.id,
        status: s.status,
        fullName: s.fullName,
        grade: s.grade,
        section: s.section,
      }));
      onSubmit({
        grade: ctrl.grade,
        section: ctrl.section,
        subject: ctrl.subject,
        students: validRows,
      });
    } catch {
      // AntD will handle validation messages
    }
  };

  const HeaderBar = (
    <div className="mb-1 p-2 px-4 flex gap-4 items-center justify-between border-b border-gray-200 w-full">
      <div className="flex gap-4 items-center">
        <Button
          icon={<ArrowLeftOutlined />}
          onClick={() => (isEditing ? onClose?.() : window.history.back())}
        >
          {t("back")}
        </Button>
        <h2 className="text-lg font-semibold">
          {isEditing ? t("Edit Attendance") : t("Register Attendance")}
        </h2>
      </div>
      <Button
        icon={<SaveOutlined />}
        onClick={handleSubmit}
        loading={ctrl.loading}
      >
        {t("save")}
      </Button>
    </div>
  );

  const formContent = (
    <div className={`${!isEditing ? "px-6 pb-12 overflow-y-auto h-full" : ""}`}>
      {HeaderBar}
      <AddAttendanceForm ctrl={ctrl} />
    </div>
  );

  return (
    <>
      {isEditing ? (
        <Modal
          title={t("Edit Attendance")}
          open={open}
          onCancel={() => {
            setOpen(false);
            onClose?.();
          }}
          footer={null}
          width="80%"
          destroyOnClose
        >
          {formContent}
        </Modal>
      ) : (
        <div className={`h-full ${role}`}>{formContent}</div>
      )}
    </>
  );
};

export default AddAttendancePage;
