import React, { useState, useMemo } from "react";
import TopActionBar from "../../../components/topActionBar";
import { Table, Input, Select, Button } from "antd";
import { SearchOutlined, ReloadOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const { Option } = Select;

interface ClassType {
  key: number;
  grade: string;
  totalSections: number;
  totalStudents: number;
  status: string;
}

const classes: ClassType[] = [
  {
    key: 1,
    grade: "Grade 1",
    totalSections: 3,
    totalStudents: 90,
    status: "Active",
  },
  {
    key: 2,
    grade: "Grade 2",
    totalSections: 2,
    totalStudents: 60,
    status: "Inactive",
  },
  {
    key: 3,
    grade: "Grade 3",
    totalSections: 4,
    totalStudents: 120,
    status: "Active",
  },
  {
    key: 4,
    grade: "Grade 4",
    totalSections: 3,
    totalStudents: 80,
    status: "Active",
  },
];

const ClassAdminPage: React.FC = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterGrade, setFilterGrade] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const columns = [
    { title: t("grade"), dataIndex: "grade" },
    { title: t("totalSections"), dataIndex: "totalSections" },
    { title: t("totalStudents"), dataIndex: "totalStudents" },
    { title: t("status"), dataIndex: "status" },
  ];

  // 🔍 Filtered data based on search + dropdowns
  const filteredData = useMemo(() => {
    return classes.filter((cls) => {
      const matchesSearch = cls.grade
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesGrade = filterGrade ? cls.grade === filterGrade : true;
      const matchesStatus = filterStatus ? cls.status === filterStatus : true;
      return matchesSearch && matchesGrade && matchesStatus;
    });
  }, [searchTerm, filterGrade, filterStatus]);

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedKeys: React.Key[]) => setSelectedRowKeys(selectedKeys),
  };

  const handleResetFilters = () => {
    setSearchTerm("");
    setFilterGrade(null);
    setFilterStatus(null);
  };

  return (
    <div>
      {/* 🔹 Top Action Bar */}
      <TopActionBar
        title={t("classes")}
        hasSelection={selectedRowKeys.length > 0}
        onRefresh={() => console.log("Refresh")}
        onAddUser={() => navigate("add")}
        onEdit={() => console.log("Edit", selectedRowKeys)}
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
              placeholder={t("searchByGrade")}
              prefix={<SearchOutlined />}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              allowClear
              className="w-64"
            />

            {/* Grade Filter */}
            <Select
              placeholder={t("filterByGrade")}
              value={filterGrade || undefined}
              onChange={(value) => setFilterGrade(value)}
              allowClear
              className="w-40"
            >
              {[...new Set(classes.map((cls) => cls.grade))].map((grade) => (
                <Option key={grade} value={grade}>
                  {grade}
                </Option>
              ))}
            </Select>

            {/* Status Filter */}
            <Select
              placeholder={t("filterByStatus")}
              value={filterStatus || undefined}
              onChange={(value) => setFilterStatus(value)}
              allowClear
              className="w-40"
            >
              <Option value="Active">Active</Option>
              <Option value="Inactive">Inactive</Option>
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
            onRow={(record) => ({
              onClick: () => {
                navigate("detail");
                console.log(record);
              },
            })}
          />
        </div>

        <div className="w-50 border-l border-gray-200"></div>
      </div>
    </div>
  );
};

export default ClassAdminPage;
