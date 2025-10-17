import { Table, Input, Select, Button } from "antd";
import { SearchOutlined, ReloadOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import TopActionBar from "../../components/topActionBar";
import { UserRole } from "../../types/user";
import { useTeacherController } from "./teacherController";

const { Option } = Select;

const TeachersPage = ({ role }: { role: UserRole }) => {
  const navigator = useNavigate();
  const { t } = useTranslation();
  const controller = useTeacherController();

  // Define columns
  const columns = [
    {
      title: t("fullName"),
      dataIndex: "fullName",
      render: (_: any, record: any) => `${record.firstName} ${record.lastName}`,
    },
    { title: t("teacherId"), dataIndex: "teacherId" },
    { title: t("subject"), dataIndex: "subject" },
    { title: t("phone"), dataIndex: "phone" },
    { title: t("address"), dataIndex: "address" },
  ];

  return (
    <div className={`${role}`}>
      {/* 🔹 Top Action Bar */}
      <TopActionBar
        title={t("teachers")}
        addBtnText={t("addTeacher")}
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
          <div className="flex items-center gap-3 py-2 border-b border-gray-200">
            {/* Search by full name */}
            <Input
              placeholder={t("searchByTeacherName")}
              prefix={<SearchOutlined />}
              value={controller.searchTerm}
              onChange={(e) => controller.setSearchTerm(e.target.value)}
              allowClear
            />

            {/* Subject filter */}
            <Select
              placeholder={t("filterBySubject")}
              value={controller.subjectFilter}
              onChange={(value) => controller.setSubjectFilter(value)}
              allowClear
              className="min-w-[140px]"
            >
              {controller.subjectList.map((subj) => (
                <Option key={subj} value={subj}>
                  {subj}
                </Option>
              ))}
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
                    record.teacherId!
                  )}&type=teacher`
                );
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

export default TeachersPage;
