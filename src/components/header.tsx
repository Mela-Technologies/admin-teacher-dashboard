import React from "react";
import { Avatar, Dropdown, Select, MenuProps } from "antd";
import {
  UserOutlined,
  LogoutOutlined,
  SettingOutlined,
  GlobalOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";

const { Option } = Select;

const Header: React.FC = () => {
  const { i18n } = useTranslation();

  const user = {
    name: "Mela Tech",
    role: "admin",
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: "My Account",
      icon: <UserOutlined />,
    },
    {
      type: "divider",
    },
    {
      key: "2",
      label: "Settings",
      icon: <SettingOutlined />,
    },
    {
      key: "3",
      label: "Logout",
      icon: <LogoutOutlined />,
    },
  ];

  return (
    <div className="flex justify-between items-center h-full gap-4 px-3">
      {/* 🌐 Language Selector */}
      <div className="flex items-center gap-2">
        <GlobalOutlined className="text-gray-600" />
        <Select
          value={i18n.language}
          onChange={(lng) => i18n.changeLanguage(lng)}
          style={{ width: 120 }}
          size="small"
        >
          <Option value="en">English</Option>
          <Option value="am">አማርኛ</Option>
          <Option value="oro">Affan Oromoo</Option>
        </Select>
      </div>

      {/* 👤 User Dropdown */}
      <Dropdown menu={{ items }} placement="bottomRight">
        <div className="flex items-center gap-2 cursor-pointer">
          <Avatar icon={<UserOutlined />} />
          <span className="font-medium">{user.name}</span>
        </div>
      </Dropdown>
    </div>
  );
};

export default Header;
