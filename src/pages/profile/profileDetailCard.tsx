import React from "react";
import { Card } from "antd";

interface ProfileProps {
  profile: any; // can be admin or teacher
  role: "admin" | "teacher";
}

const ProfileDetailCard: React.FC<ProfileProps> = ({ profile, role }) => {
  const initials = `${profile.firstName[0] || ""}${profile.lastName[0] || ""}`;

  return (
    <Card className="shadow-sm border border-gray-100">
      {/* Avatar */}
      <div className="flex flex-col items-center text-center mb-1">
        {profile.picture ? (
          <img
            src={profile.picture}
            alt="profile"
            className="w-28 h-28 rounded-full object-cover shadow-sm"
          />
        ) : (
          <div className="w-28 h-28 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-2xl font-semibold shadow-sm">
            {initials}
          </div>
        )}

        <div>
          <h2 className="text-lg font-semibold">
            {`${profile.firstName} ${profile.lastName}`}
          </h2>
          <span
            className={`inline-block px-3 py-1 rounded-2xl ${
              profile.status === "Active"
                ? "bg-green-100 text-green-700"
                : "bg-gray-100 text-gray-500"
            }`}
          >
            {profile.status}
          </span>
        </div>
      </div>

      {/* Basic Info */}
      <div className="flex flex-col text-gray-700 mt-3">
        <div>
          <h4 className="text-sm font-semibold mb-2">
            {role === "teacher" ? "Teacher Information" : "Admin Information"}
          </h4>
          <ul className="space-y-1">
            <li className="flex justify-between">
              <span className="text-gray-400">
                {role === "teacher" ? "Teacher ID" : "Admin ID"}
              </span>
              <span>{profile.id || profile.teacherId}</span>
            </li>
            {role === "teacher" && (
              <li className="flex justify-between">
                <span className="text-gray-400">Hire Date</span>
                <span>{profile.hireDate}</span>
              </li>
            )}
            <li className="flex justify-between">
              <span className="text-gray-400">Gender</span>
              <span>{profile.gender}</span>
            </li>
            {role === "admin" && (
              <li className="flex justify-between">
                <span className="text-gray-400">Role</span>
                <span>{profile.roleName || "Admin"}</span>
              </li>
            )}
          </ul>
        </div>

        {/* Contact Info */}
        <div className="mt-3">
          <h4 className="text-sm font-semibold mb-2">Contact Information</h4>
          <ul className="space-y-1">
            <li className="flex justify-between">
              <span className="text-gray-400">Email</span>
              <span>{profile.email}</span>
            </li>
            <li className="flex justify-between">
              <span className="text-gray-400">Phone</span>
              <span>{profile.phone}</span>
            </li>
            <li className="flex justify-between">
              <span className="text-gray-400">Address</span>
              <span>{profile.address}</span>
            </li>
          </ul>
        </div>
      </div>
    </Card>
  );
};

export default ProfileDetailCard;
