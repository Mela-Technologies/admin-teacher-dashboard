import React from "react";
import { Student } from "../../../types/student";

interface Props {
  student: Student;
}

const StudentDetailCard: React.FC<Props> = ({ student }) => {
  const initials = `${student.firstName[0] || ""}${student.lastName[0] || ""}`;

  return (
    <div className="flex items-center justify-start gap-6 w-full">
      {/* Avatar */}
      <div className="flex-shrink-0">
        {student.picture ? (
          <img
            src={student.picture}
            alt="profile"
            className="w-28 h-28 rounded-full object-cover shadow-sm"
          />
        ) : (
          <div className="w-28 h-28 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-2xl font-semibold shadow-sm">
            {initials}
          </div>
        )}
      </div>

      {/* Student Basic Info */}
      <div className="flex flex-col justify-center">
        <p className="text-gray-500">{`${student.grade} • Section ${student.section}`}</p>
        <h2 className="text-4xl uppercase">{`${student.firstName} ${student.lastName}`}</h2>
        <div className="mt-2">
          <span
            className={`px-3 py-1 rounded-2xl text-sm ${
              student.status === "Active"
                ? "bg-green-100 text-green-700"
                : "bg-gray-100 text-gray-500"
            }`}
          >
            {student.status}
          </span>
        </div>
      </div>
    </div>
  );
};

export default StudentDetailCard;
