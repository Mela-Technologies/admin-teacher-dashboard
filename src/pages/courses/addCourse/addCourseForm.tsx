import React from "react";
import { Button, Table, Select, Form, Input, App } from "antd";
import { useTranslation } from "react-i18next";
import { AddCourseCtrlType } from "./addCourseController";
import { CourseType } from "../courseController";

const { Option } = Select;

interface Props {
  ctrl: AddCourseCtrlType;
  isEditing: boolean;
}

const AddCourseForm: React.FC<Props> = ({ ctrl, isEditing }) => {
  const { t } = useTranslation();
  const { modal } = App.useApp();
  const getSchoolSection = (grade: string): string => {
    if (grade.startsWith("KG")) return "Kindergarten";
    const num = parseInt(grade.replace("Grade ", ""));
    if (num >= 1 && num <= 8) return "Elementary";
    if (num >= 9 && num <= 10) return "High School";
    if (num >= 11 && num <= 12) return "Preparatory";
    return "";
  };
  const handleGradeChange = async (value: string) => {
    ctrl.setGradeLevel(value);
    ctrl.setSchoolSection(getSchoolSection(value));
  };
  const courseColumns = [
    {
      title: t("Subject"),
      dataIndex: "subject",
      render: (text: string, record: CourseType) => (
        <Form.Item
          name={["courses", record.key, "subject"]}
          initialValue={text}
          rules={[{ required: true, message: t("Please enter subject") }]}
          validateTrigger="onBlur"
        >
          <Input
            disabled={!isEditing && record.existing}
            placeholder={t("Enter subject")}
            onChange={(e) =>
              ctrl.updateCourse(record.key, "subject", e.target.value)
            }
          />
        </Form.Item>
      ),
    },
    {
      title: t("Code"),
      dataIndex: "code",
      render: (text: string, record: CourseType) => (
        <Form.Item
          name={["courses", record.key, "code"]}
          initialValue={text}
          rules={[{ required: true, message: t("Please enter code") }]}
          validateTrigger="onBlur"
        >
          <Input
            disabled={!isEditing && record.existing}
            placeholder={t("Enter code")}
            onChange={(e) =>
              ctrl.updateCourse(record.key, "code", e.target.value)
            }
          />
        </Form.Item>
      ),
    },
    {
      title: t("Credit Hours"),
      dataIndex: "creditHours",
      render: (value: number, record: CourseType) => (
        <Form.Item
          name={["courses", record.key, "creditHours"]}
          initialValue={value}
          rules={[{ required: true, message: t("Select credit hours") }]}
        >
          <Select
            disabled={!isEditing && record.existing}
            placeholder={t("Credit Hours")}
            onChange={(val) =>
              ctrl.updateCourse(record.key, "creditHours", val)
            }
          >
            {Array.from({ length: 9 }, (_, i) => (
              <Option key={i} value={i}>
                {i}
              </Option>
            ))}
          </Select>
        </Form.Item>
      ),
    },
    {
      title: t("Core Type"),
      dataIndex: "coreType",
      render: (text: string, record: CourseType) => (
        <Form.Item
          name={["courses", record.key, "coreType"]}
          initialValue={text}
          // rules={[{ required: true, message: t("Please select course type") }]}
        >
          <Select
            disabled={!isEditing && record.existing}
            placeholder={t("Select Type")}
            onChange={(val) => ctrl.updateCourse(record.key, "core", val)}
          >
            <Option value="Core">{t("Core")}</Option>
            <Option value="Elective">{t("Elective")}</Option>
          </Select>
        </Form.Item>
      ),
    },
    {
      title: t("Action"),
      render: (_: any, record: CourseType) => (
        <>
          {record.existing ? (
            <Button
              disabled={!isEditing && record.existing}
              danger
              onClick={() =>
                modal.confirm({
                  title: t("Are you sure you want to delete this class?"),
                  content: t("This action cannot be undone."),
                  okText: t("Yes, Delete"),
                  okType: "danger",
                  cancelText: t("Cancel"),
                  centered: true,
                  onOk: () => ctrl.deleteCourse(record),
                })
              }
            >
              {t("delete")}
            </Button>
          ) : (
            <Button
              disabled={!isEditing && record.existing}
              onClick={() => ctrl.removeCourse(record.key)}
            >
              {t("Remove")}
            </Button>
          )}
        </>
      ),
    },
  ];

  return (
    <Form form={ctrl.form} layout="vertical" className="space-y-6">
      {/* Grade Info */}
      <div className="p-4 border-gray-200 rounded bg-white shadow-sm space-y-4">
        <h3 className="text-lg font-semibold">{t("Grade Information")}</h3>
        <div className="grid grid-cols-2 gap-4">
          <Form.Item
            label={t("Grade Level")}
            name={"gradeLevel"}
            rules={[
              { required: true, message: t("Please select grade level") },
            ]}
            initialValue={ctrl.gradeLevel}
            // validateTrigger="onChange"
          >
            <Select
              placeholder={t("Select Grade")}
              value={ctrl.gradeLevel}
              onChange={handleGradeChange}
              disabled={!ctrl.isEditable}
              loading={ctrl.isFetching || ctrl.loading}
            >
              {ctrl.gradeOption.map((group) => (
                <Select.OptGroup key={group.label} label={group.label}>
                  {group.grades.map((grade) => (
                    <Option key={grade} value={grade}>
                      {grade}
                    </Option>
                  ))}
                </Select.OptGroup>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label={t("School Section")}>
            <Input value={ctrl.schoolSection} disabled />
          </Form.Item>
        </div>
      </div>

      {/* Course Table */}
      <div className="p-4 border-gray-200 rounded bg-white shadow-sm">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-semibold">{t("Course")}</h3>
          {ctrl.isEditable && (
            <Button
              type="dashed"
              disabled={isEditing || ctrl.loading}
              onClick={ctrl.addCourse}
            >
              {t("Add Course")}
            </Button>
          )}
        </div>
        <Table
          dataSource={ctrl.courses}
          columns={courseColumns}
          pagination={false}
          rowKey="key"
          loading={ctrl.loading}
        />
      </div>
    </Form>
  );
};

export default AddCourseForm;
