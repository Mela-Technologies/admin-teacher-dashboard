import { useState, useMemo, Dispatch, SetStateAction } from "react";
import dayjs from "dayjs";

export interface Section {
  key: string;
  name: string;
  capacity: number;
  roomNumber: string;
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
    // setters
    setIsStudentModalVisible,
    setIsAttendanceModalVisible,
    setSelectedSection,
    setSelectedAttendance,
    setSelectedSectionFilter,
    setSelectedDateFilter,
    dayjs,
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
  setIsStudentModalVisible: Dispatch<SetStateAction<boolean>>;
  setIsAttendanceModalVisible: Dispatch<SetStateAction<boolean>>;
  setSelectedSection: Dispatch<any>;
  setSelectedAttendance: Dispatch<any>;
  setSelectedSectionFilter: Dispatch<SetStateAction<string | undefined>>;
  setSelectedDateFilter: Dispatch<SetStateAction<string | undefined>>;
  dayjs: typeof dayjs;
};
