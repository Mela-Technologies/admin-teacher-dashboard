// src/pages/class/addClass/useClassFormController.ts
import { useState } from "react";

export interface SectionType {
  key: string;
  name: string;
  capacity: number;
  roomNumber: string;
}

export interface ClassFormValues {
  gradeLevel: string;
  otherData?: string;
  sections: SectionType[];
}

export const useClassFormController = () => {
  const [initialValues] = useState<ClassFormValues>({
    gradeLevel: "",
    otherData: "",
    sections: [],
  });
  const [loading, setLoading] = useState(false);
  const [sections, setSections] = useState<SectionType[]>([]);

  const addSection = () => {
    setSections((prev) => [
      ...prev,
      { key: Date.now().toString(), name: "", capacity: 0, roomNumber: "" },
    ]);
  };

  const removeSection = (key: string) => {
    setSections((prev) => prev.filter((s) => s.key !== key));
  };

  const updateSection = (key: string, field: keyof SectionType, value: any) => {
    setSections((prev) =>
      prev.map((s) => (s.key === key ? { ...s, [field]: value } : s))
    );
  };

  const registerClass = async (values: ClassFormValues) => {
    setLoading(true);
    try {
      console.log("Register Class:", { ...values, sections });
      // call API here
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    initialValues,
    sections,
    addSection,
    removeSection,
    updateSection,
    registerClass,
    loading,
  };
};
