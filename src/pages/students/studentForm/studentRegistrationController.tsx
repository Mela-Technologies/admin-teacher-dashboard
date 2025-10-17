import { useState } from "react";
import { App, Form } from "antd";

export interface StudentFormValues {
  firstName: string;
  lastName: string;
  gender: string;
  nationalId: string;
  birthDate: string;
  birthPlace: string;
  role: string;
  title: string;
  grade: string;
  classSection: string;
  picture?: File | null;

  mother?: {
    firstName: string;
    lastName: string;
    title: string;
    email: string;
    mobile: string;
  };
  father?: {
    firstName: string;
    lastName: string;
    title: string;
    email: string;
    mobile: string;
  };

  address: {
    street: string;
    city: string;
    post: string;
  };

  documents?: File[];
  usernamePreference: "phone" | "email";
  passwordPreference: "dob" | "otp";
  sendCredential: "none" | "email" | "sms";
}

export const useStudentRegistrationController = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm<StudentFormValues>();
  const { message } = App.useApp();
  const initialValues: StudentFormValues = {
    firstName: "",
    lastName: "",
    gender: "Male",
    nationalId: "",
    birthDate: "",
    birthPlace: "",
    role: "Student",
    title: "",
    grade: "",
    classSection: "",
    picture: null,

    mother: {
      firstName: "",
      lastName: "",
      title: "",
      email: "",
      mobile: "",
    },
    father: {
      firstName: "",
      lastName: "",
      title: "",
      email: "",
      mobile: "",
    },

    address: { street: "", city: "", post: "" },
    documents: [],

    usernamePreference: "phone",
    passwordPreference: "dob",
    sendCredential: "none",
  };

  const validateForm = (values: StudentFormValues): boolean => {
    if (!values.firstName || !values.lastName) {
      message.error("First name and last name are required!");
      return false;
    }
    return true;
  };

  const registerStudent = async (values: StudentFormValues) => {
    if (!validateForm(values)) return;
    setLoading(true);
    try {
      console.log(values);
      await new Promise((res) => setTimeout(res, 1000));
      message.success("Student registered successfully!");
    } catch {
      message.error("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return { initialValues, registerStudent, loading, form };
};
