import React from "react";
import { Input, Button, Table, Select, Form, InputNumber, App } from "antd";
import { AddClassCtrlType, SectionType } from "./addClassController";
import { useTranslation } from "react-i18next";

const { Option } = Select;
interface Props {
  ctrl: AddClassCtrlType;
  isEditing?: boolean;
}
const AddClassForm: React.FC<Props> = ({ ctrl, isEditing = false }) => {
  const { t } = useTranslation();
  const { modal } = App.useApp();
  // Grade grouping
  const gradeOptions = [
    { label: "Kindergarten", grades: ["KG 1", "KG 2", "KG 3"] },
    {
      label: "Elementary",
      grades: Array.from({ length: 8 }, (_, i) => `Grade ${i + 1}`),
    },
    { label: "High School", grades: ["Grade 9", "Grade 10"] },
    { label: "Preparatory", grades: ["Grade 11", "Grade 12"] },
  ];

  // Determine section type from grade
  const getSchoolSection = (grade: string): string => {
    if (grade.startsWith("KG")) return "Kindergarten";
    const num = parseInt(grade.replace("Grade ", ""));
    if (num >= 1 && num <= 8) return "Elementary";
    if (num >= 9 && num <= 10) return "High School";
    if (num >= 11 && num <= 12) return "Preparatory";
    return "";
  };

  const handleGradeChange = (value: string) => {
    ctrl.setGradeLevel(value);
    ctrl.setSchoolSection(getSchoolSection(value));
  };

  const sectionColumns = [
    {
      title: t("sectionName"),
      dataIndex: "name",
      render: (text: string, record: SectionType) => (
        <Form.Item
          name={["sections", record.key, "name"]}
          initialValue={text}
          rules={[{ required: true, message: t("Please enter section name") }]}
        >
          <Select
            disabled={!isEditing && record.existing}
            placeholder={t("Select Section")}
            // value={text}
            onChange={(value) => ctrl.updateSection(record.key, "name", value)}
            style={{ width: "100%" }}
          >
            {Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i)) // A–Z
              .filter(
                (letter) =>
                  !ctrl.sections.some(
                    (s) => s.name === letter && s.key !== record.key
                  )
              )
              .map((letter) => (
                <Option key={letter} value={letter}>
                  {letter}
                </Option>
              ))}
          </Select>
        </Form.Item>
      ),
    },
    {
      title: t("capacity"),
      dataIndex: "capacity",
      render: (value: number, record: SectionType) => (
        <Form.Item
          name={["sections", record.key, "capacity"]}
          initialValue={value}
          rules={[
            { required: true, message: t("Please enter capacity") },
            {
              type: "number",
              min: 1,
              message: t("Capacity must be greater than 0"),
            },
          ]}
        >
          <InputNumber
            disabled={!isEditing && record.existing}
            min={1}
            placeholder={t("Enter Capacity")}
            onChange={(val) =>
              ctrl.updateSection(record.key, "capacity", val || 0)
            }
          />
        </Form.Item>
      ),
    },
    {
      title: t("roomNumber"),
      dataIndex: "roomNumber",
      render: (text: string, record: SectionType) => (
        <Form.Item
          name={["sections", record.key, "roomNumber"]}
          initialValue={text}
          rules={[{ required: true, message: t("Please enter room number") }]}
        >
          <Input
            disabled={!isEditing && record.existing}
            placeholder={t("Enter Room Number")}
            onChange={(e) =>
              ctrl.updateSection(record.key, "roomNumber", e.target.value)
            }
          />
        </Form.Item>
      ),
    },
    {
      title: t("Action"),
      render: (_: any, record: SectionType) =>
        isEditing ? (
          <Button
            danger
            onClick={() => {
              modal.confirm({
                title: t("Are you sure you want to delete this class?"),
                content: t("This action cannot be undone."),
                okText: t("Yes, Delete"),
                okType: "danger",
                cancelText: t("Cancel"),
                centered: true,
                onOk: () => ctrl.deleteClass(record),
              });
            }}
            disabled={!isEditing && record.existing}
            loading={ctrl.loading}
          >
            {t("delete")}
          </Button>
        ) : (
          <Button
            danger
            onClick={() => ctrl.removeSection(record.key)}
            disabled={!isEditing && record.existing}
          >
            {t("Remove")}
          </Button>
        ),
    },
  ];

  return (
    <Form form={ctrl.form} layout="vertical" className="space-y-6">
      {/* 🏫 Grade Info */}
      <div className="p-4 border-gray-200 rounded bg-white shadow-sm space-y-4">
        <h3 className="text-lg font-semibold">{t("Grade Information")}</h3>
        <div className="grid grid-cols-2 gap-4">
          <Form.Item
            label={t("grade")}
            name="gradeLevel"
            rules={[
              { required: true, message: t("Please select grade level") },
            ]}
            initialValue={ctrl.gradeLevel}
          >
            <Select
              placeholder={t("Select Grade")}
              value={ctrl.gradeLevel}
              onChange={handleGradeChange}
            >
              {gradeOptions.map((group) => (
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

          <Form.Item label={t("section")}>
            <Input
              value={ctrl.schoolSection}
              disabled
              placeholder={t("Auto determined from grade")}
            />
          </Form.Item>
        </div>
      </div>

      {/* 📋 Sections Table */}
      <div className="p-4 border-gray-200 rounded bg-white shadow-sm">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-semibold">{t("sections")}</h3>
          <Button disabled={isEditing} type="dashed" onClick={ctrl.addSection}>
            {t("Add Section")}
          </Button>
        </div>

        <Table
          dataSource={ctrl.sections}
          columns={sectionColumns}
          pagination={false}
          rowKey="key"
          loading={ctrl.loading}
        />
      </div>
    </Form>
  );
};

export default AddClassForm;
