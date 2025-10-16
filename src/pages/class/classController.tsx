import { useEffect, useMemo, useState } from "react";
import { ClassFormValues } from "./addClass/addClassController";
import { App } from "antd";
import { useAxios } from "../../hooks/useAxios";
interface SectionType {
  name: string;
  roomNumber: string;
  capacity: number;
  students: number;
  sectionId: string | number;
}

interface ClassType {
  key: number | string;
  gradeId?: string;
  gradeLevel: string;
  totalSections?: number;
  totalStudents?: number;
  status?: string;
  sections: SectionType[];
}

const useClassController = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [classes, setClasses] = useState<ClassType[]>([]);
  const [filterGrade, setFilterGrade] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  // Editing values
  const [editingClass, setEditingClass] = useState<ClassFormValues>();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const { message } = App.useApp();
  const axios = useAxios();
  const handleEdit = (record: ClassType) => {
    const data: ClassFormValues = {
      gradeLevel: record.gradeLevel,
      sections: record.sections.map((r, index) => ({ ...r, key: `${index}` })),
      gradeId: record.gradeId,
    };
    setEditingClass(data);
    setIsEditModalOpen(true);
  };

  useEffect(() => {
    fetchClasses();
  }, [refresh]);
  const fetchClasses = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get("/api/classes/sections/all");
      console.log(res);
      const clsData: {
        capacity: number;
        currentStudents: number;
        grade: string;
        id: string | number;
        sectionName: string;
      }[] = res.data.data;

      // ✅ Group classes by grade
      const groupedClasses: ClassType[] = [];

      clsData.forEach((cls) => {
        const existingIndex = groupedClasses.findIndex(
          (g) => g.gradeLevel === cls.grade
        );

        if (existingIndex !== -1) {
          // grade already exists → push section
          groupedClasses[existingIndex].sections.push({
            name: cls.sectionName,
            roomNumber: "",
            capacity: cls.capacity,
            students: cls.currentStudents,
            sectionId: cls.id,
          });
        } else {
          // grade doesn’t exist → create new group
          groupedClasses.push({
            key: Date.now().toString() + groupedClasses.length,
            gradeLevel: cls.grade,
            sections: [
              {
                name: cls.sectionName,
                roomNumber: "",
                capacity: cls.capacity,
                students: cls.currentStudents,
                sectionId: cls.id,
              },
            ],
          });
        }
      });

      groupedClasses.sort((a, b) => a.gradeLevel.localeCompare(b.gradeLevel));
      setClasses(groupedClasses);
      console.log("Grouped Classes:", groupedClasses);
    } catch (e: any) {
      message.error(e?.message || "Failed to fetch classes");
    } finally {
      setIsLoading(false);
    }
  };
  // 🔍 Filtered data based on search + dropdowns
  const filteredData = useMemo(() => {
    const val = classes.filter((cls) => {
      const matchesSearch = cls.gradeLevel
        ?.toLowerCase()
        ?.includes(searchTerm.toLowerCase());
      const matchesGrade = filterGrade ? cls.gradeLevel === filterGrade : true;
      const matchesStatus = filterStatus ? cls.status === filterStatus : true;
      return matchesSearch && matchesGrade && matchesStatus;
    });
    console.log(val);
    return val;
  }, [searchTerm, filterGrade, filterStatus, isLoading]);

  const handleResetFilters = () => {
    setSearchTerm("");
    setFilterGrade(null);
    setFilterStatus(null);
  };

  return {
    classes,
    setClasses,
    searchTerm,
    setSearchTerm,
    filterGrade,
    setFilterGrade,
    filterStatus,
    setFilterStatus,
    editingClass,
    setEditingClass,
    isEditModalOpen,
    setIsEditModalOpen,
    handleEdit,
    filteredData,
    handleResetFilters,
    isLoading,
    setIsLoading,
    refresh,
    setRefresh,
  };
};

export default useClassController;
