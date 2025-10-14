import AddAttendancePage from "../pages/attendance/addAttendance/addAttendance";
import AttendancePage from "../pages/attendance/attendance";
import AddClassPage from "../pages/class/addClass";
import ClassDetailPage from "../pages/class/classDetail/classDetailPage";
import ClassPage from "../pages/class/classes";
import AddCoursePage from "../pages/courses/addCourse/addCourse";
import CourseDetailPage from "../pages/courses/courseDetail/courseDetailPage";
import CoursesPage from "../pages/courses/courses";
import DashBoard from "../pages/dashboard/dashboard";
import EventsPage from "../pages/events/events";
import LessonsPage from "../pages/lessons/lessons";
import MessagesPage from "../pages/messages/messages";
import ParentsPage from "../pages/parents/parents";
import PermissionsAccessPage from "../pages/permissionsAccess/permissionsAccess";
import ProfilePage from "../pages/profile/profile";
import UserRegistrationPage from "../pages/registration/registration";
import SettingsPage from "../pages/settings/settings";
import AddStudentsPage from "../pages/students/addStudent";
import StudentDetailPage from "../pages/students/studentDetail/studentDetailPage";
import StudentsPage from "../pages/students/students";
import TeacherPage from "../pages/teachers/teachers";

const role = "admin";
export const adminRoutes = [
  { path: "dashboard", element: <DashBoard /> },
  { path: "admission/user-registration", element: <UserRegistrationPage /> },
  { path: "admission/permissions", element: <PermissionsAccessPage /> },
  { path: "academics/lessons", element: <LessonsPage role={role} /> },
  { path: "academics/courses", element: <CoursesPage role={role} /> },
  { path: "academics/courses/add", element: <AddCoursePage role={role} /> },
  {
    path: "academics/courses/detail",
    element: <CourseDetailPage role={role} />,
  },
  { path: "academics/class", element: <ClassPage role={role} /> },
  { path: "academics/class/add", element: <AddClassPage role={role} /> },
  { path: "academics/class/detail", element: <ClassDetailPage role={role} /> },
  { path: "students", element: <StudentsPage role={role} /> },
  { path: "students/add", element: <AddStudentsPage role={role} /> },
  { path: "students/detail", element: <StudentDetailPage role={role} /> },
  { path: "students/attendance", element: <AttendancePage role={role} /> },
  {
    path: "students/attendance/add",
    element: <AddAttendancePage role={role} />,
  },
  { path: "students/parents", element: <ParentsPage role={role} /> },
  { path: "staff/teachers", element: <TeacherPage role={role} /> },
  { path: "communication/events", element: <EventsPage role={role} /> },
  { path: "communication/message", element: <MessagesPage role={role} /> },
  { path: "settings", element: <SettingsPage role={role} /> },
  { path: "account", element: <ProfilePage role={role} /> },
];
