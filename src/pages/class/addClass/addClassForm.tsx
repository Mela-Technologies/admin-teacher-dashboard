// src/pages/class/addClass/AddClassForm.tsx
import React, { useState } from "react";
import { Input, Button, Table, Select, Form } from "antd";
import { ClassFormValues, SectionType } from "./addClassController";
import { useTranslation } from "react-i18next";

const { Option } = Select;

interface Props {
  initialValues: ClassFormValues;
  sections: SectionType[];
  addSection: () => void;
  removeSection: (key: string) => void;
  updateSection: (key: string, field: keyof SectionType, value: any) => void;
  onSubmit: (values: ClassFormValues) => void;
  loading?: boolean;
  editData?: ClassFormValues;
}

const AddClassForm: React.FC<Props> = ({
  initialValues,
  sections,
  addSection,
  removeSection,
  updateSection,
  onSubmit,
  loading,
  editData,
}) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [gradeLevel, setGradeLevel] = useState(initialValues.gradeLevel);
  const [schoolSection, setSchoolSection] = useState<string>("");
  const [isEditable, setIsEditable] = useState(!editData);

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
    setGradeLevel(value);
    setSchoolSection(getSchoolSection(value));
  };

  const handleSubmit = async () => {
    try {
      await form.validateFields();
      const validSections = sections.filter(
        (s) => s.name.trim() && s.capacity > 0 && s.roomNumber.trim()
      );
      onSubmit({ gradeLevel, sections: validSections });
    } catch (err) {
      // Ant Design will highlight invalid inputs automatically
    }
  };

  const sectionColumns = [
    {
      title: t("Section Name"),
      dataIndex: "name",
      render: (text: string, record: SectionType) => (
        <Form.Item
          name={["sections", record.key, "name"]}
          initialValue={text}
          rules={[{ required: true, message: t("Please enter section name") }]}
        >
          <Input
            disabled={!isEditable}
            placeholder={t("Enter Section Name")}
            onChange={(e) => updateSection(record.key, "name", e.target.value)}
          />
        </Form.Item>
      ),
    },
    {
      title: t("Capacity"),
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
          <Input
            disabled={!isEditable}
            type="number"
            min={1}
            placeholder={t("Enter Capacity")}
            onChange={(e) =>
              updateSection(
                record.key,
                "capacity",
                parseInt(e.target.value) || 0
              )
            }
          />
        </Form.Item>
      ),
    },
    {
      title: t("Room Number"),
      dataIndex: "roomNumber",
      render: (text: string, record: SectionType) => (
        <Form.Item
          name={["sections", record.key, "roomNumber"]}
          initialValue={text}
          rules={[{ required: true, message: t("Please enter room number") }]}
        >
          <Input
            disabled={!isEditable}
            placeholder={t("Enter Room Number")}
            onChange={(e) =>
              updateSection(record.key, "roomNumber", e.target.value)
            }
          />
        </Form.Item>
      ),
    },
    {
      title: t("Action"),
      render: (_: any, record: SectionType) =>
        isEditable ? (
          <Button danger onClick={() => removeSection(record.key)}>
            {t("Remove")}
          </Button>
        ) : (
          <Button onClick={() => setIsEditable(true)}>{t("Edit")}</Button>
        ),
    },
  ];

  return (
    <Form form={form} layout="vertical" className="space-y-6">
      {/* 🏫 Grade Info */}
      <div className="p-4 border-gray-200 rounded bg-white shadow-sm space-y-4">
        <h3 className="text-lg font-semibold">{t("Grade Information")}</h3>
        <div className="grid grid-cols-2 gap-4">
          <Form.Item
            label={t("Grade Level")}
            name="gradeLevel"
            rules={[
              { required: true, message: t("Please select grade level") },
            ]}
            initialValue={gradeLevel}
          >
            <Select
              disabled={!isEditable}
              placeholder={t("Select Grade")}
              value={gradeLevel}
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

          <Form.Item label={t("School Section")}>
            <Input
              value={schoolSection}
              disabled
              placeholder={t("Auto determined from grade")}
            />
          </Form.Item>
        </div>
      </div>

      {/* 📋 Sections Table */}
      <div className="p-4 border-gray-200 rounded bg-white shadow-sm">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-semibold">{t("Sections")}</h3>
          {isEditable && (
            <Button type="dashed" onClick={addSection}>
              {t("Add Section")}
            </Button>
          )}
        </div>

        <Table
          dataSource={sections}
          columns={sectionColumns}
          pagination={false}
          rowKey="key"
        />
      </div>

      {/* ✅ Submit */}
      {isEditable && (
        <div className="flex justify-end">
          <Button type="primary" onClick={handleSubmit} loading={loading}>
            {t("Submit")}
          </Button>
        </div>
      )}
    </Form>
  );
};

export default AddClassForm;
