import React from "react";
import { TeacherType } from "./teacherDetailCtrl";

interface Props {
  teacher?: TeacherType;
}

const TeacherDetailCard: React.FC<Props> = ({ teacher }) => {
  const initials = `${teacher?.firstName?.[0] || ""}${
    teacher?.lastName?.[0] || ""
  }`;

  return (
    <div className="flex items-center justify-start gap-6 w-full">
      {/* Avatar */}
      <div className="flex-shrink-0">
        {teacher?.picture ? (
          <img
            src={teacher.picture}
            alt="profile"
            className="w-28 h-28 rounded-full object-cover shadow-sm"
          />
        ) : (
          <div className="w-28 h-28 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-2xl font-semibold shadow-sm">
            {initials}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col justify-center">
        <p className="text-gray-500">{teacher?.subjectSpecialty}</p>
        <h2 className="text-4xl uppercase">{`${teacher?.firstName} ${teacher?.lastName}`}</h2>
        <div className="mt-2">
          <span
            className={`px-3 py-1 rounded-2xl text-sm ${
              teacher?.status === "Active"
                ? "bg-green-100 text-green-700"
                : "bg-gray-100 text-gray-500"
            }`}
          >
            {teacher?.status}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TeacherDetailCard;
