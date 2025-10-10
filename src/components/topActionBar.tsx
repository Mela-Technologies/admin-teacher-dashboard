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
import { useTranslation } from "react-i18next";

type TopActionBarProps = {
  hasSelection: boolean;
  onRefresh: () => void;
  onAddUser?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onExport?: () => void;
  onPrint?: () => void;
  title?: string;
  addBtnText?: string;
};

const TopActionBar: React.FC<TopActionBarProps> = ({
  hasSelection,
  onRefresh,
  onAddUser,
  onEdit,
  onDelete,
  onExport,
  onPrint,
  title,
  addBtnText,
}) => {
  const { t } = useTranslation();
  // --- Main Menu Items ---
  const mainMenuItems: MenuProps["items"] = [
    {
      key: "import",
      icon: <ImportOutlined />,
      label: t("import"),
    },
    {
      key: "settings",
      icon: <SettingOutlined />,
      label: t("listSettings"),
    },
  ];

  // --- Actions Menu Items ---
  const actionMenuItems: MenuProps["items"] = [
    {
      key: "edit",
      icon: <EditOutlined />,
      label: t("edit"),
      onClick: onEdit,
    },
    {
      key: "export",
      icon: <FileExcelOutlined />,
      label: t("export"),
      onClick: onExport,
    },
    {
      key: "print",
      icon: <PrinterOutlined />,
      label: t("print"),
      onClick: onPrint,
    },
    {
      key: "delete",
      icon: <DeleteOutlined />,
      label: t("delete"),
      onClick: onDelete,
      danger: true,
    },
  ];

  return (
    <div className="flex justify-between items-center p-2 border-b border-gray-200">
      {/* Left side */}
      {title ?? t("titleHere")}
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
            {addBtnText ?? "Add"}
          </Button>
        )}
      </div>
    </div>
  );
};

export default TopActionBar;
