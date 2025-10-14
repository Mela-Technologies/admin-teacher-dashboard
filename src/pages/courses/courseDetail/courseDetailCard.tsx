// src/pages/course/CourseDetailCard.tsx
import React from "react";
import { Descriptions, Tag } from "antd";
import { useTranslation } from "react-i18next";
import { CourseFormValues } from "../courseController";

const CourseDetailCard: React.FC<{ course: CourseFormValues }> = ({
  course,
}) => {
  const { t } = useTranslation();
  return (
    <Descriptions column={1} bordered>
      <Descriptions.Item label={t("Grade Level")}>
        {course.gradeLevel || "N/A"}
      </Descriptions.Item>
      {course.courses.map((c, index) => (
        <React.Fragment key={c.key}>
          <Descriptions.Item label={`${t("subject")} ${index + 1}`}>
            {c.subject}
          </Descriptions.Item>
          <Descriptions.Item label={t("code")}>{c.code}</Descriptions.Item>
          <Descriptions.Item label={t("creditHours")}>
            {c.creditHours}
          </Descriptions.Item>
          <Descriptions.Item label={t("core")}>
            <Tag color={c.core ? "green" : "red"}>{c.core ? "Yes" : "No"}</Tag>
          </Descriptions.Item>
        </React.Fragment>
      ))}
    </Descriptions>
  );
};

export default CourseDetailCard;
