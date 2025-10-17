import { useState } from "react";
import { App, Form } from "antd";

export interface TeacherFormValues {
  firstName: string;
  lastName: string;
  gender: string;
  nationalId: string;
  birthDate: string;
  birthPlace: string;
  role: string;
  email: string;
  mobile: string;
  address: string;
  picture?: File | null;
  documents?: File[];
  usernamePreference: "phone" | "email";
  passwordPreference: "dob" | "otp";
  sendCredential: "none" | "email" | "sms";
}

export const useTeacherRegistrationController = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm<TeacherFormValues>();
  const { message } = App.useApp();

  const initialValues: TeacherFormValues = {
    firstName: "",
    lastName: "",
    gender: "Male",
    nationalId: "",
    birthDate: "",
    birthPlace: "",
    role: "Teacher",
    email: "",
    mobile: "",
    address: "",
    picture: null,
    documents: [],
    usernamePreference: "phone",
    passwordPreference: "dob",
    sendCredential: "none",
  };

  const validateForm = (values: TeacherFormValues): boolean => {
    if (!values.firstName || !values.lastName) {
      message.error("First name and last name are required!");
      return false;
    }
    return true;
  };

  const registerTeacher = async (values: TeacherFormValues) => {
    if (!validateForm(values)) return;
    setLoading(true);
    try {
      console.log(values);
      await new Promise((res) => setTimeout(res, 1000));
      message.success("Teacher registered successfully!");
    } catch {
      message.error("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return { initialValues, registerTeacher, loading, form };
};
