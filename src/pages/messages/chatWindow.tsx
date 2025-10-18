import { Input, Button, Avatar } from "antd";
import { SendOutlined } from "@ant-design/icons";
import { useState, useRef, useEffect } from "react";
import dayjs from "dayjs";
import { MessageCtrlType } from "./messageController";

const ChatWindow = ({
  ctrl,
  currentUserId,
}: {
  ctrl: MessageCtrlType;
  currentUserId: number;
}) => {
  const [text, setText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSend = () => {
    if (text.trim() === "") return;
    ctrl.sendMessage(text);
    setText("");
  };

  // 🔹 Auto-scroll to bottom when new message appears
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [ctrl.chatMessages]);

  if (!ctrl.selectedUser) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-400">
        Select a user to start chatting 💬
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* 🔹 Header */}
      <div className="px-4 py-2 bg-white flex items-center gap-3 shadow-sm sticky top-0 z-10">
        <Avatar
          src={ctrl.selectedUser.avatar || undefined}
          size={45}
          style={{ backgroundColor: "#1677ff", color: "#fff" }}
        >
          {!ctrl.selectedUser.avatar &&
            ctrl.selectedUser.name?.charAt(0).toUpperCase()}
        </Avatar>
        <div>
          <h2 className="font-semibold text-gray-800">
            {ctrl.selectedUser.name}
          </h2>
        </div>
      </div>

      {/* 🔹 Messages */}
      <div
        className="flex-1 w-full overflow-y-auto px-4 py-3 space-y-3 bg-gray-50"
        style={{
          maxHeight: "calc(100vh - 180px)", // adjust depending on header + input height
        }}
      >
        {ctrl.chatMessages.map((msg) => {
          const isSender = msg.senderId === currentUserId;
          return (
            <div
              key={msg.id}
              className={`flex flex-col ${
                isSender ? "items-end" : "items-start"
              }`}
            >
              <div
                className={`inline-block break-words max-w-[80%] px-3 py-2 rounded-2xl shadow-sm text-sm ${
                  isSender
                    ? "bg-blue-500 text-white rounded-br-none"
                    : "bg-white text-gray-800 border rounded-bl-none"
                }`}
              >
                {msg.text}
              </div>
              <span className="text-[10px] text-gray-400 mt-1">
                {dayjs(msg.timestamp).format("MMM DD, YYYY • hh:mm A")}
              </span>
            </div>
          );
        })}
        <div ref={messagesEndRef}></div>
      </div>

      {/* 🔹 Fixed Message Input */}
      <div className="p-3 border-t border-gray-200 bg-white flex gap-2 sticky bottom-0">
        <Input
          placeholder="Type a message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onPressEnter={handleSend}
          className="rounded-full"
        />
        <Button
          type="primary"
          icon={<SendOutlined />}
          onClick={handleSend}
          className="rounded-full"
        />
      </div>
    </div>
  );
};

export default ChatWindow;
