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
import { useTranslation } from "react-i18next";

const Sidebar = ({ role }: { role: "admin" | "teacher" }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const adminItems: MenuProps["items"] = [
    {
      key: "dashboard",
      icon: <DashboardOutlined />,
      label: t("dashboard"),
      onClick: () => navigate("/admin/dashboard"),
    },
    {
      type: "group",
      label: t("academics"),
      children: [
        {
          key: "class",
          icon: <BookOutlined />,
          label: t("class"),
          onClick: () => navigate("/admin/academics/class"),
        },
        {
          key: "courses",
          icon: <ReadOutlined />,
          label: t("courses"),
          onClick: () => navigate("/admin/academics/courses"),
        },
      ],
    },
    {
      type: "group",
      label: t("studentsManagement"),
      children: [
        {
          key: "students",
          icon: <TeamOutlined />,
          label: t("students"),
          onClick: () => navigate("/admin/students"),
        },
        // {
        //   key: "parents",
        //   icon: <TeamOutlined />,
        //   label: t("parents"),
        //   onClick: () => navigate("/admin/students/parents"),
        // },
      ],
    },
    {
      type: "group",
      label: t("staff"),
      children: [
        {
          key: "teachers",
          icon: <TeamOutlined />,
          label: t("teachers"),
          onClick: () => navigate("/admin/staff/teachers"),
        },
        {
          key: "attendance",
          icon: <KeyOutlined />,
          label: t("attendance"),
          onClick: () => navigate("/admin/students/attendance"),
        },
      ],
    },
    {
      type: "group",
      label: t("communication"),
      children: [
        {
          key: "events",
          icon: "",
          label: t("events"),
          onClick: () => navigate("/admin/communication/events"),
        },
        {
          key: "message",
          icon: "",
          label: t("message"),
          onClick: () => navigate("/admin/communication/message"),
        },
      ],
    },

    {
      key: "settings",
      icon: <SettingOutlined />,
      label: t("settings"),
      onClick: () => navigate("/admin/settings"),
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: t("logout"),
      onClick: () => navigate("/login"),
    },
  ];

  const teacherItems: MenuProps["items"] = [
    {
      key: "dashboard",
      icon: <DashboardOutlined />,
      label: t("dashboard"),
      onClick: () => navigate("/teacher/dashboard"),
    },
    {
      type: "group",
      label: t("myAcademics"),
      children: [
        {
          key: "my-lessons",
          icon: <BookOutlined />,
          label: t("myLessons"),
          onClick: () => navigate("/teacher/academics/lessons"),
        },
        {
          key: "my-courses",
          icon: <ReadOutlined />,
          label: "My Courses",
          onClick: () => navigate("/teacher/academics/courses"),
        },
      ],
    },
    {
      type: "group",
      label: t("studentsManagement"),
      children: [
        {
          key: "my-students",
          icon: <TeamOutlined />,
          label: t("myStudents"),
          onClick: () => navigate("/teacher/students"),
        },
        {
          key: "attendance",
          icon: <CalendarOutlined />,
          label: t("attendance"),
          onClick: () => navigate("/teacher/students/attendance"),
        },
      ],
    },
    {
      type: "group",
      label: t("grade"),
      children: [
        {
          key: "results",
          label: t("result"),
          icon: "",
          onClick: () => navigate("/teacher/results"),
        },
        {
          key: "exams",
          label: t("exams"),
          icon: "",
          onClick: () => navigate("/teacher/exams"),
        },
      ],
    },
    {
      type: "group",
      label: t("communication"),
      children: [
        {
          key: "events",
          icon: "",
          label: t("events"),
          onClick: () => () => navigate("/admin/communication/events"),
        },
        {
          key: "message",
          icon: "",
          label: t("message"),
          onClick: () => () => navigate("/admin/communication/message"),
        },
      ],
    },
    {
      key: "settings",
      icon: <SettingOutlined />,
      label: t("settings"),
      onClick: () => navigate("/teacher/settings"),
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: t("logout"),
      onClick: () => navigate("/login"),
    },
  ];

  const items = role === "admin" ? adminItems : teacherItems;

  return (
    <ConfigProvider
      theme={{
        components: {
          Menu: {
            // itemColor: "#e0e7ff", // normal text (light blue/gray)
            // itemHoverColor: "#ffffff", // text when hovered
            // itemSelectedColor: "#ffffff", // text when selected
            // itemBg: "#152259", // menu background
            // itemHoverBg: "#1e3a8a", // hover background (slightly lighter blue)
            // itemSelectedBg: "#1d4ed8", // active/selected background
            // groupTitleColor: "#93c5fd",
          },
        },
      }}
    >
      <Menu
        mode="inline"
        defaultSelectedKeys={["dashboard"]}
        items={items}
        className="border-r"
      />
    </ConfigProvider>
  );
};

export default Sidebar;
