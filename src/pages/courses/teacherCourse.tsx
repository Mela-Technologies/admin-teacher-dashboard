// src/pages/teacher/TeacherCoursePage.tsx
import { Input, Button, Card } from "antd";
import {
  SearchOutlined,
  ReloadOutlined,
  BookOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import TopActionBar from "../../components/topActionBar";
import { UserRole } from "../../types/user";
import { useCourseCtrl } from "./courseController";
import { useNavigate } from "react-router-dom";

const TeacherCoursePage = ({ role }: { role: UserRole }) => {
  const { t } = useTranslation();
  const ctrl = useCourseCtrl();
  const navigator = useNavigate();
  return (
    <div className={`min-h-screen ${role}`}>
      {/* 🔹 Top Bar */}
      <TopActionBar
        title={t("teacherCourses")}
        addBtnText={t("addCourse")}
        hasSelection={false}
        onRefresh={() => ctrl.setRefresh((prev) => !prev)}
        onAddUser={() => {}}
      />

      {/* 🔹 Search Bar */}
      <div className="flex flex-wrap items-center gap-3 px-3 py-3 border-b border-gray-200">
        <Input
          placeholder={t("searchBySubject")}
          prefix={<SearchOutlined />}
          value={ctrl.searchTerm}
          onChange={(e) => ctrl.setSearchTerm(e.target.value)}
          allowClear
          className="max-w-xs"
        />
        <Button
          icon={<ReloadOutlined />}
          onClick={() => {
            ctrl.setSearchTerm("");
            ctrl.setRefresh((p) => !p);
          }}
        >
          {t("clearFilters")}
        </Button>
      </div>

      {/* 🔹 Courses Grid */}
      <div className="p-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {ctrl.filteredCourses.map((course) => (
          <Card
            key={course.key}
            variant="borderless"
            className="relative shadow-sm rounded-xl hover:shadow-md transition-all border-l-4 bg-white"
            style={{ borderLeftColor: course.color }}
            onClick={() =>
              navigator(`result?grade=${course.grade}&${course.section}`)
            }
          >
            <div className="flex flex-col h-full justify-between">
              {/* Centered subject + class/section */}
              <div className="text-center">
                <BookOutlined className="text-2xl mb-2 text-blue-500" />
                <h3 className="text-lg font-semibold mb-1 text-gray-800">
                  {course.subject}
                </h3>
                <p className="text-gray-500 text-sm">
                  {course.grade} - Section {course.section}
                </p>
              </div>

              {/* Footer info */}
              <div className="flex justify-between text-xs text-gray-600 mt-3 border-t border-gray-200 pt-2">
                <span>
                  <strong>{t("Code")}:</strong> {course.code}
                </span>
                <span>
                  <strong>{t("Credit")}:</strong> {course.creditHours}
                </span>
              </div>
            </div>
          </Card>
        ))}

        {ctrl.filteredCourses.length === 0 && (
          <div className="col-span-full text-center py-12 text-gray-400">
            {t("noCoursesFound")}
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherCoursePage;
