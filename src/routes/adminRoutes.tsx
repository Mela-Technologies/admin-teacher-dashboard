import AttendancePage from "../pages/admin/attendance/attendance";
import AddClassPage from "../pages/admin/class/addClass";
import ClassDetailPage from "../pages/admin/class/classDetail/classDetailPage";
import ClassAdminPage from "../pages/admin/class/classes";
import AdminCoursesPage from "../pages/admin/courses/courses";
import DashBoardAdmin from "../pages/admin/dashboard/dashboardAdmin";
import AdminEventsPage from "../pages/admin/events/events";
import AdminLessonsPage from "../pages/admin/lessons/lessons";
import AdminMessagesPage from "../pages/admin/messages/messages";
import AdminParentsPage from "../pages/admin/parents/parents";
import PermissionsAccessPage from "../pages/admin/permissionsAccess/permissionsAccess";
import UserRegistrationPage from "../pages/admin/registration/registration";
import AdminSettingsPage from "../pages/admin/settings/settings";
import AdminStudentsAddPage from "../pages/admin/students/addStudent";
import AdminStudentDetailPage from "../pages/admin/students/studentDetail/studentDetailPage";
import AdminStudentsPage from "../pages/admin/students/students";
import AdminTeacherPage from "../pages/admin/teachers/teachers";

export const adminRoutes = [
  { path: "dashboard", element: <DashBoardAdmin /> },
  { path: "admission/user-registration", element: <UserRegistrationPage /> },
  { path: "admission/permissions", element: <PermissionsAccessPage /> },
  { path: "academics/lessons", element: <AdminLessonsPage /> },
  { path: "academics/courses", element: <AdminCoursesPage /> },
  { path: "academics/class", element: <ClassAdminPage /> },
  { path: "academics/class/add", element: <AddClassPage /> },
  { path: "academics/class/detail", element: <ClassDetailPage /> },
  { path: "academics/students", element: <AdminStudentsPage /> },
  { path: "academics/students/add", element: <AdminStudentsAddPage /> },
  { path: "academics/students/detail", element: <AdminStudentDetailPage /> },
  { path: "academics/attendance", element: <AttendancePage /> },
  { path: "academics/teachers", element: <AdminTeacherPage /> },
  { path: "academics/parents", element: <AdminParentsPage /> },
  { path: "academics/events", element: <AdminEventsPage /> },
  { path: "academics/message", element: <AdminMessagesPage /> },
  { path: "settings", element: <AdminSettingsPage /> },
];
