// src/pages/class/ClassAdminPage.tsx
import React, { useState, useMemo } from "react";
import TopActionBar from "../../../components/topActionBar";
import { Table, Input, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

interface ClassType {
  key: number;
  grade: string;
  totalSections: number;
  totalStudents: number;
}

const classes: ClassType[] = [
  { key: 1, grade: "Grade 1", totalSections: 3, totalStudents: 90 },
  { key: 2, grade: "Grade 2", totalSections: 2, totalStudents: 60 },
  { key: 3, grade: "Grade 3", totalSections: 4, totalStudents: 120 },
];

const ClassAdminPage: React.FC = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [selectedColumn, setSelectedColumn] = useState<string>("grade");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const navigate = useNavigate();

  const columns = [
    { title: "Grade", dataIndex: "grade" },
    { title: "Total Sections", dataIndex: "totalSections" },
    { title: "Total Students", dataIndex: "totalStudents" },
  ];

  // 🔍 Filtered data based on selected column and search term
  const filteredData = useMemo(() => {
    if (!searchTerm) return classes;
    return classes.filter((cls) => {
      const value = cls[selectedColumn as keyof typeof cls];
      return (
        value &&
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  }, [searchTerm, selectedColumn]);

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedKeys: React.Key[]) => setSelectedRowKeys(selectedKeys),
  };

  return (
    <div>
      {/* 🔹 Top Action Bar */}
      <TopActionBar
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
          {/* 🔹 Filter and Search Section */}
          <div className="flex flex-wrap items-center gap-3 px-3 py-2 border-b border-gray-200 ">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700">
                Filter by:
              </label>
              <Select
                value={selectedColumn}
                onChange={(value) => setSelectedColumn(value)}
                className="min-w-[160px]"
              >
                {columns.map((col) => (
                  <Option key={col.dataIndex} value={col.dataIndex}>
                    {col.title}
                  </Option>
                ))}
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <Input
                placeholder={`Search by ${selectedColumn}`}
                prefix={<SearchOutlined />}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                allowClear
                className="w-64"
              />
            </div>
          </div>

          {/* 🔹 Table */}
          <Table
            rowSelection={rowSelection}
            dataSource={filteredData}
            columns={columns}
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
