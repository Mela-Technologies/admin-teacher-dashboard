import { Form } from "antd";
import { useEffect, useState } from "react";
export interface StudentAttendance {
  id: string;
  fullName: string;
  grade: string;
  section: string;
  status: "Present" | "Absent";
}

export interface AttendanceFormValues {
  grade: string;
  section: string;
  subject: string;
  students: StudentAttendance[];
}
const useAttendanceCtrl = (initialValues?: AttendanceFormValues) => {
  const [isAttendanceModalVisible, setIsAttendanceModalVisible] =
    useState(false);
  const [selectedAttendance, setSelectedAttendance] = useState<{
    subject: string;
    date: string;
    presentCount: number;
    absentCount: number;
  } | null>(null);

  const [studentDetails, setStudentDetails] = useState<any[]>([]);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [grade, setGrade] = useState(initialValues?.grade || "");
  const [section, setSection] = useState(initialValues?.section || "");
  const [subject, setSubject] = useState(initialValues?.subject || "");
  const [students, setStudents] = useState<StudentAttendance[]>([]);
  const [sections] = useState(["A", "B", "C", "D"]);
  const [subjects] = useState(["Math", "Science", "English", "History"]);
  useEffect(() => {
    setStudentDetails([
      {
        key: 1,
        fullName: "Saba Elias",
        gender: "Female",
        grade: "Grade 10",
        section: "A",
        status: "Present",
      },
      {
        key: 2,
        fullName: "Kirubel Samuel",
        gender: "Male",
        grade: "Grade 10",
        section: "A",
        status: "Absent",
      },
      {
        key: 3,
        fullName: "Dawit Tesfaye",
        gender: "Male",
        grade: "Grade 10",
        section: "A",
        status: "Present",
      },
    ]);
  }, []);
  const fetchStudents = async () => {
    // simulate API
    await new Promise((res) => setTimeout(res, 500));
    const mockData: StudentAttendance[] = Array.from(
      { length: 10 },
      (_, i) => ({
        id: `STU${i + 1}`,
        fullName: `Student ${i + 1}`,
        grade,
        section,
        status: "Present",
      })
    );
    setStudents(mockData);
  };

  const toggleAttendance = (id: string, present: boolean) => {
    setStudents((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, status: present ? "Present" : "Absent" } : s
      )
    );
  };

  const submit = async (data: AttendanceFormValues) => {
    setLoading(true);
    try {
      // Replace with actual API
      console.log("Submitting attendance:", data);
      await new Promise((res) => setTimeout(res, 500));
    } finally {
      setLoading(false);
    }
  };

  return {
    isAttendanceModalVisible,
    setIsAttendanceModalVisible,
    selectedAttendance,
    setSelectedAttendance,
    studentDetails,
    setStudentDetails,
    // --------------------------
    form,
    loading,
    isFetching,
    grade,
    section,
    subject,
    students,
    sections,
    subjects,
    setGrade,
    setSection,
    setSubject,
    setIsFetching,
    fetchStudents,
    toggleAttendance,
    submit,
  };
};

export default useAttendanceCtrl;

export type AttendanceCtrlType = {
  form: any;
  loading: boolean;
  isFetching: boolean;
  grade: string;
  section: string;
  subject: string;
  sections: string[];
  subjects: string[];
  students: StudentAttendance[];
  setGrade: (val: string) => void;
  setSection: (val: string) => void;
  setSubject: (val: string) => void;
  setIsFetching: (val: boolean) => void;
  fetchStudents: () => Promise<void>;
  toggleAttendance: (id: string, present: boolean) => void;
  submit: (data: AttendanceFormValues) => Promise<void>;
};
