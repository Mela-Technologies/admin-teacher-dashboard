import { useState } from "react";
import { Modal, message } from "antd";
import {
  ClassFormValues,
  useClassFormController,
} from "./addClass/addClassController";
import AddClassForm from "./addClass/addClassForm";
import { UserRole } from "../../types/user";

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

  const handleSubmit = async (values: ClassFormValues) => {
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
          <h2 className="p-2 text-xl font-semibold border-b border-gray-200">
            Add New Class
          </h2>
          <div className="px-6 pb-12 h-full overflow-y-auto">
            <AddClassForm
              initialValues={controller.initialValues}
              sections={controller.sections}
              addSection={controller.addSection}
              removeSection={controller.removeSection}
              updateSection={controller.updateSection}
              onSubmit={handleSubmit}
              loading={controller.loading}
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
            onSubmit={handleSubmit}
            loading={controller.loading}
          />
        </Modal>
      )}
    </>
  );
};

export default AddClassPage;
