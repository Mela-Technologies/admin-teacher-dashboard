import { Avatar, Dropdown, MenuProps } from "antd";
import {
  UserOutlined,
  LogoutOutlined,
  SettingOutlined,
} from "@ant-design/icons";

const Header = () => {
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
    <div className="flex justify-between items-center h-full gap-4">
      <Dropdown menu={{ items }} placement="bottomRight">
        <div className="flex items-center gap-2 cursor-pointer">
          <Avatar icon={<UserOutlined />} />
          <span>{user.name}</span>
        </div>
      </Dropdown>
    </div>
  );
};

export default Header;
