import TeacherAttendancePage from "../pages/teacher/attendance/attendance";
import TeacherCoursesPage from "../pages/teacher/courses/courses";
import DashBoardTeacher from "../pages/teacher/dashboard/dashboardTeacher";
import TeacherEventPage from "../pages/teacher/events/events";
import TeacherExamPage from "../pages/teacher/exams/exams";
import TeacherLessonsPage from "../pages/teacher/lessons/lessons";
import TeacherMessagePage from "../pages/teacher/messages/message";
import TeacherResultPage from "../pages/teacher/result/result";
import TeacherSettingPage from "../pages/teacher/setting/setting";
import TeacherStudentsPage from "../pages/teacher/students/students";

export const teacherRoutes = [
  { path: "dashboard", element: <DashBoardTeacher /> },
  { path: "academics/lessons", element: <TeacherLessonsPage /> },
  { path: "academics/courses", element: <TeacherCoursesPage /> },
  { path: "academics/students", element: <TeacherStudentsPage /> },
  { path: "attendance", element: <TeacherAttendancePage /> },
  { path: "results", element: <TeacherResultPage /> },
  { path: "exams", element: <TeacherExamPage /> },
  { path: "academics/events", element: <TeacherEventPage /> },
  { path: "academics/message", element: <TeacherMessagePage /> },
  { path: "settings", element: <TeacherSettingPage /> },
];
