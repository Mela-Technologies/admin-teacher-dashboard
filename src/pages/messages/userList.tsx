import { Input, Avatar, List } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { MessageCtrlType } from "./messageController";

const UserList = ({ ctrl }: { ctrl: MessageCtrlType }) => {
  return (
    <div className="h-full flex flex-col bg-white  border-gray-200 shadow-sm">
      {/* 🔹 Search Bar */}
      <div className="p-3 border-b border-gray-200 sticky top-0 bg-white z-10">
        <Input
          placeholder="Search users..."
          prefix={<SearchOutlined />}
          value={ctrl.search}
          onChange={(e) => ctrl.setSearch(e.target.value)}
          className="rounded-full"
        />
      </div>

      {/* 🔹 User List */}
      {/* 🔹 User List */}
      <div className="overflow-y-auto flex-1">
        <List
          dataSource={ctrl.filteredUsers}
          renderItem={(user) => (
            <List.Item
              onClick={() => ctrl.setSelectedUser(user)}
              className={`cursor-pointer transition-all ${
                ctrl.selectedUser?.id === user.id
                  ? "bg-blue-50 border-l-4 border-blue-500"
                  : "hover:bg-gray-100"
              } px-4 py-3`}
            >
              <List.Item.Meta
                avatar={
                  <Avatar
                    src={user.avatar || undefined}
                    size={42}
                    style={{ backgroundColor: "#1677ff", color: "#fff" }}
                  >
                    {!user.avatar && user.name?.charAt(0).toUpperCase()}
                  </Avatar>
                }
                title={
                  <span className="font-medium text-gray-800">{user.name}</span>
                }
              />
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};

export default UserList;
