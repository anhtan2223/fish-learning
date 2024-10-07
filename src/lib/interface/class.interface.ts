import { Teacher } from "@/lib/interface/user.interface";

export interface ClassProps {
    id: number;
    teacher: Teacher;
    semester: Semester;
    className: string;
    groupCode: string;
    note: string;
}
  
export interface Semester {
    id: number;
    value: string;
    label: string;
  }