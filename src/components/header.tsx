import { Avatar, Dropdown, Menu } from "antd";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";

const Header = () => {
  const user = {
    name: "John Doe",
    role: "admin",
  };

  const menu = (
    <Menu>
      <Menu.Item icon={<UserOutlined />} key="profile">
        Profile
      </Menu.Item>
      <Menu.Item icon={<LogoutOutlined />} key="logout">
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="flex justify-between items-center h-full gap-4">
      <Dropdown overlay={menu} placement="bottomRight">
        <div className="flex items-center gap-2 cursor-pointer">
          <Avatar icon={<UserOutlined />} />
          <span>{user.name}</span>
        </div>
      </Dropdown>
    </div>
  );
};

export default Header;
