// src/pages/course/CourseDetailCard.tsx
import React from "react";
import { Descriptions, Tag } from "antd";
import { CourseFormValues } from "../addCourse/addCourseController";

const CourseDetailCard: React.FC<{ course: CourseFormValues }> = ({
  course,
}) => {
  return (
    <Descriptions column={1} bordered>
      <Descriptions.Item label="Grade Level">
        {course.gradeLevel || "N/A"}
      </Descriptions.Item>
      {course.courses.map((c, index) => (
        <React.Fragment key={c.key}>
          <Descriptions.Item label={`Subject ${index + 1}`}>
            {c.subject}
          </Descriptions.Item>
          <Descriptions.Item label="Code">{c.code}</Descriptions.Item>
          <Descriptions.Item label="Credit Hours">
            {c.creditHours}
          </Descriptions.Item>
          <Descriptions.Item label="Core">
            <Tag color={c.core ? "green" : "red"}>{c.core ? "Yes" : "No"}</Tag>
          </Descriptions.Item>
        </React.Fragment>
      ))}
    </Descriptions>
  );
};

export default CourseDetailCard;
