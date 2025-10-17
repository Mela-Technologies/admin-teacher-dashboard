import { Table, Input, Select, Button } from "antd";
import { SearchOutlined, ReloadOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { UserRole } from "../../types/user";
import TopActionBar from "../../components/topActionBar";
import { useStudentController } from "./studentController";

const { Option } = Select;

const StudentsPage = ({ role }: { role: UserRole }) => {
  const navigator = useNavigate();
  const { t } = useTranslation();
  const controller = useStudentController();
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

  return (
    <div className={`${role}`}>
      {/* 🔹 Top Action Bar */}
      <TopActionBar
        title={t("students")}
        addBtnText={t("addStudent")}
        hasSelection={controller.selectedRowKeys.length > 0}
        onRefresh={() => controller.setRefresh((prev) => !prev)}
        onAddUser={() => navigator("add")}
        onEdit={() => console.log("Edit", controller.selectedRowKeys)}
        onDelete={() => console.log("Delete", controller.selectedRowKeys)}
        onExport={() => console.log("Export", controller.selectedRowKeys)}
        onPrint={() => console.log("Print", controller.selectedRowKeys)}
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
              value={controller.searchTerm}
              onChange={(e) => controller.setSearchTerm(e.target.value)}
              allowClear
              className=""
            />

            {/* Grade filter */}
            <Select
              placeholder={t("filterByGrade")}
              value={controller.gradeFilter}
              onChange={(value) => controller.setGradeFilter(value)}
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
              value={controller.statusFilter}
              onChange={(value) => controller.setStatusFilter(value)}
              allowClear
              className="min-w-[140px]"
            >
              <Option value="Active">Active</Option>
              <Option value="Inactive">Inactive</Option>
            </Select>

            {/* Reset button */}
            <Button icon={<ReloadOutlined />} onClick={controller.resetFilters}>
              {t("clearFilters")}
            </Button>
          </div>

          {/* Table */}
          <Table
            rowSelection={controller.rowSelection}
            dataSource={controller.filteredData}
            columns={columns}
            loading={controller.loading}
            onRow={(record, rowIndex) => ({
              onClick: () => {
                navigator(
                  `detail?id=${encodeURIComponent(
                    record.studentId!
                  )}&type=student`
                );
                console.log(record, rowIndex);
              },
            })}
          />
        </div>
        {/* summary */}
        <div className="w-50 border-l border-gray-200"></div>
      </div>
    </div>
  );
};

export default StudentsPage;
