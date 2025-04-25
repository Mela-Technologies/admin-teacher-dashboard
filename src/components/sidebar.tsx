import { Menu } from "antd";
import {
  DashboardOutlined,
  UserAddOutlined,
  KeyOutlined,
  BookOutlined,
  TeamOutlined,
  ReadOutlined,
  CalendarOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import type { MenuProps } from "antd";

const Sidebar = ({ role }: { role: "admin" | "teacher" }) => {
  const navigate = useNavigate();

  const adminItems: MenuProps["items"] = [
    {
      key: "dashboard",
      icon: <DashboardOutlined />,
      label: "Dashboard",
      onClick: () => navigate("/admin/dashboard"),
    },
    {
      type: "group",
      label: "Admission",
      children: [
        {
          key: "user-registration",
          icon: <UserAddOutlined />,
          label: "User Registration",
          onClick: () => navigate("/admin/admission/user-registration"),
        },
        {
          key: "permission-access",
          icon: <KeyOutlined />,
          label: "Permission & Access",
          onClick: () => navigate("/admin/admission/permissions"),
        },
      ],
    },
    {
      type: "group",
      label: "Academics",
      children: [
        {
          key: "lessons",
          icon: <BookOutlined />,
          label: "Lessons",
          onClick: () => navigate("/admin/academics/lessons"),
        },
        {
          key: "courses",
          icon: <ReadOutlined />,
          label: "Courses",
          onClick: () => navigate("/admin/academics/courses"),
        },
        {
          key: "students",
          icon: <TeamOutlined />,
          label: "Students",
          onClick: () => navigate("/admin/academics/students"),
        },
        {
          key: "teachers",
          icon: <TeamOutlined />,
          label: "Teachers",
          onClick: () => navigate("/admin/academics/teachers"),
        },
        {
          key: "parents",
          icon: <TeamOutlined />,
          label: "Parents",
          onClick: () => navigate("/admin/academics/parents"),
        },
      ],
    },
    {
      type: "group",
      label: "Communication",
      children: [
        {
          key: "events",
          icon: "",
          label: "Events",
          onClick: () => () => navigate("/admin/academics/events"),
        },
        {
          key: "message",
          icon: "",
          label: "Message",
          onClick: () => () => navigate("/admin/academics/message"),
        },
      ],
    },

    {
      key: "settings",
      icon: <SettingOutlined />,
      label: "Settings",
      onClick: () => navigate("/admin/settings"),
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Logout",
      onClick: () => navigate("/login"),
    },
  ];

  const teacherItems: MenuProps["items"] = [
    {
      key: "dashboard",
      icon: <DashboardOutlined />,
      label: "Dashboard",
      onClick: () => navigate("/teacher/dashboard"),
    },
    {
      type: "group",
      label: "My Academics",
      children: [
        {
          key: "my-lessons",
          icon: <BookOutlined />,
          label: "My Lessons",
          onClick: () => navigate("/teacher/academics/lessons"),
        },
        {
          key: "my-courses",
          icon: <ReadOutlined />,
          label: "My Courses",
          onClick: () => navigate("/teacher/academics/courses"),
        },
        {
          key: "my-students",
          icon: <TeamOutlined />,
          label: "My Students",
          onClick: () => navigate("/teacher/academics/students"),
        },
        {
          key: "attendance",
          icon: <CalendarOutlined />,
          label: "Attendance",
          onClick: () => navigate("/teacher/attendance"),
        },
      ],
    },
    {
      type: "group",
      label: "Grade",
      children: [
        {
          key: "results",
          label: "Result",
          icon: "",
          onClick: () => navigate("/teacher/results"),
        },
        {
          key: "exams",
          label: "Exams",
          icon: "",
          onClick: () => navigate("/teacher/exams"),
        },
      ],
    },
    {
      type: "group",
      label: "Communication",
      children: [
        {
          key: "events",
          icon: "",
          label: "Events",
          onClick: () => () => navigate("/admin/academics/events"),
        },
        {
          key: "message",
          icon: "",
          label: "Message",
          onClick: () => () => navigate("/admin/academics/message"),
        },
      ],
    },
    {
      key: "settings",
      icon: <SettingOutlined />,
      label: "Settings",
      onClick: () => navigate("/teacher/settings"),
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Logout",
      onClick: () => navigate("/login"),
    },
  ];

  const items = role === "admin" ? adminItems : teacherItems;

  return (
    <Menu
      theme="light"
      mode="inline"
      defaultSelectedKeys={["dashboard"]}
      items={items}
      className="h-full border-r"
    />
  );
};

export default Sidebar;
