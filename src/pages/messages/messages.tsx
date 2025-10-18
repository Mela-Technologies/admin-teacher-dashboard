import { useMessageCtrl } from "./messageController";

import { UserRole } from "../../types/user";
import UserList from "./userList";
import ChatWindow from "./chatWindow";

const MessagePage = ({ role }: { role: UserRole }) => {
  const currentUserId = 999; // Logged-in user example
  const ctrl = useMessageCtrl(currentUserId);

  return (
    <div className={`min-h-full flex bg-gray-100 ${role}`}>
      {/* 🔹 Left Column: Users */}
      <div className="w-1/3 border-r border-gray-200">
        <UserList ctrl={ctrl} />
      </div>

      {/* 🔹 Right Column: Chat Window */}
      <div className="flex-1  flex flex-col">
        <ChatWindow ctrl={ctrl} currentUserId={currentUserId} />
      </div>
    </div>
  );
};

export default MessagePage;
