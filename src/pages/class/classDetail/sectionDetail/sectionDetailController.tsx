import { useState, useMemo } from "react";
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
