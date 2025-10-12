// src/pages/course/addCourse/addCourseController.ts
import { useState } from "react";
import { Form, message } from "antd";
import { v4 as uuidv4 } from "uuid";
import { useAxios } from "../../../hooks/useAxios";
import { CourseType } from "../courses";

export interface CourseFormValues {
  gradeLevel: string | null;
  courses: CourseType[];
  gradeId?: string;
}

export const useAddCourseController = (editValues?: CourseFormValues) => {
  const [courses, setCourses] = useState<CourseType[]>([]);
  const [loading, setLoading] = useState(false);
  const [gradeLevel, setGradeLevel] = useState<string | null>(
    editValues?.gradeLevel ?? null
  );
  const [schoolSection, setSchoolSection] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [form] = Form.useForm();
  const [isEditable, setIsEditable] = useState<boolean>(true);
  const axios = useAxios();

  const addCourse = () => {
    setCourses((prev) => [
      ...prev,
      { key: uuidv4(), subject: "", code: "", creditHours: 0, core: false },
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

  /** 🔹 Register (create) a new course */
  const register = async (values: CourseFormValues) => {
    setLoading(true);
    try {
      console.log("Register course:", { ...values });
      // TODO: replace with API call
      // await axios.post("/api/courses", { ...values, sections });
    } catch (error) {
      console.error("Error registering course:", error);
    } finally {
      setLoading(false);
    }
  };

  /** 🔹 Update an existing course */
  const update = async (values: CourseFormValues) => {
    if (!values.gradeId) {
      console.warn("Missing grade ID for update.");
      return;
    }

    setLoading(true);
    try {
      console.log("Update course:", { ...values });
      // TODO: replace with API call
      // await axios.put(`/api/courses/${values.id}`, { ...values, sections });
    } catch (error) {
      console.error("Error updating course:", error);
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
    loading,
    update,
    register,
    gradeLevel,
    setGradeLevel,
    schoolSection,
    setSchoolSection,
    isFetching,
    setIsFetching,
    isEditable,
    setIsEditable,
    form,
  };
};
