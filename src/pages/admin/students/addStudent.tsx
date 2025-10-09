// src/pages/AdminStudentsAddPage.tsx
import React from "react";
import { useStudentRegistrationController } from "./studentForm/studentRegistrationController";
import StudentRegistrationForm from "./studentForm/studentRegistrationForm";

const AdminStudentsAddPage: React.FC = () => {
  const { initialValues, registerStudent, loading } =
    useStudentRegistrationController();

  return (
    <div className=" h-full">
      <h2 className="p-2 text-xl font-semibold border-b border-gray-200">
        Add New Student
      </h2>
      <div className="px-6 pb-12 h-full overflow-y-auto">
        <StudentRegistrationForm
          initialValues={initialValues}
          onSubmit={registerStudent}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default AdminStudentsAddPage;
