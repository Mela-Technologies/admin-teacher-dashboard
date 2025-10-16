import { App, Form, FormInstance } from "antd";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useAxios } from "../../../hooks/useAxios";

export interface SectionType {
  key: string;
  name: string;
  capacity: number;
  roomNumber: string;
  existing?: boolean;
  id?: string;
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
  const { message } = App.useApp();
  const axios = useAxios();
  useEffect(() => {
    const fetchSections = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `api/classes/class/sections/bygrade/${gradeLevel}`
        );
        const sectionData = res.data.sections;
        setSections(
          sectionData.map((s: any, index: number) => ({
            key: Date.now().toString() + `${index}`,
            name: s.sectionName,
            capacity: s.max_students,
            roomNumber: s.room_number,
            existing: true,
            id: s.id,
          }))
        );
      } catch (e) {
        message.error(`${e}`);
      } finally {
        setLoading(false);
      }
    };
    if (gradeLevel) fetchSections();
  }, [gradeLevel]);

  /** 🔹 Add a new empty section */
  const addSection = () => {
    setSections((prev) => [
      ...prev,
      {
        key: Date.now().toString(),
        name: "",
        capacity: 0,
        roomNumber: "",
        existing: false,
      },
    ]);
  };

  /** 🔹 Remove a section by key */
  const removeSection = (key: string) => {
    setSections((prev) => prev.filter((s) => s.key !== key));
  };

  /** 🔹 Update a specific section field */
  const updateSection = (
    key: string,
    field: keyof SectionType,
    value: string | number
  ) => {
    console.log(sections.filter((s) => s.key == key));
    setSections((prev) =>
      prev.map((s) => (s.key === key ? { ...s, [field]: value } : s))
    );
  };

  /** 🔹 Register (create) a new class */
  const registerClass = async () => {
    if (!sections) return;
    setLoading(true);
    try {
      const data = sections
        .filter((s) => !s.existing)
        .map((s) => {
          return {
            grade: gradeLevel,
            sectionName: s.name,
            roomNumber: s.roomNumber,
            capacity: s.capacity,
            action: "add",
          };
        });
      // console.log(data);
      await axios.post("/api/classes/sections/bulk", data);
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
      const data = sections.map((s) => {
        return {
          grade: gradeLevel,
          sectionName: s.name,
          roomNumber: s.roomNumber,
          capacity: s.capacity,
          action: "edit",
        };
      });
      await axios.post("/api/classes/sections/bulk", data);
    } catch (error) {
      console.error("Error updating class:", error);
    } finally {
      setLoading(false);
    }
  };
  const deleteClass = async (s: SectionType) => {
    setLoading(true);
    try {
      console.log("delete Class:", { sections });
      // TODO: replace with API call
      const data = {
        id: s.id,
        action: "delete",
      };
      await axios.post("/api/classes/sections/bulk", [data]);
      setSections((prev) => prev.filter((p) => p.id !== s.id));
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
    updateClass,
    deleteClass,
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
  deleteClass: (section: SectionType) => Promise<void>;
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
