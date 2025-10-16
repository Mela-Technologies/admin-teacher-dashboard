import TopActionBar from "../../components/topActionBar";
import { Table, Input, Select, Button, Tag, Card, Skeleton } from "antd";
import {
  SearchOutlined,
  ReloadOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { UserRole } from "../../types/user";
import AddCoursePage from "./addCourse/addCourse";
import { useCourseCtrl } from "./courseController";

const { Option } = Select;

const CoursePage = ({ role }: { role: UserRole }) => {
  const controller = useCourseCtrl();
  const navigator = useNavigate();
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
    // {
    //   title: t("action"),
    //   key: "action",
    //   render: (_: any, record: CourseType) => (
    //     <Space>
    //       <Button
    //         type="link"
    //         onClick={() => console.log("Edit course:", record)}
    //       >
    //         <EditOutlined />
    //       </Button>
    //       <Button
    //         type="link"
    //         danger
    //         onClick={() => console.log("Delete course:", record)}
    //       >
    //         <DeleteOutlined />
    //       </Button>
    //     </Space>
    //   ),
    // },
  ];

  return (
    <div className="h-full">
      {/* 🔹 Top Action Bar */}
      <TopActionBar
        addBtnText="Add New Course"
        title={t("courses")}
        onRefresh={() => controller.setRefresh((prev) => !prev)}
        onAddUser={() => navigator("add")}
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
          value={controller.searchTerm}
          onChange={(e) => controller.setSearchTerm(e.target.value)}
          allowClear
          className="w-64"
        />

        <Select
          placeholder={t("filterByCore")}
          value={controller.filterCore || undefined}
          onChange={(value) => controller.setFilterCore(value)}
          allowClear
          className="w-40"
        >
          <Option value="core">{t("core")}</Option>
          <Option value="nonCore">{t("nonCore")}</Option>
        </Select>

        <Button
          icon={<ReloadOutlined />}
          onClick={controller.handleResetFilters}
          className="ml-auto"
        >
          {t("resetFilters")}
        </Button>
      </div>

      {/* 🔹 Grade Cards Section */}
      <div className="flex flex-col gap-4 p-4 pt-0  h-full overflow-y-auto">
        {controller.loading ? (
          <>
            <Card className="shadow-sm border rounded-lg hover:shadow-md transition-all duration-200">
              <Skeleton active />
            </Card>
            <Card className="shadow-sm border rounded-lg hover:shadow-md transition-all duration-200">
              <Skeleton active />
            </Card>
          </>
        ) : (
          Object.entries(controller.groupedCourses).map(
            ([grade, gradeCourses]) => (
              <Card
                key={grade}
                title={
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-lg text-gray-700">
                      {grade}
                    </span>
                    <div className="flex gap-2">
                      <Button
                        icon={<EditOutlined />}
                        size="small"
                        onClick={() =>
                          controller.handleEdit({
                            gradeLevel: grade,
                            gradeId: "",
                            courses: gradeCourses,
                          })
                        }
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
              >
                <h3 className="text-base font-semibold mb-2">
                  {t("sections")}
                </h3>
                <Table
                  size="small"
                  pagination={false}
                  dataSource={gradeCourses}
                  columns={columns}
                  rowKey="key"
                  onRow={(record, rowIndex) => ({
                    onClick: () => {
                      navigator("detail");
                      console.log(record, rowIndex);
                    },
                  })}
                />
              </Card>
            )
          )
        )}
      </div>
      {controller.isEditModalOpen && (
        <AddCoursePage
          role={role}
          isEditing={true}
          editData={controller.editingClass}
          onClose={() => controller.setIsEditModalOpen(false)}
        />
      )}
    </div>
  );
};

export default CoursePage;
