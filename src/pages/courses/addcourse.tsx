// src/pages/course/AddCoursePage.tsx
import { useState } from "react";
import { Modal, message } from "antd";
import {
  CourseFormValues,
  useAddCourseController,
} from "./addCourse/addCourseController";
import { UserRole } from "../../types/user";
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
  const controller = useAddCourseController();
  const [open, setOpen] = useState(isEditing);

  const handleSubmit = async (values: CourseFormValues) => {
    try {
      if (isEditing) {
        // 🔹 Update existing course set
        await controller.onSubmit({
          gradeLevel: editData?.gradeLevel ?? "",
          courses: controller.courses,
        });
        message.success("Courses updated successfully!");
      } else {
        // 🔹 Create new course set
        await controller.onSubmit(values);
        message.success("Courses created successfully!");
      }
      setOpen(false);
      onClose?.();
    } catch (error) {
      console.error("Error saving course:", error);
      message.error("Failed to save courses.");
    }
  };

  return (
    <>
      {/* 🧩 Regular Add Page Mode */}
      {!isEditing && (
        <div className={`h-full ${role}`}>
          <h2 className="p-2 text-xl font-semibold border-b border-gray-200">
            Add New Course
          </h2>
          <div className="px-6 pb-12 h-full overflow-y-auto">
            <AddCourseForm
              initialValues={{ gradeLevel: null, courses: [] }}
              courses={controller.courses}
              addCourse={controller.addCourse}
              removeCourse={controller.removeCourse}
              updateCourse={controller.updateCourse}
              fetchCoursesByGrade={controller.fetchCoursesByGrade}
              onSubmit={handleSubmit}
              loading={controller.loading}
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
            onSubmit={handleSubmit}
            loading={controller.loading}
          />
        </Modal>
      )}
    </>
  );
};

export default AddCoursePage;
