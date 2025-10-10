// src/pages/class/addClass/AddClassForm.tsx
import React from "react";
import { Input, Button, Table } from "antd";
import { ClassFormValues, SectionType } from "./addClassController";
import { useTranslation } from "react-i18next";

interface Props {
  initialValues: ClassFormValues;
  sections: SectionType[];
  addSection: () => void;
  removeSection: (key: string) => void;
  updateSection: (key: string, field: keyof SectionType, value: any) => void;
  onSubmit: (values: ClassFormValues) => void;
  loading?: boolean;
}

const AddClassForm: React.FC<Props> = ({
  initialValues,
  sections,
  addSection,
  removeSection,
  updateSection,
  onSubmit,
  loading,
}) => {
  const [gradeLevel, setGradeLevel] = React.useState(initialValues.gradeLevel);
  const [otherData, setOtherData] = React.useState(initialValues.otherData);
  const { t } = useTranslation();
  const handleSubmit = () => {
    onSubmit({ gradeLevel, otherData, sections });
  };

  const sectionColumns = [
    {
      title: t("sectionName"),
      dataIndex: "name",
      render: (text: string, record: SectionType) => (
        <Input
          value={text}
          onChange={(e) => updateSection(record.key, "name", e.target.value)}
          placeholder={t("sectionName")}
        />
      ),
    },
    {
      title: t("capacity"),
      dataIndex: "capacity",
      render: (text: number, record: SectionType) => (
        <Input
          type="number"
          value={text}
          onChange={(e) =>
            updateSection(record.key, "capacity", parseInt(e.target.value) || 0)
          }
          placeholder={t("capacity")}
        />
      ),
    },
    {
      title: t("roomNumber"),
      dataIndex: "roomNumber",
      render: (text: string, record: SectionType) => (
        <Input
          value={text}
          onChange={(e) =>
            updateSection(record.key, "roomNumber", e.target.value)
          }
          placeholder={t("roomNumber")}
        />
      ),
    },
    {
      title: "Action",
      render: (_: any, record: SectionType) => (
        <Button danger onClick={() => removeSection(record.key)}>
          {t("remove")}
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Grade Info */}
      <div className="p-4 border-gray-200 rounded bg-white shadow-sm space-y-4">
        <h3 className="text-lg font-semibold">{t("Grade Information")}</h3>
        <div>
          <label className="block mb-1 font-medium">Grade Level</label>
          <Input
            value={gradeLevel}
            onChange={(e) => setGradeLevel(e.target.value)}
            placeholder={t("Enter grade level")}
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Other Data</label>
          <Input
            value={otherData}
            onChange={(e) => setOtherData(e.target.value)}
            placeholder="Other important data"
          />
        </div>
      </div>

      {/* Sections Table */}
      <div className="p-4 border-gray-200 rounded bg-white shadow-sm">
        <h3 className="text-lg font-semibold mb-3">Sections</h3>
        <Button type="dashed" onClick={addSection} className="mb-3">
          {t("Add Section")}
        </Button>
        <Table
          dataSource={sections}
          columns={sectionColumns}
          pagination={false}
          rowKey="key"
        />
      </div>

      <div className="flex justify-end">
        <Button type="primary" onClick={handleSubmit} loading={loading}>
          {t("Submit")}
        </Button>
      </div>
    </div>
  );
};

export default AddClassForm;
