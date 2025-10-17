import { App } from "antd";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { useAxios } from "../../hooks/useAxios";

interface TeacherType {
  key: number;
  firstName: string;
  lastName: string;
  subject: string;
  phone: string;
  address: string;
  teacherId?: string | number;
}

export const useTeacherController = () => {
  const [teachers, setTeachers] = useState<TeacherType[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [subjectFilter, setSubjectFilter] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [subjectList, setSubjectList] = useState<string[]>([]);
  const { message } = App.useApp();
  const axios = useAxios();

  useEffect(() => {
    fetchTeachers();
  }, [refresh]);

  const fetchTeachers = async () => {
    try {
      setLoading(true);
      //   const res = await axios.get(`/api/teachers/teacher/list`);
      //   const teachersData = res.data;

      //   const mapped = teachersData.map((t: any, i: number) => ({
      //     key: i,
      //     firstName: t.firstName,
      //     lastName: t.lastName,
      //     subject: t.subject,
      //     phone: t.phone,
      //     address: t.address,
      //     teacherId: t.id,
      //   }));
      const teachersData = [
        {
          key: 1,
          firstName: "Teacher1",
          lastName: "Last",
          subject: "Math",
          phone: "251 9090909",
          address: "Addis Ababa",
          teacherId: "TI-01",
        },
      ];
      setTeachers([
        {
          key: 1,
          firstName: "Teacher1",
          lastName: "Last",
          subject: "Math",
          phone: "251 9090909",
          address: "Addis Ababa",
          teacherId: "TI-01",
        },
      ]);

      // Extract unique subjects for filtering
      const uniqueSubjects = [
        ...new Set(teachersData.map((t: any) => t.subject).filter(Boolean)),
      ];
      setSubjectList(uniqueSubjects);
    } catch (err) {
      message.error(`Failed to fetch teachers: ${err}`);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Filtered data by name and subject
  const filteredData = useMemo(() => {
    return teachers.filter((teacher) => {
      const fullName = `${teacher.firstName} ${teacher.lastName}`.toLowerCase();
      const matchesSearch = fullName.includes(searchTerm.toLowerCase());
      const matchesSubject = subjectFilter
        ? teacher.subject === subjectFilter
        : true;
      return matchesSearch && matchesSubject;
    });
  }, [searchTerm, subjectFilter, teachers]);

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedKeys: React.Key[]) => setSelectedRowKeys(selectedKeys),
  };

  const resetFilters = () => {
    setSearchTerm("");
    setSubjectFilter(null);
  };

  return {
    selectedRowKeys,
    searchTerm,
    subjectFilter,
    loading,
    refresh,
    subjectList,
    //
    setSelectedRowKeys,
    setSearchTerm,
    setSubjectFilter,
    setLoading,
    setRefresh,
    //
    filteredData,
    rowSelection,
    resetFilters,
  };
};

export type TeacherControllerType = {
  selectedRowKeys: React.Key[];
  searchTerm: string;
  subjectFilter: string | null;
  loading: boolean;
  refresh: boolean;
  subjectList: string[];
  //
  setSelectedRowKeys: Dispatch<SetStateAction<React.Key[]>>;
  setSearchTerm: Dispatch<SetStateAction<string>>;
  setSubjectFilter: Dispatch<SetStateAction<string | null>>;
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
