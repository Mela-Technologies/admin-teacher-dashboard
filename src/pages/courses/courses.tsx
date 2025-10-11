import { useState, useMemo } from "react";
import TopActionBar from "../../components/topActionBar";
import { Table, Input, Select, Button, Tag, Card, Space } from "antd";
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

interface CourseType {
  key: number;
  subject: string;
  code: string;
  creditHours: number;
  core: boolean;
  grade: number;
}

const courses: CourseType[] = [
  {
    key: 1,
    subject: "Mathematics I",
    code: "MATH101",
    creditHours: 3,
    core: true,
    grade: 10,
  },
  {
    key: 2,
    subject: "English Language",
    code: "ENG102",
    creditHours: 2,
    core: true,
    grade: 10,
  },
  {
    key: 3,
    subject: "Physics",
    code: "PHY103",
    creditHours: 3,
    core: false,
    grade: 11,
  },
  {
    key: 4,
    subject: "History",
    code: "HIS104",
    creditHours: 2,
    core: false,
    grade: 12,
  },
  {
    key: 5,
    subject: "Biology",
    code: "BIO105",
    creditHours: 3,
    core: true,
    grade: 11,
  },
];

const CoursePage = ({ role }: { role: UserRole }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterCore, setFilterCore] = useState<string | null>(null);
  const navigate = useNavigate();
  const { t } = useTranslation();

  // 🔹 Table columns
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
        <Space>
          <Button
            type="link"
            onClick={() => console.log("Edit course:", record)}
          >
            <EditOutlined />
          </Button>
          <Button
            type="link"
            danger
            onClick={() => console.log("Delete course:", record)}
          >
            <DeleteOutlined />
          </Button>
        </Space>
      ),
    },
  ];

  // 🔹 Filter and search logic
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

  // 🔹 Group courses by grade
  const groupedCourses = useMemo(() => {
    const groups: Record<number, CourseType[]> = {};
    filteredData.forEach((course) => {
      if (!groups[course.grade]) groups[course.grade] = [];
      groups[course.grade].push(course);
    });
    return groups;
  }, [filteredData]);

  const handleResetFilters = () => {
    setSearchTerm("");
    setFilterCore(null);
  };

  return (
    <div className="h-full">
      {/* 🔹 Top Action Bar */}
      <TopActionBar
        addBtnText="Add New Course"
        title={t("courses")}
        onRefresh={() => console.log("Refresh")}
        onAddUser={() => navigate("add")}
        onEdit={() => console.log("Edit", role)}
        onDelete={() => console.log("Delete")}
        onExport={() => console.log("Export")}
        onPrint={() => console.log("Print")}
      />

      {/* 🔹 Filters Section */}
      <div className="flex items-center gap-3 py-2 px-3 border-b border-gray-200">
        <Input
          placeholder={t("searchBySubjectOrCode")}
          prefix={<SearchOutlined />}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          allowClear
          className="w-64"
        />

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

        <Button
          icon={<ReloadOutlined />}
          onClick={handleResetFilters}
          className="ml-auto"
        >
          {t("resetFilters")}
        </Button>
      </div>

      {/* 🔹 Grade Cards Section */}
      <div className="flex flex-col gap-4 p-4 pt-0  h-full overflow-y-auto">
        {Object.entries(groupedCourses).map(([grade, gradeCourses]) => (
          <Card
            key={grade}
            title={
              <div className="flex justify-between items-center">
                <span className="font-semibold text-lg text-gray-700">
                  {t("grade")} {grade}
                </span>
                <div className="flex gap-2">
                  <Button
                    icon={<EditOutlined />}
                    size="small"
                    onClick={() => console.log("Edit Grade", grade)}
                  />
                  <Button
                    icon={<DeleteOutlined />}
                    danger
                    size="small"
                    onClick={() => console.log("Delete Grade", grade)}
                  />
                </div>
              </div>
            }
            className="shadow-sm rounded-xl border border-gray-200"
            bodyStyle={{ padding: "16px" }}
          >
            <h3 className="text-base font-semibold mb-2">{t("sections")}</h3>
            <Table
              size="small"
              pagination={false}
              dataSource={gradeCourses}
              columns={columns}
              rowKey="key"
            />
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CoursePage;
