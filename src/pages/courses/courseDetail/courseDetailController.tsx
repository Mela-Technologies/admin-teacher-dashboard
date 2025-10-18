import { App, Form } from "antd";
import React, { useEffect, useState } from "react";
import { CourseType } from "../courseController";
import { useAxios } from "../../../hooks/useAxios";

export const useCourseDetailCtrl = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [course, setCourse] = useState<CourseType>();
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();
  const { message } = App.useApp();
  const axios = useAxios();
  const queryParams = new URLSearchParams(location.search);
  const courseId = queryParams.get("id");
  const [teachers, setTeachers] = useState([
    {
      key: "1",
      fullName: "Mr. Daniel Bekele",
      section: "A",
      subject: course?.subject || "Mathematics",
      grade: course?.grade,
    },
  ]);
  useEffect(() => {
    fetchCourseDetail();
  }, []);
  const fetchCourseDetail = async () => {
    try {
      setIsLoading(true);
      const res1 = await axios.get(`/api/courses/view/${courseId}`);
      const courseData = res1.data.data;
      setCourse({
        key: "1",
        subject: courseData.course_name,
        code: courseData.course_code,
        creditHours: courseData.credit_hours,
        core: false,
        grade: courseData.class.grade,
        courseId: courseData.id,
        existing: true,
      });
      console.log(courseData);
    } catch (e: any) {
      message.error(e?.message || "Failed to fetch courses");
    } finally {
      setIsLoading(false);
    }
  };
  return {
    selectedRowKeys,
    isModalVisible,
    form,
    teachers,
    isLoading,
    course,
    //
    setSelectedRowKeys,
    setIsModalVisible,
    setTeachers,
  };
};
export type CourseDetailCtrlType = ReturnType<typeof useCourseDetailCtrl>;
