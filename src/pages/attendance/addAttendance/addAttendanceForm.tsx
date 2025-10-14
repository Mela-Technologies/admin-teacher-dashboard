import React from "react";
import { Form, Select, Table, Checkbox } from "antd";
import { useTranslation } from "react-i18next";
import { AttendanceCtrlType } from "../attendanceController";

const { Option } = Select;

interface Props {
  ctrl: AttendanceCtrlType;
}

const AddAttendanceForm: React.FC<Props> = ({ ctrl }) => {
  const { t } = useTranslation();

  const gradeOptions = [
    { label: "Kindergarten", grades: ["KG 1", "KG 2", "KG 3"] },
    {
      label: "Elementary",
      grades: Array.from({ length: 8 }, (_, i) => `Grade ${i + 1}`),
    },
    { label: "High School", grades: ["Grade 9", "Grade 10"] },
    { label: "Preparatory", grades: ["Grade 11", "Grade 12"] },
  ];

  const handleSelectionChange = async () => {
    if (ctrl.grade && ctrl.section && ctrl.subject) {
      ctrl.setIsFetching(true);
      try {
        await ctrl.fetchStudents();
      } finally {
        ctrl.setIsFetching(false);
      }
    }
  };

  const columns = [
    { title: t("ID"), dataIndex: "id" },
    { title: t("fullName"), dataIndex: "fullName" },
    { title: t("grade"), dataIndex: "grade" },
    { title: t("section"), dataIndex: "section" },
    {
      title: t("status"),
      dataIndex: "status",
      render: (_: any, record: any) => (
        <Checkbox
          checked={record.status === "Present"}
          onChange={(e) => ctrl.toggleAttendance(record.id, e.target.checked)}
        >
          {record.status}
        </Checkbox>
      ),
    },
  ];

  return (
    <Form layout="vertical" form={ctrl.form} className="space-y-6">
      <div className="p-4 bg-white border-gray-200 rounded shadow-sm space-y-4">
        <h3 className="text-lg font-semibold">{t("Attendance Info")}</h3>
        <div className="grid grid-cols-3 gap-4">
          <Form.Item
            label={t("grade")}
            name="grade"
            rules={[{ required: true, message: t("Please select grade") }]}
          >
            <Select
              value={ctrl.grade}
              onChange={(val) => {
                ctrl.setGrade(val);
                handleSelectionChange();
              }}
              placeholder={t("Select Grade")}
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

          <Form.Item
            label={t("section")}
            name="section"
            rules={[{ required: true, message: t("Please select section") }]}
          >
            <Select
              placeholder={t("Select Section")}
              onChange={(val) => {
                ctrl.setSection(val);
                handleSelectionChange();
              }}
            >
              {ctrl.sections.map((s) => (
                <Option key={s} value={s}>
                  {s}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label={t("subject")}
            name="subject"
            rules={[{ required: true, message: t("Please select subject") }]}
          >
            <Select
              placeholder={t("Select Subject")}
              onChange={(val) => {
                ctrl.setSubject(val);
                handleSelectionChange();
              }}
            >
              {ctrl.subjects.map((sub) => (
                <Option key={sub} value={sub}>
                  {sub}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </div>
      </div>

      {ctrl.students.length > 0 && (
        <div className="p-4 bg-white border-gray-200 rounded shadow-sm">
          <h3 className="text-lg font-semibold mb-3">
            {t("Attendance Table")}
          </h3>
          <Table
            rowKey="id"
            dataSource={ctrl.students}
            columns={columns}
            pagination={false}
            rowClassName={(record) =>
              record.status === "Absent" ? "bg-red-100" : ""
            }
          />
        </div>
      )}
    </Form>
  );
};

export default AddAttendanceForm;
