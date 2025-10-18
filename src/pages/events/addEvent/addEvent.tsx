import { useState } from "react";
import { Button, Modal, message } from "antd";
import { ArrowLeftOutlined, SaveOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { UserRole } from "../../../types/user";
import AddEventForm from "./addEventForm";
import { EventFormValues, useEventCtrl } from "../eventController";

interface AddEventPageProps {
  role: UserRole;
  isEditing?: boolean;
  editData?: EventFormValues;
  onClose?: () => void;
}

const AddEventPage = ({
  role,
  isEditing = false,
  editData,
  onClose,
}: AddEventPageProps) => {
  const ctrl = useEventCtrl(editData);
  const [open, setOpen] = useState(isEditing);
  const { t } = useTranslation();

  const handleSubmit = async () => {
    try {
      const values = await ctrl.form.validateFields();
      await ctrl.submit(values);
      message.success(t("Event saved successfully!"));
      setOpen(false);
      onClose?.();
    } catch (err) {
      console.error(err);
      message.error(t("Error saving event"));
    }
  };

  const HeaderBar = (
    <div className="mb-2 p-3 px-4 flex gap-4 items-center justify-between border-b border-gray-200">
      <div className="flex items-center gap-3">
        <Button
          icon={<ArrowLeftOutlined />}
          onClick={() => (isEditing ? onClose?.() : window.history.back())}
        >
          {t("back")}
        </Button>
        <h2 className="text-lg font-semibold">
          {isEditing ? t("Edit Event") : t("Add New Event")}
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
    <div className={`${!isEditing ? "px-6 pb-10 overflow-y-auto h-full" : ""}`}>
      {HeaderBar}
      <AddEventForm ctrl={ctrl} />
    </div>
  );

  return (
    <>
      {isEditing ? (
        <Modal
          title={t("Edit Event")}
          open={open}
          onCancel={() => {
            setOpen(false);
            onClose?.();
          }}
          footer={null}
          width="60%"
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

export default AddEventPage;
