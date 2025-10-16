import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { message } from "antd";
import { useAxios } from "../../hooks/useAxios";
import { CourseFormValues } from "./addCourse/addCourseController";
export interface CourseType {
  key: string;
  subject: string;
  code: string;
  creditHours: number;
  core: boolean;
  grade?: number | string;
  courseId?: string;
  existing?: boolean;
}

export const useCourseCtrl = () => {
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
      const res = await axios.get(`/api/courses/viewall`);
      console.log(res.data);
      const courseData = res.data.data.data;
      setCourses(
        courseData.map((c: any, index: number) => ({
          key: Date.now().toString() + index,
          subject: c.course_name,
          code: c.course_code,
          creditHours: c.credit_hours,
          core: true,
          grade: c.class.grade || "-",
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
  // 🔹 Filter and search logic
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

  // 🔹 Group courses by grade
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
    handleResetFilters,
    setEditingClass,
    setIsEditModalOpen,
    handleEdit,
  };
};

export type CourseCtrlType = {
  courses: CourseType[];
  loading: boolean;
  searchTerm: string;
  filterCore: string | null;
  editingClass: CourseFormValues | undefined;
  isEditModalOpen: boolean;
  //
  setCourses: Dispatch<SetStateAction<CourseType[]>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setSearchTerm: Dispatch<SetStateAction<string>>;
  setFilterCore: Dispatch<SetStateAction<string | null>>;
  setRefresh: Dispatch<SetStateAction<boolean>>;
  groupedCourses: Record<number, CourseType[]>;
  handleResetFilters: () => void;
  setEditingClass: Dispatch<SetStateAction<CourseFormValues | undefined>>;
  setIsEditModalOpen: Dispatch<SetStateAction<boolean>>;
  handleEdit: (record: CourseFormValues) => void;
};
