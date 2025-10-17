import React from "react";
import { Card, Descriptions, Tag } from "antd";
import { useTranslation } from "react-i18next";
import { CourseType } from "../courseController";

const CourseDetailCard: React.FC<{ course?: CourseType; loading: boolean }> = ({
  course,
  loading,
}) => {
  const { t } = useTranslation();
  return (
    <Card
      className="shadow-sm"
      title={<span className="text-lg font-semibold">{course?.grade}</span>}
      loading={loading}
    >
      <Descriptions column={1} bordered>
        <Descriptions.Item label={t("Grade Level")}>
          {course?.grade || "N/A"}
        </Descriptions.Item>

        <React.Fragment>
          <Descriptions.Item label={`${t("subject")}`}>
            {course?.subject}
          </Descriptions.Item>
          <Descriptions.Item label={t("code")}>
            {course?.code}
          </Descriptions.Item>
          <Descriptions.Item label={t("creditHours")}>
            {course?.creditHours}
          </Descriptions.Item>
          <Descriptions.Item label={t("core")}>
            <Tag color={course?.core ? "green" : "red"}>
              {course?.core ? "Yes" : "No"}
            </Tag>
          </Descriptions.Item>
        </React.Fragment>
      </Descriptions>
    </Card>
  );
};

export default CourseDetailCard;
