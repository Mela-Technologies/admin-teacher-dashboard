// src/pages/course/AddCoursePage.tsx
import { useState } from "react";
import { Button, Modal, message } from "antd";
import {
  CourseFormValues,
  useAddCourseController,
} from "./addCourse/addCourseController";
import { UserRole } from "../../types/user";
import AddCourseForm from "./addCourse/addCourseForm";
import { useTranslation } from "react-i18next";
import { ArrowLeftOutlined, SaveOutlined } from "@ant-design/icons";

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
  // Validate and submit only valid data
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
    } catch (err) {
      // Ant Design automatically highlights invalid inputs
    }
  };
  const onSubmit = async (values: CourseFormValues) => {
    try {
      if (isEditing) {
        // 🔹 Update existing course set
        await controller.update({
          gradeLevel: editData?.gradeLevel ?? "",
          courses: controller.courses,
        });
        message.success("Courses updated successfully!");
      } else {
        // 🔹 Create new course set
        await controller.register(values);
        message.success("Courses created successfully!");
      }
      setOpen(false);
      onClose?.();
    } catch (err) {
      message.error("Error submitting courses");
    }
  };
  return (
    <>
      {/* 🧩 Regular Add Page Mode */}
      {!isEditing && (
        <div className={`h-full ${role}`}>
          <div className="mb-1 p-2 px-4 flex gap-4 items-center justify-between border-b border-gray-200 w-full">
            <div className="flex gap-4">
              <Button
                icon={<ArrowLeftOutlined />}
                onClick={() => window.history.back()}
                className="flex items-center"
              >
                {t("back")}
              </Button>
              <h2 className="m-0! text-lg font-semibold">
                {t("Add New Course")}
              </h2>
            </div>
            {/* Save button */}
            <Button
              icon={<SaveOutlined />}
              onClick={handleSubmit}
              className="flex items-center"
              loading={controller.loading}
            >
              {t("save")}
            </Button>
          </div>
          <div className="px-6 pb-12 h-full overflow-y-auto">
            <AddCourseForm
              initialValues={{ gradeLevel: null, courses: [] }}
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
        </div>
      )}

      {/* ✏️ Popup Edit Mode */}
      {isEditing && (
        <Modal
          title="Edit Course"
          open={open}
          onCancel={() => {
            setOpen(false);
            onClose?.();
          }}
          footer={null}
          width={"80%"}
          destroyOnClose
        >
          <AddCourseForm
            initialValues={editData || { gradeLevel: "", courses: [] }}
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
        </Modal>
      )}
    </>
  );
};

export default AddCoursePage;
