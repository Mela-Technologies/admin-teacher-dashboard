// src/pages/course/AddCoursePage.tsx
import { useState } from "react";
import { Button, Modal, message } from "antd";
import {
  CourseFormValues,
  useAddCourseController,
} from "./addCourse/addCourseController";
import { UserRole } from "../../types/user";
import { useTranslation } from "react-i18next";
import { ArrowLeftOutlined, SaveOutlined } from "@ant-design/icons";
import AddCourseForm from "./addCourse/addCourseForm";

interface AddCoursePageProps {
  role: UserRole;
  isEditing?: boolean;
  editData?: CourseFormValues;
  onClose?: () => void;
}

const AddCoursePage = ({
  role,
  isEditing = false,
  editData,
  onClose,
}: AddCoursePageProps) => {
  const controller = useAddCourseController(editData);
  const [open, setOpen] = useState(isEditing);
  const { t } = useTranslation();

  /** 🔹 Submit Logic */
  const onSubmit = async (values: CourseFormValues) => {
    try {
      if (isEditing) {
        await controller.update({
          gradeLevel: editData?.gradeLevel ?? "",
          courses: controller.courses,
        });
        message.success(t("Courses updated successfully!"));
      } else {
        await controller.register(values);
        message.success(t("Courses created successfully!"));
      }
      setOpen(false);
      onClose?.();
    } catch (err) {
      console.error(err);
      message.error(t("Error submitting courses"));
    }
  };

  /** 🔹 Validation and save handler */
  const handleSubmit = async () => {
    try {
      await controller.form.validateFields();
      const validCourses = controller.courses.filter(
        (c) =>
          c.subject.trim() &&
          c.code.trim() &&
          typeof c.creditHours === "number" &&
          c.core
      );
      onSubmit({
        gradeLevel: controller.gradeLevel,
        courses: validCourses,
      });
    } catch {
      // AntD handles form errors automatically
    }
  };

  /** 🔹 Shared Toolbar */
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
          {isEditing ? t("Edit Course") : t("Add New Course")}
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

  /** 🔹 Shared Form Content */
  const formContent = (
    <div className={`${!isEditing ? "px-6 pb-12 overflow-y-auto h-full" : ""}`}>
      {HeaderBar}
      <AddCourseForm
        courses={controller.courses}
        addCourse={controller.addCourse}
        removeCourse={controller.removeCourse}
        updateCourse={controller.updateCourse}
        fetchCoursesByGrade={controller.fetchCoursesByGrade}
        loading={controller.loading}
        form={controller.form}
        gradeLevel={controller.gradeLevel}
        isEditable={controller.isEditable}
        isFetching={controller.isFetching}
        setIsEditable={controller.setIsEditable}
        schoolSection={controller.schoolSection}
        setGradeLevel={controller.setGradeLevel}
        setIsFetching={controller.setIsFetching}
        setSchoolSection={controller.setSchoolSection}
      />
    </div>
  );

  /** 🔹 Conditional wrapper */
  return (
    <>
      {isEditing ? (
        <Modal
          title={t("Edit Course")}
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

export default AddCoursePage;
