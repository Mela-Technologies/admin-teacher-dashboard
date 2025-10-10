import React, { useState, useMemo } from "react";
import TopActionBar from "../../components/topActionBar";
import { Table, Input, Select, Button, Card, Row, Col } from "antd";
import {
  SearchOutlined,
  ReloadOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { UserRole } from "../../types/user";

const { Option } = Select;

interface SectionType {
  name: string;
  roomNumber: string;
  capacity: number;
  students: number;
}

interface ClassType {
  key: number;
  grade: string;
  totalSections: number;
  totalStudents: number;
  status: string;
  sections: SectionType[];
}

const classes: ClassType[] = [
  {
    key: 1,
    grade: "Grade 1",
    totalSections: 3,
    totalStudents: 90,
    status: "Active",
    sections: [
      { name: "A", roomNumber: "101", capacity: 30, students: 28 },
      { name: "B", roomNumber: "102", capacity: 30, students: 30 },
      { name: "C", roomNumber: "103", capacity: 30, students: 32 },
    ],
  },
  {
    key: 2,
    grade: "Grade 2",
    totalSections: 2,
    totalStudents: 60,
    status: "Inactive",
    sections: [
      { name: "A", roomNumber: "201", capacity: 30, students: 25 },
      { name: "B", roomNumber: "202", capacity: 30, students: 35 },
    ],
  },
  {
    key: 3,
    grade: "Grade 3",
    totalSections: 4,
    totalStudents: 120,
    status: "Active",
    sections: [
      { name: "A", roomNumber: "301", capacity: 30, students: 28 },
      { name: "B", roomNumber: "302", capacity: 30, students: 31 },
      { name: "C", roomNumber: "303", capacity: 30, students: 30 },
      { name: "D", roomNumber: "304", capacity: 30, students: 31 },
    ],
  },
];

const ClassPage = ({ role }: { role: UserRole }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterGrade, setFilterGrade] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const navigate = useNavigate();
  const { t } = useTranslation();

  // Section Table Columns
  const sectionColumns = [
    { title: t("name"), dataIndex: "name", key: "name" },
    { title: t("roomNumber"), dataIndex: "roomNumber", key: "roomNumber" },
    { title: t("capacity"), dataIndex: "capacity", key: "capacity" },
    { title: t("students"), dataIndex: "students", key: "students" },
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

  const handleResetFilters = () => {
    setSearchTerm("");
    setFilterGrade(null);
    setFilterStatus(null);
  };

  return (
    <div className="h-full">
      {/* 🔹 Top Action Bar */}
      <TopActionBar
        title={t("classes")}
        hasSelection={false}
        onRefresh={() => console.log("Refresh")}
        onAddUser={() => navigate("add")}
        onEdit={() => console.log("Edit", role)}
        onDelete={() => console.log("Delete")}
        onExport={() => console.log("Export")}
        onPrint={() => console.log("Print")}
      />

      {/* 🔹 Filter + Search Section */}
      <div className="flex items-center w-[80%] gap-3 py-2 border-b border-gray-200 px-4  sticky top-0 z-10">
        <Input
          placeholder={t("searchByGrade")}
          prefix={<SearchOutlined />}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          allowClear
          className="w-64"
        />

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

        <Button
          icon={<ReloadOutlined />}
          onClick={handleResetFilters}
          className="ml-auto"
        >
          {t("resetFilters")}
        </Button>
      </div>

      {/* 🔹 Cards Layout */}
      <div className="p-4 pt-0 space-y-6 flex flex-col gap-4  min-h-screen h-full overflow-y-auto">
        {filteredData.map((cls) => (
          <Card
            key={cls.key}
            className="shadow-sm border rounded-lg hover:shadow-md transition-all duration-200"
            title={
              <Row justify="space-between" align="middle">
                <Col>
                  <h2 className="text-lg font-semibold text-gray-700">
                    {cls.grade}
                  </h2>
                </Col>
                <Col>
                  <div className="flex gap-2">
                    <Button
                      icon={<EditOutlined />}
                      size="small"
                      onClick={() => console.log("Edit", cls)}
                    />
                    <Button
                      icon={<DeleteOutlined />}
                      danger
                      size="small"
                      onClick={() => console.log("Delete", cls)}
                    />
                  </div>
                </Col>
              </Row>
            }
          >
            <div className="pb-2 font-medium text-gray-600 text-sm">
              {t("sections")}
            </div>
            <Table
              columns={sectionColumns}
              dataSource={cls.sections}
              pagination={false}
              rowKey="name"
              size="small"
              bordered
            />
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ClassPage;
