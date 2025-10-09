import React, { useState, useMemo } from "react";
import TopActionBar from "../../../components/topActionBar";
import { Table, Input, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const students = [
  {
    key: 1,
    firstName: "Saba",
    lastName: "Elias",
    gender: "Female",
    dob: "11-06-2001",
    birthPlace: "Addis Ababa",
    address: "address",
  },
  {
    key: 2,
    firstName: "Jane",
    lastName: "Yirga",
    gender: "Male",
    dob: "09-03-2000",
    birthPlace: "Jimma",
    address: "address",
  },
  {
    key: 3,
    firstName: "Kirubel",
    lastName: "Samuel",
    gender: "Male",
    dob: "23-02-2000",
    birthPlace: "Addis Ababa",
    address: "address",
  },
];

const AdminStudentsPage: React.FC = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [selectedColumn, setSelectedColumn] = useState<string>("firstName");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const navigator = useNavigate();
  const columns = [
    { title: "First Name", dataIndex: "firstName" },
    { title: "Last Name", dataIndex: "lastName" },
    { title: "Gender", dataIndex: "gender" },
    { title: "DOB", dataIndex: "dob" },
    { title: "Birth Place", dataIndex: "birthPlace" },
    { title: "Address", dataIndex: "address" },
  ];

  // 🔍 Filtered data based on selected column and search term
  const filteredData = useMemo(() => {
    if (!searchTerm) return students;
    return students.filter((student) => {
      const value = student[selectedColumn as keyof typeof student];
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
        onAddUser={() => navigator("add")}
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
          {/* table */}
          <Table
            rowSelection={rowSelection}
            dataSource={filteredData}
            columns={columns}
            className=""
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

export default AdminStudentsPage;
