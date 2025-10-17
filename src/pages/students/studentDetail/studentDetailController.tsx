import { App, Form, FormInstance } from "antd";
import React, { useEffect, useState } from "react";
import { useAxios } from "../../../hooks/useAxios";
import { StudentType } from "../../../types/student";

export const useStudentDetailCtrl = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [student, setStudent] = useState<StudentType>();
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();
  const { message } = App.useApp();
  const axios = useAxios();
  const queryParams = new URLSearchParams(location.search);
  const studentId = queryParams.get("id");

  useEffect(() => {
    fetchCourseDetail();
  }, []);
  const fetchCourseDetail = async () => {
    try {
      setIsLoading(true);
      const res1 = await axios.get(`/api/students/${studentId}`);
      const studentData = res1.data;
      setStudent({
        firstName: studentData.name,
        lastName: "-",
        gender: studentData.gender ?? ("Male" as "Female" | "Male"),
        grade: studentData.class_id,
        section: "A",
        status: "Active" as "Active" | "Inactive",
        studentId: studentData.id,
        admissionDate: "2021-09-10",
        dateOfBirth: studentData.date_of_birth
          ? new Date(studentData.date_of_birth).toDateString()
          : "-",
        email: "-",
        phone: "-",
        address: studentData.address,
        parent: {
          name: "-",
          email: "-",
          phone: studentData.parent_phone_number,
        },
        picture: "",
        attendance: {
          percent: 92,
          presentDays: 184,
          totalDays: 200,
        },
        gpa: {
          value: 3.75,
          records: 6,
        },
        statusSince: "2021-09-10",
      });
      console.log(studentData);
    } catch (e: any) {
      message.error(e?.message || "Failed to fetch courses");
    } finally {
      setIsLoading(false);
    }
  };
  return {
    selectedRowKeys,
    isModalVisible,
    form,
    isLoading,
    student,
    //
    setSelectedRowKeys,
    setIsModalVisible,
  };
};

export type StudentDetailCtrlType = {
  selectedRowKeys: React.Key[];
  isModalVisible: boolean;
  form: FormInstance<any>;
  isLoading: boolean;
  student: StudentType | undefined;
  //
  setSelectedRowKeys: React.Dispatch<React.SetStateAction<React.Key[]>>;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
};
