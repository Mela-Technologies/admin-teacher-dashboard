export interface ParentInfo {
  name: string;
  email: string;
  phone: string;
}

export interface AttendanceInfo {
  percent: number;
  presentDays: number;
  totalDays: number;
}

export interface GPAInfo {
  value: number;
  records: number;
}

export interface StudentType {
  studentId: string;
  firstName: string;
  lastName: string;
  gender: "Male" | "Female";
  grade: string;
  section: string;
  status: "Active" | "Inactive";
  admissionDate: string;
  dateOfBirth: string;
  email: string;
  phone: string;
  address: string;
  parent: ParentInfo;
  attendance?: AttendanceInfo;
  gpa?: GPAInfo;
  statusSince?: string;
  picture?: string;
  grades?: Array<{ subject: string; grade: string; term: string }>;
  documents?: Array<{ name: string; type: string; url: string }>;
}

export interface ProfileType {
  id: string;
  firstName: string;
  lastName: string;
  gender: "Male" | "Female";
  grade: string;
  section: string;
  status: "Active" | "Inactive";
  admissionDate: string;
  dateOfBirth: string;
  email: string;
  phone: string;
  address: string;
  parent: ParentInfo;
  attendance?: AttendanceInfo;
  gpa?: GPAInfo;
  statusSince?: string;
  picture?: string;
  grades?: Array<{ subject: string; grade: string; term: string }>;
  documents?: Array<{ name: string; type: string; url: string }>;
}
