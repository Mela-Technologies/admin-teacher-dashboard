import { useState } from "react";
import { Button, message, Modal } from "antd";
import {
  ClassFormValues,
  useClassFormController,
} from "./addClass/addClassController";

import { UserRole } from "../../types/user";
import { ArrowLeftOutlined, SaveOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import AddClassForm from "./addClass/addClassForm";

interface AddClassPageProps {
  role: UserRole;
  isEditing?: boolean;
  editData?: ClassFormValues;
  onClose?: () => void;
}

const AddClassPage = ({
  role,
  isEditing = false,
  editData,
  onClose,
}: AddClassPageProps) => {
  const controller = useClassFormController(editData);
  const [open, setOpen] = useState(isEditing);
  const { t } = useTranslation();

  const onSubmit = async (values: ClassFormValues) => {
    try {
      if (isEditing) {
        await controller.updateClass({
          gradeId: editData?.gradeId,
          gradeLevel: editData?.gradeLevel ?? "",
          sections: controller.sections,
        });
        message.success(t("Class updated successfully!"));
      } else {
        await controller.registerClass(values);
        message.success(t("Class created successfully!"));
      }
      setOpen(false);
      onClose?.();
    } catch (error) {
      console.error("Error saving class:", error);
      message.error(t("Failed to save class."));
    }
  };

  const handleSubmit = async () => {
    try {
      await controller.form.validateFields();
      const validSections = controller.sections.filter(
        (s) => s.name.trim() && s.capacity > 0 && s.roomNumber.trim()
      );
      onSubmit({
        gradeLevel: controller.gradeLevel ?? "",
        sections: validSections,
      });
    } catch {
      // Ant Design highlights errors automatically
    }
  };

  // 🔹 Toolbar (Shared between modal and page)
  const HeaderBar = (
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
          {isEditing ? t("Edit Class") : t("Add New Class")}
        </h2>
      </div>
      <Button
        icon={<SaveOutlined />}
        onClick={handleSubmit}
        loading={controller.loading}
        className="flex items-center"
      >
        {t("save")}
      </Button>
    </div>
  );

  // 🔹 Single unified form element
  const formContent = (
    <div className={`${!isEditing ? "px-4 pb-12 overflow-y-auto h-full" : ""}`}>
      {HeaderBar}
      <AddClassForm
        form={controller.form}
        initialValues={editData || controller.initialValues}
        sections={controller.sections}
        addSection={controller.addSection}
        removeSection={controller.removeSection}
        updateSection={controller.updateSection}
        loading={controller.loading}
        gradeLevel={controller.gradeLevel}
        isEditable={controller.isEditable}
        schoolSection={controller.schoolSection}
        setGradeLevel={controller.setGradeLevel}
        setIsEditable={controller.setIsEditable}
        setSchoolSection={controller.setSchoolSection}
      />
    </div>
  );

  return (
    <>
      {/* If editing, render inside modal; otherwise, normal page */}
      {isEditing ? (
        <Modal
          title={t("Edit Class")}
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

export default AddClassPage;
