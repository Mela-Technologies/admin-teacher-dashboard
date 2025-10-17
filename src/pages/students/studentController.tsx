import { App } from "antd";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { useAxios } from "../../hooks/useAxios";
interface StudentType {
  key: number;
  firstName: string;
  lastName: string;
  grade: string;
  status: string;
  gender: string;
  dob: string;
  birthPlace: string;
  address: string;
  studentId?: string | number;
  existing?: boolean;
}

export const useStudentController = () => {
  const [students, setStudents] = useState<StudentType[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [gradeFilter, setGradeFilter] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const { message } = App.useApp();
  const axios = useAxios();
  useEffect(() => {
    fetchCourses();
  }, [refresh]);
  const fetchCourses = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/api/students/student/list`);
      console.log(res.data);
      const studentsData = res.data;
      setStudents(
        studentsData.map((s, i: number) => ({
          key: i,
          firstName: s.firstName,
          lastName: s.lastName,
          grade: s.grade,
          status: "Active",
          gender: s.gender,
          dob: s.dob ? new Date(s.dob).toDateString() : "-",
          birthPlace: s.birthPlace,
          address: s.address,
          studentId: s.id,
        }))
      );
    } catch (err) {
      message.error(`Failed to fetch students: ${err}`);
    } finally {
      setLoading(false);
    }
  };
  // Filter data by full name, grade, and status
  const filteredData = useMemo(() => {
    return students.filter((student) => {
      const fullName = `${student.firstName} ${student.lastName}`.toLowerCase();
      const matchesSearch = fullName.includes(searchTerm.toLowerCase());
      const matchesGrade = gradeFilter ? student.grade === gradeFilter : true;
      const matchesStatus = statusFilter
        ? student.status === statusFilter
        : true;
      return matchesSearch && matchesGrade && matchesStatus;
    });
  }, [searchTerm, gradeFilter, statusFilter, students]);

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedKeys: React.Key[]) => setSelectedRowKeys(selectedKeys),
  };

  const resetFilters = () => {
    setSearchTerm("");
    setGradeFilter(null);
    setStatusFilter(null);
  };

  return {
    selectedRowKeys,
    searchTerm,
    gradeFilter,
    statusFilter,
    loading,
    refresh,
    //
    setSelectedRowKeys,
    setSearchTerm,
    setGradeFilter,
    setStatusFilter,
    setLoading,
    setRefresh,
    //
    filteredData,
    rowSelection,
    resetFilters,
  };
};

export type StudentControllerType = {
  selectedRowKeys: React.Key[];
  searchTerm: string;
  gradeFilter: string | null;
  statusFilter: string | null;
  loading: boolean;
  refresh: boolean;
  //
  setSelectedRowKeys: Dispatch<SetStateAction<React.Key[]>>;
  setSearchTerm: Dispatch<SetStateAction<string>>;
  setGradeFilter: Dispatch<SetStateAction<string | null>>;
  setStatusFilter: Dispatch<SetStateAction<string | null>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setRefresh: Dispatch<SetStateAction<boolean>>;
  //
  filteredData: any;
  rowSelection: {
    selectedRowKeys: React.Key[];
    onChange: (selectedKeys: React.Key[]) => void;
  };
  resetFilters: () => void;
};
