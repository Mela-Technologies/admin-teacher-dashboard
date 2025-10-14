import React, { useState, useMemo } from "react";
import { Table, Select, Button, DatePicker } from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import TopActionBar from "../../components/topActionBar";
import dayjs from "dayjs";
import { UserRole } from "../../types/user";
import AttendanceDetailModal from "./attendanceDetail.tsx/attendanceDetail";
import useAttendanceCtrl from "./attendanceController";

const { Option } = Select;

const attendanceData = [
  {
    key: 1,
    grade: "Grade 10",
    section: "A",
    subject: "Mathematics",
    date: "2025-10-10",
    presentPercent: 95,
  },
  {
    key: 2,
    grade: "Grade 11",
    section: "B",
    subject: "Physics",
    date: "2025-10-12",
    presentPercent: 88,
  },
  {
    key: 3,
    grade: "Grade 10",
    section: "A",
    subject: "English",
    date: "2025-10-13",
    presentPercent: 92,
  },
  {
    key: 4,
    grade: "Grade 12",
    section: "C",
    subject: "Biology",
    date: "2025-10-11",
    presentPercent: 90,
  },
];

const AttendancePage = ({ role }: { role: UserRole }) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [gradeFilter, setGradeFilter] = useState<string | null>(null);
  const [subjectFilter, setSubjectFilter] = useState<string | null>(null);
  const [dateFilter, setDateFilter] = useState<string | null>(null);
  const navigator = useNavigate();
  const { t } = useTranslation();
  const controller = useAttendanceCtrl();
  // Table columns
  const columns = [
    { title: t("grade"), dataIndex: "grade" },
    { title: t("section"), dataIndex: "section" },
    { title: t("subject"), dataIndex: "subject" },
    {
      title: t("date"),
      dataIndex: "date",
      sorter: (a: any, b: any) => dayjs(b.date).unix() - dayjs(a.date).unix(),
      defaultSortOrder: "descend" as const,
      render: (date: string) => dayjs(date).format("YYYY-MM-DD"),
    },
    {
      title: t("Present %"),
      dataIndex: "presentPercent",
      render: (value: number) => `${value}%`,
    },
  ];

  // Apply filters
  const filteredData = useMemo(() => {
    return attendanceData
      .filter((item) => (gradeFilter ? item.grade === gradeFilter : true))
      .filter((item) => (subjectFilter ? item.subject === subjectFilter : true))
      .filter((item) =>
        dateFilter ? dayjs(item.date).isSame(dayjs(dateFilter), "day") : true
      )
      .sort(
        (a, b) => dayjs(b.date).unix() - dayjs(a.date).unix() // Sort by date desc
      );
  }, [gradeFilter, subjectFilter, dateFilter]);

  const resetFilters = () => {
    setGradeFilter(null);
    setSubjectFilter(null);
    setDateFilter(null);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedKeys: React.Key[]) => setSelectedRowKeys(selectedKeys),
  };

  return (
    <div className={`${role}`}>
      {/* 🔹 Top Action Bar */}
      <TopActionBar
        title={t("Attendance Records")}
        addBtnText={t("Add Attendance")}
        onAddUser={() => navigator("add")}
        hasSelection={selectedRowKeys.length > 0}
        onRefresh={() => console.log("Refresh")}
        onPrint={() => console.log("Print")}
      />

      {/* 🔹 Table Section */}
      <div className="flex min-h-screen">
        <div className="px-2 flex-1">
          {/* 🔹 Filter Section */}
          <div className="flex items-center gap-3 py-2 border-b border-gray-200">
            {/* Date Filter */}
            <DatePicker
              placeholder={t("Filter by Date")}
              value={dateFilter ? dayjs(dateFilter) : null}
              onChange={(date) =>
                setDateFilter(date ? date.format("YYYY-MM-DD") : null)
              }
              allowClear
              className="min-w-[160px]"
            />

            {/* Grade Filter */}
            <Select
              placeholder={t("Filter by Grade")}
              value={gradeFilter}
              onChange={(value) => setGradeFilter(value)}
              allowClear
              className="min-w-[160px]"
            >
              <Option value="Grade 10">Grade 10</Option>
              <Option value="Grade 11">Grade 11</Option>
              <Option value="Grade 12">Grade 12</Option>
            </Select>

            {/* Subject Filter */}
            <Select
              placeholder={t("Filter by Subject")}
              value={subjectFilter}
              onChange={(value) => setSubjectFilter(value)}
              allowClear
              className="min-w-[160px]"
            >
              <Option value="Mathematics">Mathematics</Option>
              <Option value="Physics">Physics</Option>
              <Option value="English">English</Option>
              <Option value="Biology">Biology</Option>
            </Select>

            {/* Reset button */}
            <Button icon={<ReloadOutlined />} onClick={resetFilters}>
              {t("Clear Filters")}
            </Button>
          </div>

          {/* Table */}
          <Table
            rowSelection={rowSelection}
            dataSource={filteredData}
            columns={columns}
            pagination={{ pageSize: 10 }}
            onRow={(record, rowIndex) => ({
              onClick: () => {
                controller.setSelectedAttendance({
                  subject: record.subject,
                  date: record.date,
                  presentCount: Math.round((record.presentPercent / 100) * 30),
                  absentCount:
                    30 - Math.round((record.presentPercent / 100) * 30),
                });
                controller.setIsAttendanceModalVisible(true);
                console.log(record, rowIndex);
              },
            })}
          />
        </div>
        {/* summary */}
        <div className="w-50 border-l border-gray-200"></div>
        <AttendanceDetailModal
          isVisible={controller.isAttendanceModalVisible}
          onClose={() => controller.setIsAttendanceModalVisible(false)}
          selectedAttendance={controller.selectedAttendance}
          studentDetails={controller.studentDetails}
        />
      </div>
    </div>
  );
};

export default AttendancePage;
