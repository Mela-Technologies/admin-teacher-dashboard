import { useState } from "react";
import { message, InputNumber } from "antd";

interface Assessment {
  name: string;
  max: number;
}

interface StudentResult {
  key: number;
  name: string;
  gender: "Male" | "Female";
  test1: number;
  assignment: number;
  presentation: number;
  finalExam: number;
  total: number;
  maxTotal: number;
}

const assessments: Assessment[] = [
  { name: "test1", max: 20 },
  { name: "assignment", max: 15 },
  { name: "presentation", max: 15 },
  { name: "finalExam", max: 50 },
];

export const useResultCtrl = () => {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<StudentResult[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterGender, setFilterGender] = useState<string | null>(null);
  const [editing, setEditing] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  // 🔹 Simulate fetching data
  const fetchResults = async () => {
    setLoading(true);
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const demoData: StudentResult[] = [
        {
          key: 1,
          name: "Abel Tesfaye",
          gender: "Male",
          test1: 15,
          assignment: 13,
          presentation: 14,
          finalExam: 40,
          total: 82,
          maxTotal: 100,
        },
        {
          key: 2,
          name: "Liya Mekonnen",
          gender: "Female",
          test1: 10,
          assignment: 12,
          presentation: 13,
          finalExam: 25,
          total: 60,
          maxTotal: 100,
        },
        {
          key: 3,
          name: "Samuel Bekele",
          gender: "Male",
          test1: 18,
          assignment: 14,
          presentation: 15,
          finalExam: 48,
          total: 95,
          maxTotal: 100,
        },
      ];

      setResults(demoData);
    } catch (err) {
      message.error("Failed to fetch results.");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Handle input change for editable cells
  const handleValueChange = (key: number, field: string, value: number) => {
    setResults((prev) =>
      prev.map((student) => {
        if (student.key === key) {
          const max = assessments.find((a) => a.name === field)?.max ?? 0;
          if (value > max) {
            message.error(`${field} cannot exceed max (${max})`);
            return student;
          }

          const updated = { ...student, [field]: value };
          const total =
            updated.test1 +
            updated.assignment +
            updated.presentation +
            updated.finalExam;

          return { ...updated, total };
        }
        return student;
      })
    );
  };

  // 🔹 Table columns
  const columns = [
    {
      title: "#",
      dataIndex: "index",
      width: 60,
      render: (_: any, __: any, index: number) => index + 1,
    },
    {
      title: "Student Name",
      dataIndex: "name",
      sorter: (a: StudentResult, b: StudentResult) =>
        a.name.localeCompare(b.name),
    },
    ...assessments.map((a) => ({
      title: `${a.name} (${a.max})`,
      dataIndex: a.name,
      align: "center" as const,
      render: (value: number, record: StudentResult) =>
        editing ? (
          <InputNumber
            min={0}
            max={a.max}
            value={value}
            onChange={(v) =>
              handleValueChange(record.key, a.name, Number(v ?? 0))
            }
            className="w-full"
          />
        ) : (
          value
        ),
    })),
    {
      title: "Total",
      dataIndex: "total",
      align: "center" as const,
      render: (val: number, record: StudentResult) => (
        <span className={val < record.maxTotal / 2 ? "text-red-600" : ""}>
          {val}
        </span>
      ),
    },
  ];

  // 🔹 Filter & Search
  const filteredResults = results
    .filter((r) =>
      r.name.toLowerCase().includes(searchTerm.toLowerCase().trim())
    )
    .filter((r) => (filterGender ? r.gender === filterGender : true))
    .sort((a, b) => a.name.localeCompare(b.name));

  return {
    results,
    fetchResults,
    filteredResults,
    loading,
    columns,
    searchTerm,
    setSearchTerm,
    filterGender,
    setFilterGender,
    editing,
    setEditing,
    selectedRowKeys,
    setSelectedRowKeys,
  };
};
