import React from "react";
import { Card, Descriptions, Tag } from "antd";
import { useTranslation } from "react-i18next";
import { SectionDetailProps } from "./sectionDetail/sectionDetailController";

export interface ClassDetail {
  gradeLevel: string;
  totalSections: number;
  totalStudents: number;
  status: string;
  classId: string;
}

interface Props {
  classInfo: ClassDetail | SectionDetailProps;
  loading: boolean;
}

const ClassDetailCard: React.FC<Props> = ({ classInfo, loading = false }) => {
  const { t } = useTranslation();
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "green";
      case "inactive":
        return "red";
      default:
        return "blue";
    }
  };

  return (
    <Card
      className="shadow-sm"
      title={
        <span className="text-lg font-semibold">
          {classInfo.gradeLevel} {"name" in classInfo ? classInfo.name : ""}
        </span>
      }
      loading={loading}
    >
      {"classId" in classInfo ? (
        <Descriptions column={1} bordered size="small">
          <Descriptions.Item label={t("Class ID")}>
            {classInfo.classId}
          </Descriptions.Item>

          <Descriptions.Item label={t("Total Sections")}>
            {classInfo.totalSections}
          </Descriptions.Item>

          <Descriptions.Item label={t("Total Students")}>
            {classInfo.totalStudents}
          </Descriptions.Item>

          <Descriptions.Item label={t("status")}>
            <Tag color={getStatusColor(classInfo.status)}>
              {classInfo.status}
            </Tag>
          </Descriptions.Item>
        </Descriptions>
      ) : (
        <Descriptions column={1} bordered size="small">
          <Descriptions.Item label={t("Class ID")}>
            {classInfo.sectionId}
          </Descriptions.Item>

          <Descriptions.Item label={t("totalStudents")}>
            {classInfo.totalStudents}
          </Descriptions.Item>

          <Descriptions.Item label={t("capacity")}>
            {classInfo.capacity}
          </Descriptions.Item>

          {/* <Descriptions.Item label="Status">
          <Tag color={getStatusColor(classInfo.status)}>{classInfo.status}</Tag>
        </Descriptions.Item> */}
        </Descriptions>
      )}
    </Card>
  );
};

export default ClassDetailCard;
