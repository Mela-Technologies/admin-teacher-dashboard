// src/components/student/StudentRegistrationController.ts
import { useState } from "react";
import { message } from "antd";

export interface StudentFormValues {
  firstName: string;
  lastName: string;
  gender: string;
  birthDate: string;
  birthPlace: string;
  role: string;
  title: string;
  picture?: File | null;

  mobile: string;
  email: string;
  address: {
    street: string;
    city: string;
    post: string;
  };

  usernamePreference: "phone" | "email";
  passwordPreference: "dob" | "otp";
  sendCredential: "none" | "email" | "sms";
}

export const useStudentRegistrationController = () => {
  const [loading, setLoading] = useState(false);

  const initialValues: StudentFormValues = {
    firstName: "",
    lastName: "",
    gender: "Male",
    birthDate: "",
    birthPlace: "",
    role: "",
    title: "",
    picture: null,

    mobile: "",
    email: "",
    address: { street: "", city: "", post: "" },

    usernamePreference: "phone",
    passwordPreference: "dob",
    sendCredential: "none",
  };

  const validateForm = (values: StudentFormValues): boolean => {
    if (!values.firstName || !values.lastName) {
      message.error("First name and last name are required!");
      return false;
    }
    if (!values.mobile && !values.email) {
      message.error("At least one contact (mobile or email) is required!");
      return false;
    }
    return true;
  };

  const registerStudent = async (values: StudentFormValues) => {
    if (!validateForm(values)) return;
    setLoading(true);
    try {
      // Simulate registration API call
      await new Promise((res) => setTimeout(res, 1000));
      message.success("Student registered successfully!");
    } catch (error) {
      message.error("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return { initialValues, registerStudent, loading };
};
