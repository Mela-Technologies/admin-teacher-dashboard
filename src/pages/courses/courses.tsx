import React, { useState, useMemo } from "react";
import TopActionBar from "../../components/topActionBar";
import { Table, Input, Select, Button, Tag } from "antd";
import { SearchOutlined, ReloadOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { UserRole } from "../../types/user";

const { Option } = Select;

interface CourseType {
  key: number;
  subject: string;
  code: string;
  creditHours: number;
  core: boolean;
}

const courses: CourseType[] = [
  {
    key: 1,
    subject: "Mathematics I",
    code: "MATH101",
    creditHours: 3,
    core: true,
  },
  {
    key: 2,
    subject: "English Language",
    code: "ENG102",
    creditHours: 2,
    core: true,
  },
  { key: 3, subject: "Physics", code: "PHY103", creditHours: 3, core: false },
  { key: 4, subject: "History", code: "HIS104", creditHours: 2, core: false },
  { key: 5, subject: "Biology", code: "BIO105", creditHours: 3, core: true },
];

const CoursePage = ({ role }: { role: UserRole }) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterCore, setFilterCore] = useState<string | null>(null);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const columns = [
    { title: t("subject"), dataIndex: "subject", key: "subject" },
    { title: t("code"), dataIndex: "code", key: "code" },
    { title: t("creditHours"), dataIndex: "creditHours", key: "creditHours" },
    {
      title: t("core"),
      dataIndex: "core",
      key: "core",
      render: (core: boolean) =>
        core ? (
          <Tag color="green">{t("yes")}</Tag>
        ) : (
          <Tag color="red">{t("no")}</Tag>
        ),
    },
    {
      title: t("action"),
      key: "action",
      render: (_: any, record: CourseType) => (
        <Button
          type="link"
          onClick={() => navigate(`/courses/${record.key}/assign-class`)}
        >
          {t("assignClass")}
        </Button>
      ),
    },
  ];

  // 🔍 Filtered data based on search and filters
  const filteredData = useMemo(() => {
    return courses.filter((course) => {
      const matchesSearch =
        course.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.code.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCore =
        filterCore === "core"
          ? course.core
          : filterCore === "nonCore"
          ? !course.core
          : true;
      return matchesSearch && matchesCore;
    });
  }, [searchTerm, filterCore]);

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedKeys: React.Key[]) => setSelectedRowKeys(selectedKeys),
  };

  const handleResetFilters = () => {
    setSearchTerm("");
    setFilterCore(null);
  };

  return (
    <div>
      {/* 🔹 Top Action Bar */}
      <TopActionBar
        addBtnText="Add New Course"
        title={t("courses")}
        hasSelection={selectedRowKeys.length > 0}
        onRefresh={() => console.log("Refresh")}
        onAddUser={() => navigate("add")}
        onEdit={() => console.log("Edit", role, selectedRowKeys)}
        onDelete={() => console.log("Delete", selectedRowKeys)}
        onExport={() => console.log("Export", selectedRowKeys)}
        onPrint={() => console.log("Print", selectedRowKeys)}
      />

      {/* 🔹 Table Section */}
      <div className="flex min-h-screen">
        <div className="px-2 flex-1">
          {/* 🔹 Search + Filters */}
          <div className="flex items-center gap-3 py-2 border-b border-gray-200">
            {/* Search Input */}
            <Input
              placeholder={t("searchBySubjectOrCode")}
              prefix={<SearchOutlined />}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              allowClear
              className="w-64"
            />

            {/* Core Filter */}
            <Select
              placeholder={t("filterByCore")}
              value={filterCore || undefined}
              onChange={(value) => setFilterCore(value)}
              allowClear
              className="w-40"
            >
              <Option value="core">{t("core")}</Option>
              <Option value="nonCore">{t("nonCore")}</Option>
            </Select>

            {/* Reset Button */}
            <Button
              icon={<ReloadOutlined />}
              onClick={handleResetFilters}
              className="ml-auto"
            >
              {t("resetFilters")}
            </Button>
          </div>

          {/* Table */}
          <Table
            rowSelection={rowSelection}
            dataSource={filteredData}
            columns={columns}
            rowKey="key"
          />
        </div>

        <div className="w-50 border-l border-gray-200"></div>
      </div>
    </div>
  );
};

export default CoursePage;
