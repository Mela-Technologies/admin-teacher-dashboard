import { App, Form, FormInstance } from "antd";
import { useEffect, useState } from "react";
import { useAxios } from "../../../hooks/useAxios";
export type TeacherType = {
  teacherId: string;
  firstName: string;
  lastName: string;
  gender: "Male" | "Female";
  email: string;
  phone: string;
  address: string;
  picture?: string;
  hireDate?: string;
  subjectSpecialty?: string;
  status?: "Active" | "Inactive";
  subjects?: { name: string; grade: string; section: string }[];
  documents?: { name: string; type: string; url: string }[];
};

export const useTeacherDetailCtrl = () => {
  const [teacher, setTeacher] = useState<TeacherType>();
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();
  const { message } = App.useApp();
  const axios = useAxios();
  const queryParams = new URLSearchParams(location.search);
  const teacherId = queryParams.get("id");

  useEffect(() => {
    fetchTeacherDetail();
  }, []);

  const fetchTeacherDetail = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(`/api/teachers/${teacherId}`);
      const data = res.data;

      setTeacher({
        teacherId: data.id,
        firstName: data.first_name,
        lastName: data.last_name,
        gender: data.gender,
        email: data.email,
        phone: data.phone,
        address: data.address,
        picture: data.picture || "",
        hireDate: data.hire_date,
        subjectSpecialty: data.subject_specialty,
        status: data.status || "Active",
        subjects: data.subjects || [],
        documents: data.documents || [],
      });
    } catch (e: any) {
      message.error(e?.message || "Failed to fetch teacher details");
    } finally {
      setIsLoading(false);
    }
  };

  return { teacher, isLoading, form };
};

export type TeacherDetailCtrlType = {
  teacher: TeacherType | undefined;
  isLoading: boolean;
  form: FormInstance<any>;
};
