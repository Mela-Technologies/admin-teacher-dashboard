import React from "react";
import { Button, Dropdown, MenuProps } from "antd";
import {
  MoreOutlined,
  ReloadOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  FileExcelOutlined,
  PrinterOutlined,
  SettingOutlined,
  ImportOutlined,
} from "@ant-design/icons";

type TopActionBarProps = {
  hasSelection: boolean;
  onRefresh: () => void;
  onAddUser?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onExport?: () => void;
  onPrint?: () => void;
};

const TopActionBar: React.FC<TopActionBarProps> = ({
  hasSelection,
  onRefresh,
  onAddUser,
  onEdit,
  onDelete,
  onExport,
  onPrint,
}) => {
  // --- Main Menu Items ---
  const mainMenuItems: MenuProps["items"] = [
    {
      key: "import",
      icon: <ImportOutlined />,
      label: "Import",
    },
    {
      key: "settings",
      icon: <SettingOutlined />,
      label: "List Settings",
    },
  ];

  // --- Actions Menu Items ---
  const actionMenuItems: MenuProps["items"] = [
    {
      key: "edit",
      icon: <EditOutlined />,
      label: "Edit",
      onClick: onEdit,
    },
    {
      key: "export",
      icon: <FileExcelOutlined />,
      label: "Export",
      onClick: onExport,
    },
    {
      key: "print",
      icon: <PrinterOutlined />,
      label: "Print",
      onClick: onPrint,
    },
    {
      key: "delete",
      icon: <DeleteOutlined />,
      label: "Delete",
      onClick: onDelete,
      danger: true,
    },
  ];

  return (
    <div className="flex justify-between items-center p-2 border-b border-gray-200">
      {/* Left side */}
      Title
      {/* Right side - Add/Actions and Menu */}
      <div className="flex items-center gap-2">
        {/* Refresh */}
        <Button
          icon={<ReloadOutlined />}
          onClick={onRefresh}
          className="flex items-center gap-2"
        />
        {/* Three dots menu */}
        <Dropdown menu={{ items: mainMenuItems }} trigger={["click"]}>
          <Button icon={<MoreOutlined />} className="" />
        </Dropdown>
        {/* Conditional Add or Actions */}
        {hasSelection ? (
          <Dropdown menu={{ items: actionMenuItems }} trigger={["click"]}>
            <Button type="primary">Actions</Button>
          </Dropdown>
        ) : (
          <Button type="primary" icon={<PlusOutlined />} onClick={onAddUser}>
            Add User
          </Button>
        )}
      </div>
    </div>
  );
};

export default TopActionBar;
