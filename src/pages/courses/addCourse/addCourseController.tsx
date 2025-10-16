// src/pages/course/addCourse/addCourseController.ts
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { App, Form, FormInstance } from "antd";
import { v4 as uuidv4 } from "uuid";
import { useAxios } from "../../../hooks/useAxios";
import { CourseType } from "../courseController";

export interface CourseFormValues {
  gradeLevel: string | null;
  courses: CourseType[];
  gradeId?: string;
}
const gradeGroups = [
  { label: "Kindergarten", grades: ["KG 1", "KG 2", "KG 3"] },
  {
    label: "Elementary",
    grades: Array.from({ length: 8 }, (_, i) => `Grade ${i + 1}`),
  },
  { label: "High School", grades: ["Grade 9", "Grade 10"] },
  { label: "Preparatory", grades: ["Grade 11", "Grade 12"] },
];

export const useAddCourseCtrl = (editValues?: CourseFormValues) => {
  const [courses, setCourses] = useState<CourseType[]>(
    editValues?.courses || []
  );
  const [loading, setLoading] = useState(false);
  const [gradeLevel, setGradeLevel] = useState<string | null>(
    editValues?.gradeLevel ?? null
  );
  const [schoolSection, setSchoolSection] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [form] = Form.useForm();
  const [isEditable, setIsEditable] = useState<boolean>(true);
  const [gradeOption, setGradeOption] = useState<
    {
      label: string;
      grades: string[];
    }[]
  >([]);
  const { message } = App.useApp();
  const axios = useAxios();

  useEffect(() => {
    if (gradeLevel) fetchCoursesByGrade();
  }, [gradeLevel]);

  useEffect(() => {
    fetchAllClasses();
  }, []);
  const fetchAllClasses = async () => {
    try {
      setIsFetching(true);
      const res = await axios.get("/api/classes/sections/all");
      const clsData: {
        capacity: number;
        currentStudents: number;
        grade: string;
        id: string | number;
        sectionName: string;
      }[] = res.data.data;
      const uniqueGrades = Array.from(new Set(clsData.map((c) => c.grade)));
      // Group classes by grade categories
      const groupedData = gradeGroups
        .map((group) => ({
          label: group.label,
          grades: group.grades
            .map((g) => uniqueGrades.filter((cls) => cls === g))
            .flat()
            .filter((arr) => arr.length > 0), // remove empty grades
        }))
        .filter((group) => group.grades.length > 0); // remove empty groups

      console.log(groupedData);
      setGradeOption(groupedData);
    } catch (e: any) {
      message.error(e?.message || "Failed to fetch classes");
    } finally {
      setIsFetching(false);
    }
  };

  const addCourse = () => {
    setCourses((prev) => [
      ...prev,
      {
        key: uuidv4(),
        subject: "",
        code: "",
        creditHours: 0,
        core: false,
        existing: false,
      },
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

  const fetchCoursesByGrade = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/api/courses/by/grade/${gradeLevel}`);
      console.log(res.data);
      const coursesData = res.data.courses;
      setCourses(
        coursesData.map((c: any) => ({
          key: uuidv4(),
          subject: c.subject || "",
          code: c.code || "",
          creditHours: c.creditHours || "",
          core: c.core || false,
          courseId: c.id,
          existing: true,
        }))
      );
    } catch (err) {
      message.error(`Failed to fetch courses: ${err}`);
    } finally {
      setLoading(false);
    }
  };

  /** 🔹 Register (create) a new course */
  const register = async () => {
    setLoading(true);
    try {
      console.log(courses);
      const data = courses
        .filter((c) => !c.existing)
        .map((c) => {
          return {
            grade: gradeLevel,
            subject: c.subject,
            code: c.code,
            creditHour: c.creditHours,
            action: "add",
          };
        });
      console.log("Register course:", data);
      await axios.post("/api/courses/bulk", data);
    } catch (error) {
      message.error(`Error registering course: ${error}`);
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

  const deleteCourse = async (c: CourseType) => {
    setLoading(true);
    try {
      console.log("delete course:", c);
      // TODO: replace with API call
      const data = {
        id: c.courseId,
        action: "delete",
      };
      await axios.post("/api/courses/bulk", [data]);
      setCourses((prev) => prev.filter((p) => p.courseId !== c.courseId));
    } catch (error) {
      message.error(`Error deleting class: ${error}`);
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
    gradeOption,
    //
    setGradeLevel,
    schoolSection,
    setSchoolSection,
    isFetching,
    setIsFetching,
    isEditable,
    setIsEditable,
    form,
    deleteCourse,
  };
};

export type AddCourseCtrlType = {
  courses: CourseType[];
  addCourse: () => void;
  removeCourse: (key: string) => void;
  updateCourse: (key: string, field: keyof CourseType, value: any) => void;
  fetchCoursesByGrade: (grade: string) => Promise<void>;
  loading?: boolean;
  editData?: CourseFormValues;
  gradeLevel: string | null;
  register: () => Promise<void>;
  gradeOption: {
    label: string;
    grades: string[];
  }[];
  //
  setGradeLevel: Dispatch<SetStateAction<string | null>>;
  schoolSection: string;
  setSchoolSection: Dispatch<SetStateAction<string>>;
  isFetching: boolean;
  setIsFetching: Dispatch<SetStateAction<boolean>>;
  isEditable: boolean;
  setIsEditable: Dispatch<SetStateAction<boolean>>;
  form: FormInstance<any>;
  deleteCourse: (value: CourseType) => Promise<void>;
};
