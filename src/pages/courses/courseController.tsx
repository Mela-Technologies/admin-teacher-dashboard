// src/pages/course/courseController.ts
import { useEffect, useMemo, useState } from "react";
import { message } from "antd";
import { useAxios } from "../../hooks/useAxios";
import { CourseFormValues } from "./addCourse/addCourseController";
import { UserRole } from "../../types/user";

export interface CourseType {
  key: string;
  subject: string;
  code: string;
  creditHours: number;
  core: boolean;
  grade?: number | string;
  courseId?: string;
  existing?: boolean;
  section?: string;
  color?: string;
}
const getColorByIndex = (index: number): string => {
  const colors = [
    "#0284c7",
    "#16a34a",
    "#f59e0b",
    "#dc2626",
    "#9333ea",
    "#0ea5e9",
  ];
  return colors[index % colors.length];
};
export const useCourseCtrl = (role?: UserRole) => {
  const [courses, setCourses] = useState<CourseType[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterCore, setFilterCore] = useState<string | null>(null);
  const axios = useAxios();
  const [editingClass, setEditingClass] = useState<CourseFormValues>();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    fetchCourses();
  }, [refresh]);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const endpoint =
        role === "teacher"
          ? `/api/courses/teacher/viewall`
          : `/api/courses/viewall`;

      const res = await axios.get(endpoint);
      const courseData = res.data.data.data;

      setCourses(
        courseData.map((c: any, index: number) => ({
          key: `${Date.now()}_${index}`,
          subject: c.course_name,
          code: c.course_code,
          creditHours: c.credit_hours,
          core: c.is_core ?? true,
          grade: c.class?.grade || "-",
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

  const handleEdit = (record: CourseFormValues) => {
    const data: CourseFormValues = {
      gradeLevel: record.gradeLevel,
      courses: record.courses.map((r, index) => ({ ...r, key: `${index}` })),
      gradeId: record.gradeId,
    };
    setEditingClass(data);
    setIsEditModalOpen(true);
  };

  const filteredData = useMemo(() => {
    return courses.filter((course) => {
      const matchesSearch =
        course.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.code.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCore =
        filterCore === "core"
          ? course.core
          : filterCore === "nonCore"
          ? !course.core
          : true;
      return matchesSearch && matchesCore;
    });
  }, [searchTerm, filterCore, courses]);

  const groupedCourses = useMemo(() => {
    const groups: Record<string, CourseType[]> = {};
    filteredData.forEach((course) => {
      const gradeNum = course.grade!;
      if (!groups[gradeNum]) groups[gradeNum] = [];
      groups[gradeNum].push(course);
    });
    return groups;
  }, [filteredData]);

  const handleResetFilters = () => {
    setSearchTerm("");
    setFilterCore(null);
  };

  // ----------------------
  // TeacherCourse Controller
  // -----------------------

  const teacherCoursesData: CourseType[] = [
    {
      key: "1",
      subject: "Mathematics",
      code: "MTH101",
      creditHours: 3,
      grade: "Grade 10",
      section: "A",
      core: false,
    },
    {
      key: "2",
      subject: "Mathematics",
      code: "MTH201",
      creditHours: 4,
      grade: "Grade 11",
      section: "B",
      core: false,
    },
    {
      key: "3",
      subject: "Mathematics",
      code: "MTH102",
      creditHours: 2,
      grade: "Grade 9",
      section: "C",
      core: false,
    },
    {
      key: "4",
      subject: "Mathematics",
      code: "MTH301",
      creditHours: 3,
      grade: "Grade 12",
      section: "A",
      core: false,
    },
  ].map((course, i) => ({
    ...course,
    color: getColorByIndex(i),
  }));

  const filteredCourses = useMemo(() => {
    return teacherCoursesData.filter((c) =>
      c.subject.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, teacherCoursesData, refresh]);

  return {
    courses,
    loading,
    searchTerm,
    filterCore,
    editingClass,
    isEditModalOpen,
    refresh,
    //
    setCourses,
    setLoading,
    setSearchTerm,
    setFilterCore,
    setRefresh,
    groupedCourses,
    filteredData,
    handleResetFilters,
    setEditingClass,
    setIsEditModalOpen,
    handleEdit,
    filteredCourses,
    teacherCoursesData,
  };
};

export type CourseCtrlType = ReturnType<typeof useCourseCtrl>;
