import React, { useState, useMemo } from "react";
import { Table, Input, Select, Button } from "antd";
import { SearchOutlined, ReloadOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { UserRole } from "../../types/user";
import TopActionBar from "../../components/topActionBar";

const { Option } = Select;

const students = [
  {
    key: 1,
    firstName: "Saba",
    lastName: "Elias",
    grade: "Grade 10",
    status: "Active",
    gender: "Female",
    dob: "11-06-2001",
    birthPlace: "Addis Ababa",
    address: "address",
  },
  {
    key: 2,
    firstName: "Jane",
    lastName: "Yirga",
    grade: "Grade 11",
    status: "Inactive",
    gender: "Male",
    dob: "09-03-2000",
    birthPlace: "Jimma",
    address: "address",
  },
  {
    key: 3,
    firstName: "Kirubel",
    lastName: "Samuel",
    grade: "Grade 10",
    status: "Active",
    gender: "Male",
    dob: "23-02-2000",
    birthPlace: "Addis Ababa",
    address: "address",
  },
];

const StudentsPage = ({ role }: { role: UserRole }) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [gradeFilter, setGradeFilter] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const navigator = useNavigate();
  const { t } = useTranslation();
  // Define columns
  const columns = [
    {
      title: t("fullName"),
      dataIndex: "fullName",
      render: (_: any, record: any) => `${record.firstName} ${record.lastName}`,
    },
    { title: t("grade"), dataIndex: "grade" },
    { title: t("status"), dataIndex: "status" },
    { title: t("gender"), dataIndex: "gender" },
    { title: t("dob"), dataIndex: "dob" },
    { title: t("birthPlace"), dataIndex: "birthPlace" },
    { title: t("address"), dataIndex: "address" },
  ];

  // Filter data by full name, grade, and status
  const filteredData = useMemo(() => {
    return students.filter((student) => {
      const fullName = `${student.firstName} ${student.lastName}`.toLowerCase();
      const matchesSearch = fullName.includes(searchTerm.toLowerCase());
      const matchesGrade = gradeFilter ? student.grade === gradeFilter : true;
      const matchesStatus = statusFilter
        ? student.status === statusFilter
        : true;
      return matchesSearch && matchesGrade && matchesStatus;
    });
  }, [searchTerm, gradeFilter, statusFilter]);

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedKeys: React.Key[]) => setSelectedRowKeys(selectedKeys),
  };

  const resetFilters = () => {
    setSearchTerm("");
    setGradeFilter(null);
    setStatusFilter(null);
  };

  return (
    <div className={`${role}`}>
      {/* 🔹 Top Action Bar */}
      <TopActionBar
        title={t("students")}
        addBtnText={t("addStudent")}
        hasSelection={selectedRowKeys.length > 0}
        onRefresh={() => console.log("Refresh")}
        onAddUser={() => navigator("add")}
        onEdit={() => console.log("Edit", selectedRowKeys)}
        onDelete={() => console.log("Delete", selectedRowKeys)}
        onExport={() => console.log("Export", selectedRowKeys)}
        onPrint={() => console.log("Print", selectedRowKeys)}
      />

      {/* 🔹 Table Section */}
      <div className="flex min-h-screen">
        <div className="px-2 flex-1">
          {/* 🔹 Search & Filter Section */}
          <div className="flex  items-center gap-3  py-2 border-b border-gray-200">
            {/* Search by full name */}
            <Input
              placeholder={t("searchByStudentName")}
              prefix={<SearchOutlined />}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              allowClear
              className=""
            />

            {/* Grade filter */}
            <Select
              placeholder={t("filterByGrade")}
              value={gradeFilter}
              onChange={(value) => setGradeFilter(value)}
              allowClear
              className="min-w-[140px]"
            >
              <Option value="Grade 10">Grade 10</Option>
              <Option value="Grade 11">Grade 11</Option>
              <Option value="Grade 12">Grade 12</Option>
            </Select>

            {/* Status filter */}
            <Select
              placeholder={t("filterByStatus")}
              value={statusFilter}
              onChange={(value) => setStatusFilter(value)}
              allowClear
              className="min-w-[140px]"
            >
              <Option value="Active">Active</Option>
              <Option value="Inactive">Inactive</Option>
            </Select>

            {/* Reset button */}
            <Button icon={<ReloadOutlined />} onClick={resetFilters}>
              {t("clearFilters")}
            </Button>
          </div>

          {/* Table */}
          <Table
            rowSelection={rowSelection}
            dataSource={filteredData}
            columns={columns}
            onRow={(record, rowIndex) => ({
              onClick: () => {
                navigator("detail");
                console.log(record, rowIndex);
              },
            })}
          />
        </div>

        <div className="w-50 border-l border-gray-200"></div>
      </div>
    </div>
  );
};

export default StudentsPage;
