// src/pages/course/addCourse/addCourseController.ts
import { useState } from "react";
import { message } from "antd";
import { v4 as uuidv4 } from "uuid";
import { useAxios } from "../../../hooks/useAxios";

export interface CourseType {
  key: string;
  subject: string;
  code: string;
  creditHours: number;
  core: string;
}

export interface CourseFormValues {
  gradeLevel: string | null;
  courses: CourseType[];
}

export const useAddCourseController = () => {
  const [courses, setCourses] = useState<CourseType[]>([]);
  const [loading, setLoading] = useState(false);
  const axios = useAxios();
  const addCourse = () => {
    setCourses((prev) => [
      ...prev,
      { key: uuidv4(), subject: "", code: "", creditHours: 0, core: "" },
    ]);
  };

  const removeCourse = (key: string) => {
    setCourses((prev) => prev.filter((course) => course.key !== key));
  };

  const updateCourse = (key: string, field: keyof CourseType, value: any) => {
    setCourses((prev) =>
      prev.map((course) =>
        course.key === key ? { ...course, [field]: value } : course
      )
    );
  };

  const fetchCoursesByGrade = async (grade: string) => {
    try {
      const res = await axios.get(`/api/courses?grade=${grade}`);
      const fetchedCourses = res.data.map((item: any) => ({
        key: uuidv4(),
        subject: item.subject,
        code: item.code,
        creditHours: item.creditHours,
        course: item.course,
      }));
      setCourses(fetchedCourses);
    } catch (err) {
      message.error("Failed to fetch courses");
      throw err;
    }
  };

  const onSubmit = async (values: CourseFormValues) => {
    try {
      setLoading(true);
      await axios.post("/api/courses", values);
      message.success("Courses added successfully!");
    } catch (err) {
      message.error("Error submitting courses");
    } finally {
      setLoading(false);
    }
  };

  return {
    courses,
    addCourse,
    removeCourse,
    updateCourse,
    fetchCoursesByGrade,
    onSubmit,
    loading,
  };
};
