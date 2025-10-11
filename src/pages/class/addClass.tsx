import { useState } from "react";
import { Button, message, Modal } from "antd";
import {
  ClassFormValues,
  useClassFormController,
} from "./addClass/addClassController";
import AddClassForm from "./addClass/addClassForm";
import { UserRole } from "../../types/user";
import { ArrowLeftOutlined, SaveOutlined } from "@ant-design/icons";

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
    } catch (err) {
      // Ant Design will highlight invalid inputs automatically
    }
  };
  const onSubmit = async (values: ClassFormValues) => {
    try {
      if (isEditing) {
        // 🔹 Update existing class
        await controller.updateClass({
          gradeId: editData?.gradeId,
          gradeLevel: editData?.gradeLevel ?? "",
          sections: controller.sections,
        });
        message.success("Class updated successfully!");
      } else {
        // 🔹 Create new class
        await controller.registerClass(values);
        message.success("Class created successfully!");
      }
      setOpen(false);
      onClose?.();
    } catch (error) {
      console.error("Error saving class:", error);
      message.error("Failed to save class.");
    }
  };
  return (
    <>
      {/* 🔹 Regular Add Page Mode */}
      {!isEditing && (
        <div className={`h-full ${role}`}>
          <div className="mb-1 p-2 px-4 flex gap-4 items-center justify-between border-b border-gray-200 w-full">
            <div className="flex gap-4">
              <Button
                icon={<ArrowLeftOutlined />}
                onClick={() => window.history.back()}
                className="flex items-center"
              >
                Back
              </Button>
              <h2 className="m-0! text-lg font-semibold">Add New Class</h2>
            </div>
            {/* Save button */}
            <Button
              icon={<SaveOutlined />}
              onClick={handleSubmit}
              className="flex items-center"
            >
              Save
            </Button>
          </div>
          <div className="px-4 pb-12 h-full overflow-y-auto">
            <AddClassForm
              form={controller.form}
              initialValues={controller.initialValues}
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
        </div>
      )}

      {/* 🔹 Popup Edit Mode */}
      {isEditing && (
        <Modal
          title="Edit Class"
          open={open}
          onCancel={() => {
            setOpen(false);
            onClose?.();
          }}
          footer={null}
          width={"80%"}
          destroyOnClose
        >
          <AddClassForm
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
            form={controller.form}
          />
        </Modal>
      )}
    </>
  );
};

export default AddClassPage;
