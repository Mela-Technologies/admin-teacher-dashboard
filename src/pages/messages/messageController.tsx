import { useState, useEffect, useMemo } from "react";

export interface UserType {
  id: number;
  name: string;
  avatar: string;
}

export interface MessageType {
  id: number;
  senderId: number;
  receiverId: number;
  text: string;
  timestamp: string; // ISO string
}

export const useMessageCtrl = (currentUserId: number) => {
  const [users, setUsers] = useState<UserType[]>([]);
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchUsers();
    fetchMessages();
  }, []);

  const fetchUsers = () => {
    setUsers([
      {
        id: 1,
        name: "Abel Mekonnen",
        avatar: "",
      },
      {
        id: 2,
        name: "Hanna Tesfaye",
        avatar: "https://i.pravatar.cc/50?img=2",
      },
      {
        id: 3,
        name: "Samuel Bekele",
        avatar: "",
      },
    ]);
  };

  const fetchMessages = () => {
    setMessages([
      {
        id: 1,
        senderId: 1,
        receiverId: currentUserId,
        text: "Hey! How are you?",
        timestamp: "2025-10-18T10:00",
      },
      {
        id: 2,
        senderId: currentUserId,
        receiverId: 1,
        text: "I'm good, thank you! How about you?",
        timestamp: "2025-10-18T10:02",
      },
      {
        id: 3,
        senderId: 1,
        receiverId: currentUserId,
        text: "Doing great! Busy with school work.",
        timestamp: "2025-10-18T10:05",
      },
    ]);
  };

  const sendMessage = (text: string) => {
    if (!selectedUser || !text.trim()) return;
    const newMsg: MessageType = {
      id: messages.length + 1,
      senderId: currentUserId,
      receiverId: selectedUser.id,
      text,
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, newMsg]);
  };

  const filteredUsers = useMemo(
    () =>
      users.filter((u) => u.name.toLowerCase().includes(search.toLowerCase())),
    [users, search]
  );

  const chatMessages = useMemo(() => {
    if (!selectedUser) return [];
    return messages.filter(
      (m) =>
        (m.senderId === selectedUser.id && m.receiverId === currentUserId) ||
        (m.receiverId === selectedUser.id && m.senderId === currentUserId)
    );
  }, [messages, selectedUser]);

  return {
    users,
    search,
    setSearch,
    filteredUsers,
    selectedUser,
    setSelectedUser,
    chatMessages,
    sendMessage,
  };
};

export type MessageCtrlType = ReturnType<typeof useMessageCtrl>;
