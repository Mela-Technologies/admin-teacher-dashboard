// src/pages/course/addCourse/AddCourseForm.tsx
import React, { Dispatch, SetStateAction } from "react";
import { Button, Table, Select, Form, Input, FormInstance } from "antd";
import { CourseFormValues, CourseType } from "./addCourseController";
import { useTranslation } from "react-i18next";

const { Option } = Select;

interface Props {
  initialValues?: CourseFormValues;
  courses: CourseType[];
  addCourse: () => void;
  removeCourse: (key: string) => void;
  updateCourse: (key: string, field: keyof CourseType, value: any) => void;
  fetchCoursesByGrade: (grade: string) => Promise<void>;
  loading?: boolean;
  editData?: CourseFormValues;
  gradeLevel: string | null;
  setGradeLevel: Dispatch<SetStateAction<string | null>>;
  schoolSection: string;
  setSchoolSection: Dispatch<SetStateAction<string>>;
  isFetching: boolean;
  setIsFetching: Dispatch<SetStateAction<boolean>>;
  isEditable: boolean;
  setIsEditable: Dispatch<SetStateAction<boolean>>;
  form: FormInstance<any>;
}

const AddCourseForm: React.FC<Props> = ({
  courses,
  addCourse,
  removeCourse,
  updateCourse,
  fetchCoursesByGrade,
  gradeLevel,
  setGradeLevel,
  schoolSection,
  setSchoolSection,
  isFetching,
  setIsFetching,
  isEditable,
  setIsEditable,
  form,
}) => {
  const { t } = useTranslation();

  // Grade options
  const gradeOptions = [
    { label: "Kindergarten", grades: ["KG 1", "KG 2", "KG 3"] },
    {
      label: "Elementary",
      grades: Array.from({ length: 8 }, (_, i) => `Grade ${i + 1}`),
    },
    { label: "High School", grades: ["Grade 9", "Grade 10"] },
    { label: "Preparatory", grades: ["Grade 11", "Grade 12"] },
  ];

  const getSchoolSection = (grade: string): string => {
    if (grade.startsWith("KG")) return "Kindergarten";
    const num = parseInt(grade.replace("Grade ", ""));
    if (num >= 1 && num <= 8) return "Elementary";
    if (num >= 9 && num <= 10) return "High School";
    if (num >= 11 && num <= 12) return "Preparatory";
    return "";
  };

  const handleGradeChange = async (value: string) => {
    setGradeLevel(value);
    const section = getSchoolSection(value);
    setSchoolSection(section);

    setIsFetching(true);
    try {
      await fetchCoursesByGrade(value);
    } finally {
      setIsFetching(false);
    }
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
            disabled={!isEditable}
            placeholder={t("Enter subject")}
            onChange={(e) =>
              updateCourse(record.key, "subject", e.target.value)
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
            disabled={!isEditable}
            placeholder={t("Enter code")}
            onChange={(e) => updateCourse(record.key, "code", e.target.value)}
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
            disabled={!isEditable}
            placeholder={t("Credit Hours")}
            onChange={(val) => updateCourse(record.key, "creditHours", val)}
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
          rules={[{ required: true, message: t("Please select course type") }]}
        >
          <Select
            disabled={!isEditable}
            placeholder={t("Select Type")}
            onChange={(val) => updateCourse(record.key, "subject", val)}
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
          {isEditable ? (
            <Button danger onClick={() => removeCourse(record.key)}>
              {t("Remove")}
            </Button>
          ) : (
            <Button onClick={() => setIsEditable(true)}>{t("Edit")}</Button>
          )}
        </>
      ),
    },
  ];

  return (
    <Form form={form} layout="vertical" className="space-y-6">
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
            initialValue={gradeLevel}
            // validateTrigger="onChange"
          >
            <Select
              placeholder={t("Select Grade")}
              value={gradeLevel}
              onChange={handleGradeChange}
              disabled={!isEditable}
              loading={isFetching}
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
            <Input value={schoolSection} disabled />
          </Form.Item>
        </div>
      </div>

      {/* Course Table */}
      <div className="p-4 border-gray-200 rounded bg-white shadow-sm">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-semibold">{t("Sections")}</h3>
          {isEditable && (
            <Button type="dashed" onClick={addCourse}>
              {t("Add Course")}
            </Button>
          )}
        </div>
        <Table
          dataSource={courses}
          columns={courseColumns}
          pagination={false}
          rowKey="key"
        />
      </div>
    </Form>
  );
};

export default AddCourseForm;
