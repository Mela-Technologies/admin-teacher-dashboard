import { ConfigProvider, Menu } from "antd";
import {
  DashboardOutlined,
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
      label: "Academics",
      children: [
        {
          key: "class",
          icon: <BookOutlined />,
          label: "Class",
          onClick: () => navigate("/admin/academics/class"),
        },
        {
          key: "courses",
          icon: <ReadOutlined />,
          label: "Courses",
          onClick: () => navigate("/admin/academics/courses"),
        },
      ],
    },
    {
      type: "group",
      label: "Students Management",
      children: [
        {
          key: "students",
          icon: <TeamOutlined />,
          label: "Students",
          onClick: () => navigate("/admin/academics/students"),
        },
        {
          key: "parents",
          icon: <TeamOutlined />,
          label: "Parents",
          onClick: () => navigate("/admin/academics/parents"),
        },
        {
          key: "attendance",
          icon: <KeyOutlined />,
          label: "Attendance",
          onClick: () => navigate("/admin/academics/attendance"),
        },
      ],
    },
    {
      type: "group",
      label: "Staff",
      children: [
        {
          key: "teachers",
          icon: <TeamOutlined />,
          label: "Teachers",
          onClick: () => navigate("/admin/academics/teachers"),
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
    <ConfigProvider
      theme={{
        components: {
          // Menu: {
          //   itemSelectedColor: "#0284c7", // text/icon color when selected
          //   itemSelectedBg: "#fff", // background when selected
          //   itemActiveBg: "#f0f9ff", // hover/active background
          // },
        },
      }}
    >
      <Menu
        theme="light"
        mode="inline"
        defaultSelectedKeys={["dashboard"]}
        items={items}
        className="h-full border-r"
      />
    </ConfigProvider>
  );
};

export default Sidebar;
