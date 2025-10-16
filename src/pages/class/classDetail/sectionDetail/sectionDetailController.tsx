import { useState, useMemo, Dispatch, SetStateAction, useEffect } from "react";
import dayjs from "dayjs";
import { App } from "antd";
import { useAxios } from "../../../../hooks/useAxios";
interface Student {
  key: string;
  fullName: string;
  gender: string;
}

interface Timetable {
  key: string;
  day: string;
  subject: string;
  period: string;
}
export interface SectionDetailProps {
  sectionId: string;
  gradeLevel: string;
  roomNumber?: string;
  capacity?: number;
  totalStudents?: number;
  name: string;
}
export const useSectionDetailController = () => {
  const [isStudentModalVisible, setIsStudentModalVisible] = useState(false);
  const [isAttendanceModalVisible, setIsAttendanceModalVisible] =
    useState(false);
  const [selectedSection, setSelectedSection] = useState<any | null>(null);
  const [selectedAttendance, setSelectedAttendance] = useState<any | null>(
    null
  );
  const [selectedSectionFilter, setSelectedSectionFilter] = useState<string>();
  const [selectedDateFilter, setSelectedDateFilter] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);
  const [students, setStudents] = useState<Student[]>([]);
  const [timetable, setTimetable] = useState<Timetable[]>([]);
  const [sectionInfo, setSectionInfo] = useState<SectionDetailProps>({
    gradeLevel: "",
    name: "",
    sectionId: "",
  });
  const { message } = App.useApp();
  const axios = useAxios();
  const queryParams = new URLSearchParams(location.search);
  const sectionId = queryParams.get("id");
  // const students: Student[] = [
  //   { key: "1", fullName: "Abel Tesfaye", gender: "Male" },
  //   { key: "2", fullName: "Liya Mekonnen", gender: "Female" },
  // ];

  // const timetable: Timetable[] = [
  //   { key: "1", day: "Monday", subject: "Math", period: "1st" },
  //   { key: "2", day: "Monday", subject: "English", period: "2nd" },
  // ];
  // fetching data
  useEffect(() => {
    fetchSectionDetail();
  }, []);
  const fetchSectionDetail = async () => {
    try {
      setIsLoading(true);
      const res1 = await axios.get(`/api/classes/${sectionId}/statistics`);
      const res2 = await axios.get(`/api/classes/${sectionId}/students`);
      const sectionData = res1.data.data;
      setSectionInfo({
        gradeLevel: sectionData.grade,
        name: sectionData.section_name,
        sectionId: sectionId!,
        capacity: 0,
        roomNumber: "",
        totalStudents: sectionData.student_count,
      });
      console.log(sectionData);
      const sectionStudents = res2.data.data;
      console.log(sectionStudents);
    } catch (e: any) {
      message.error(e?.message || "Failed to fetch classes");
    } finally {
      setIsLoading(false);
    }
  };
  const attendanceData = useMemo(
    () => [
      {
        key: "1",
        date: "2025-10-10",
        grade: "Grade 10",
        section: "A",
        subject: "Mathematics",
        submittedBy: "Mr. Daniel",
      },
      {
        key: "2",
        date: "2025-10-11",
        grade: "Grade 10",
        section: "B",
        subject: "English",
        submittedBy: "Ms. Rahel",
      },
    ],
    []
  );

  const filteredAttendance = useMemo(() => {
    return attendanceData.filter((item) => {
      const matchSection = selectedSectionFilter
        ? item.section === selectedSectionFilter
        : true;
      const matchDate = selectedDateFilter
        ? item.date === selectedDateFilter
        : true;
      return matchSection && matchDate;
    });
  }, [attendanceData, selectedSectionFilter, selectedDateFilter]);

  const studentDetails = [
    {
      key: "1",
      fullName: "Abel Tesfaye",
      gender: "Male",
      grade: "Grade 10",
      section: "A",
      status: "Present",
    },
    {
      key: "2",
      fullName: "Liya Mekonnen",
      gender: "Female",
      grade: "Grade 10",
      section: "A",
      status: "Absent",
    },
    {
      key: "3",
      fullName: "Samuel Yohannes",
      gender: "Male",
      grade: "Grade 10",
      section: "A",
      status: "Present",
    },
  ];
  //   ----------------------------------------
  const [subjects, setSubjects] = useState<any[]>([]);

  const getSubjects = async () => {
    try {
      //   const res = await axios.get("/api/subjects");
      //   setSubjects(res.data || []);
    } catch {
      message.error("Failed to load subjects");
    }
  };

  const fetchSchedule = async (sectionId: string) => {
    try {
      console.log(sectionId);
      //   const res = await axios.get(`/api/sections/${sectionId}/schedule`);
      //   return res.data?.schedule || {};
    } catch {
      message.error("Failed to fetch schedule");
      return {};
    }
  };

  const updateSchedule = async (
    sectionId: string,
    schedule: Record<string, Record<string, string>>
  ) => {
    try {
      console.log(sectionId, schedule);
      //   await axios.put(`/api/sections/${sectionId}/schedule`, { schedule });
      return true;
    } catch {
      message.error("Error saving timetable");
      return false;
    }
  };

  return {
    // state
    isStudentModalVisible,
    isAttendanceModalVisible,
    selectedSection,
    selectedAttendance,
    selectedSectionFilter,
    selectedDateFilter,
    filteredAttendance,
    studentDetails,
    students,
    timetable,
    sectionInfo,
    // setters
    setIsStudentModalVisible,
    setIsAttendanceModalVisible,
    setSelectedSection,
    setSelectedAttendance,
    setSelectedSectionFilter,
    setSelectedDateFilter,
    dayjs,
    setStudents,
    setTimetable,
    // edit time table
    subjects,
    setSubjects,
    getSubjects,
    fetchSchedule,
    updateSchedule,
    isLoading,
  };
};

export type SectionDetailCtrlType = {
  isStudentModalVisible: boolean;
  isAttendanceModalVisible: boolean;
  selectedSection: any;
  selectedAttendance: any;
  selectedSectionFilter: string | undefined;
  selectedDateFilter: string | undefined;
  filteredAttendance: {
    key: string;
    date: string;
    grade: string;
    section: string;
    subject: string;
    submittedBy: string;
  }[];
  studentDetails: {
    key: string;
    fullName: string;
    gender: string;
    grade: string;
    section: string;
    status: string;
  }[];
  students: Student[];
  timetable: Timetable[];
  sectionInfo: SectionDetailProps | undefined;
  //
  setIsStudentModalVisible: Dispatch<SetStateAction<boolean>>;
  setIsAttendanceModalVisible: Dispatch<SetStateAction<boolean>>;
  setSelectedSection: Dispatch<any>;
  setSelectedAttendance: Dispatch<any>;
  setSelectedSectionFilter: Dispatch<SetStateAction<string | undefined>>;
  setSelectedDateFilter: Dispatch<SetStateAction<string | undefined>>;
  dayjs: typeof dayjs;
  setStudents: Dispatch<SetStateAction<Student[]>>;
  setTimetable: Dispatch<SetStateAction<Timetable[]>>;
  //   edit timetable
  subjects: any[];
  getSubjects: () => Promise<void>;
  fetchSchedule: (sectionId: string) => Promise<any>;
  updateSchedule: (
    sectionId: string,
    schedule: Record<string, Record<string, string>>
  ) => Promise<boolean>;
  isLoading: boolean;
};
