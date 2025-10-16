import TopActionBar from "../../components/topActionBar";
import { Table, Input, Select, Button, Card, Row, Col, Skeleton } from "antd";
import {
  SearchOutlined,
  ReloadOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { UserRole } from "../../types/user";
import AddClassPage from "./addClass/addClass";
import useClassController from "./classController";

const { Option } = Select;

const ClassPage = ({ role }: { role: UserRole }) => {
  const navigator = useNavigate();
  const { t } = useTranslation();
  const controller = useClassController();
  // Section Table Columns
  const sectionColumns = [
    { title: t("name"), dataIndex: "name", key: "name" },
    { title: t("roomNumber"), dataIndex: "roomNumber", key: "roomNumber" },
    { title: t("capacity"), dataIndex: "capacity", key: "capacity" },
    { title: t("students"), dataIndex: "students", key: "students" },
  ];

  return (
    <div className="h-full">
      {/* 🔹 Top Action Bar */}
      <TopActionBar
        title={t("classes")}
        addBtnText={t("Add Class")}
        hasSelection={false}
        onRefresh={() => controller.setRefresh((prev) => !prev)}
        onAddUser={() => navigator("add")}
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
          value={controller.searchTerm}
          onChange={(e) => controller.setSearchTerm(e.target.value)}
          allowClear
          className="w-64"
        />

        <Select
          placeholder={t("filterByGrade")}
          value={controller.filterGrade || undefined}
          onChange={(value) => controller.setFilterGrade(value)}
          allowClear
          className="w-40"
        >
          {[...new Set(controller.classes.map((cls) => cls.gradeLevel))].map(
            (grade) => (
              <Option key={grade} value={grade ?? ""}>
                {grade}
              </Option>
            )
          )}
        </Select>

        <Button
          icon={<ReloadOutlined />}
          onClick={controller.handleResetFilters}
          className="ml-auto"
        >
          {t("resetFilters")}
        </Button>
      </div>

      {/* 🔹 Cards Layout */}
      <div className="p-4 pt-0 space-y-6 flex flex-col gap-4  min-h-screen h-full overflow-y-auto">
        {controller.isLoading ? (
          <>
            <Card className="shadow-sm border rounded-lg hover:shadow-md transition-all duration-200">
              <Skeleton active />
            </Card>
            <Card className="shadow-sm border rounded-lg hover:shadow-md transition-all duration-200">
              <Skeleton active />
            </Card>
          </>
        ) : (
          controller.filteredData.map((cls) => (
            <Card
              key={cls.key}
              className="shadow-sm border rounded-lg hover:shadow-md transition-all duration-200"
              title={
                <Row justify="space-between" align="middle">
                  <Col>
                    <h2 className="text-lg font-semibold text-gray-700">
                      {cls.gradeLevel}
                    </h2>
                  </Col>
                  <Col>
                    <div className="flex gap-2">
                      <Button
                        icon={<EditOutlined />}
                        size="small"
                        onClick={() => controller.handleEdit(cls)}
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
                onRow={(record, rowIndex) => ({
                  onClick: () => {
                    navigator(
                      `detail?id=${encodeURIComponent(
                        record.sectionId
                      )}&type=section`
                    );
                    console.log(record, rowIndex);
                  },
                })}
              />
            </Card>
          ))
        )}
      </div>
      {controller.isEditModalOpen && (
        <AddClassPage
          role={role}
          isEditing={true}
          editData={controller.editingClass}
          onClose={() => controller.setIsEditModalOpen(false)}
        />
      )}
    </div>
  );
};

export default ClassPage;
