import { useEffect } from "react";
import { Table, Input, Select, Button, message, Spin } from "antd";
import {
  ArrowLeftOutlined,
  EditOutlined,
  PrinterOutlined,
  ReloadOutlined,
  SaveOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { useResultCtrl } from "./resultController";

const { Option } = Select;

const ResultPage = () => {
  const { t } = useTranslation();
  const ctrl = useResultCtrl();

  useEffect(() => {
    ctrl.fetchResults();
  }, []);

  const handlePrint = () => {
    message.success(t("Printing selected results..."));
  };

  const handleEdit = () => {
    ctrl.setEditing(!ctrl.editing);
    message.info(
      ctrl.editing ? t("Editing disabled") : t("Editing mode enabled")
    );
  };

  return (
    <div className="px-3  h-full">
      {/* 🔹 Top Action Bar */}
      <div className="flex justify-between items-center py-2  border-b border-gray-200  rounded-md">
        <Button
          icon={<ArrowLeftOutlined />}
          onClick={() => window.history.back()}
        >
          {t("Back")}
        </Button>

        <div className="flex gap-3">
          <Button icon={<ReloadOutlined />} onClick={() => ctrl.fetchResults()}>
            {t("Refresh")}
          </Button>
          <Button
            icon={ctrl.editing ? <SaveOutlined /> : <EditOutlined />}
            type={ctrl.editing ? "primary" : "default"}
            onClick={handleEdit}
          >
            {ctrl.editing ? t("save") : t("edit")}
          </Button>
          <Button
            icon={<PrinterOutlined />}
            type="dashed"
            disabled={ctrl.selectedRowKeys.length === 0}
            onClick={handlePrint}
          >
            {t("Print")}
          </Button>
        </div>
      </div>

      {/* 🔹 Search & Filter */}
      <div className="flex flex-wrap items-center gap-3 py-3  rounded-md  border-b border-gray-200">
        <Input
          placeholder={t("Search by student name")}
          prefix={<SearchOutlined />}
          value={ctrl.searchTerm}
          onChange={(e) => ctrl.setSearchTerm(e.target.value)}
          allowClear
          className="max-w-xs"
        />

        <Select
          placeholder={t("Filter by Gender")}
          value={ctrl.filterGender}
          onChange={(value) => ctrl.setFilterGender(value)}
          allowClear
          className="w-44"
        >
          <Option value="Male">{t("Male")}</Option>
          <Option value="Female">{t("Female")}</Option>
        </Select>
      </div>

      {/* 🔹 Table */}
      <div className="mt-4 bg-white rounded-md shadow-sm p-2">
        {ctrl.loading ? (
          <div className="text-center py-10">
            <Spin size="large" />
          </div>
        ) : (
          <Table
            rowSelection={{
              selectedRowKeys: ctrl.selectedRowKeys,
              onChange: (keys) => ctrl.setSelectedRowKeys(keys),
            }}
            dataSource={ctrl.filteredResults}
            columns={ctrl.columns}
            pagination={false}
            rowClassName={(record) =>
              record.total < record.maxTotal / 2 ? "bg-red-50" : ""
            }
            bordered
            rowKey="key"
            size="middle"
          />
        )}
      </div>
    </div>
  );
};

export default ResultPage;
