import { Form, FormInstance } from "antd";
import { Dispatch, SetStateAction, useState } from "react";

export interface SectionType {
  key: string;
  name: string;
  capacity: number;
  roomNumber: string;
}

export interface ClassFormValues {
  gradeId?: string; // optional for editing
  gradeLevel: string;
  sections: SectionType[];
}

export const useClassFormController = (editValues?: ClassFormValues) => {
  const [initialValues] = useState<ClassFormValues>({
    gradeLevel: "",
    sections: [],
  });
  const [loading, setLoading] = useState(false);
  const [sections, setSections] = useState<SectionType[]>(
    editValues?.sections ?? []
  );
  const [form] = Form.useForm();
  const [gradeLevel, setGradeLevel] = useState(editValues?.gradeLevel);
  const [schoolSection, setSchoolSection] = useState<string>("");
  const [isEditable, setIsEditable] = useState(editValues ? true : false);
  /** 🔹 Add a new empty section */
  const addSection = () => {
    setSections((prev) => [
      ...prev,
      { key: Date.now().toString(), name: "", capacity: 0, roomNumber: "" },
    ]);
  };

  /** 🔹 Remove a section by key */
  const removeSection = (key: string) => {
    setSections((prev) => prev.filter((s) => s.key !== key));
  };

  /** 🔹 Update a specific section field */
  const updateSection = (key: string, field: keyof SectionType, value: any) => {
    setSections((prev) =>
      prev.map((s) => (s.key === key ? { ...s, [field]: value } : s))
    );
  };

  /** 🔹 Register (create) a new class */
  const registerClass = async (values: ClassFormValues) => {
    setLoading(true);
    try {
      console.log("Register Class:", { ...values, sections });
      // TODO: replace with API call
      // await axios.post("/api/classes", { ...values, sections });
    } catch (error) {
      console.error("Error registering class:", error);
    } finally {
      setLoading(false);
    }
  };

  /** 🔹 Update an existing class */
  const updateClass = async (values: ClassFormValues) => {
    if (!values.gradeId) {
      console.warn("Missing class ID for update.");
      return;
    }

    setLoading(true);
    try {
      console.log("Update Class:", { ...values, sections });
      // TODO: replace with API call
      // await axios.put(`/api/classes/${values.id}`, { ...values, sections });
    } catch (error) {
      console.error("Error updating class:", error);
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
    updateClass, // ✅ new update method
    loading,
    form,
    gradeLevel,
    setGradeLevel,
    schoolSection,
    setSchoolSection,
    isEditable,
    setIsEditable,
  };
};

export type AddClassCtrlType = {
  initialValues: ClassFormValues;
  sections: SectionType[];
  addSection: () => void;
  removeSection: (key: string) => void;
  updateSection: (key: string, field: keyof SectionType, value: any) => void;
  loading?: boolean;
  editData?: ClassFormValues;
  form: FormInstance<any>;
  gradeLevel: string | undefined;
  setGradeLevel: Dispatch<SetStateAction<string | undefined>>;
  schoolSection: string;
  setSchoolSection: Dispatch<SetStateAction<string>>;
  isEditable: boolean;
  setIsEditable: Dispatch<SetStateAction<boolean>>;
};
