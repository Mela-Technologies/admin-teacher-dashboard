import React from "react";
import { Card } from "antd";
import { ProfileType } from "../../types/student";

interface Props {
  student: ProfileType;
}

const gap = "gap-1"; // consistent spacing variable

const ProfileDetailCard: React.FC<Props> = ({ student }) => {
  const initials = `${student.firstName[0] || ""}${student.lastName[0] || ""}`;

  return (
    <Card className="shadow-sm border border-gray-100 ">
      {/* Avatar */}
      <div className="flex flex-col items-center text-center mb-1">
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

        <div>
          <h2 className="text-lg font-semibold">{`${student.firstName} ${student.lastName}`}</h2>
          <p className="text-gray-500">{`${student.grade} • ${student.section}`}</p>
          <span
            className={`inline-block px-3 py-1 rounded-2xl  ${
              student.status === "Active"
                ? "bg-green-100 text-green-700"
                : "bg-gray-100 text-gray-500"
            }`}
          >
            {student.status}
          </span>
        </div>
      </div>

      {/* --- Details using flex row display --- */}
      <div className={`flex flex-col  text-gray-700`}>
        {/* Student Info */}
        <div>
          <h4 className="text-sm font-semibold mb-2">Student Information</h4>
          <ul className={`flex flex-wrap ${gap}`}>
            <li className="flex flex-row w-full justify-between">
              <span className="text-gray-400 ">Student ID</span>
              <span>{student.id}</span>
            </li>
            <li className="flex flex-row w-full justify-between">
              <span className="text-gray-400 ">Admission Date</span>
              <span>{student.admissionDate}</span>
            </li>
            <li className="flex flex-row w-full justify-between">
              <span className="text-gray-400 ">Date of Birth</span>
              <span>{student.dateOfBirth}</span>
            </li>
            <li className="flex flex-row w-full justify-between">
              <span className="text-gray-400 ">Gender</span>
              <span>{student.gender}</span>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-sm font-semibold mb-2">Contact Information</h4>
          <ul className={`flex flex-wrap ${gap}`}>
            <li className="flex flex-row justify-between w-full">
              <span className="text-gray-400 ">Email</span>
              <span>{student.email}</span>
            </li>
            <li className="flex flex-row w-full justify-between">
              <span className="text-gray-400 ">Phone</span>
              <span>{student.phone}</span>
            </li>
            {/* <li className="flex flex-row w-full justify-between">
              <span className="text-gray-400 ">Address</span>
              <span>{student.address}</span>
            </li> */}
          </ul>
        </div>

        {/* Parent Info */}
        <div>
          <h4 className=" text-sm font-semibold mb-2">Parent Information</h4>
          <ul className={`flex flex-wrap ${gap}`}>
            <li className="flex flex-row w-full justify-between">
              <span className="text-gray-400 ">Name</span>
              <span>{student.parent.name}</span>
            </li>
            <li className="flex flex-row w-full justify-between">
              <span className="text-gray-400 ">Email</span>
              <span>{student.parent.email}</span>
            </li>
            <li className="flex flex-row w-full justify-between">
              <span className="text-gray-400 ">Phone</span>
              <span>{student.parent.phone}</span>
            </li>
          </ul>
        </div>
      </div>
    </Card>
  );
};

export default ProfileDetailCard;
