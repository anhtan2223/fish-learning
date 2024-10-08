import { ClassProps, Semester } from "@/lib/interface/class.interface";
import { listTeacherMock } from "@/lib/mock/user.mock";

const semesters: Semester[] = [
  { id: 1, value: "Fall 2022", label: "Fall 2022" },
  { id: 2, value: "Spring 2023", label: "Spring 2023" },
  { id: 3, value: "Summer 2022", label: "Summer 2022" },
  { id: 4, value: "Fall 2022", label: "Fall 2022" },
  { id: 5, value: "Spring 2023", label: "Spring 2023" },
  { id: 6, value: "Summer 2022", label: "Summer 2022" },
  { id: 7, value: "Fall 2022", label: "Fall 2022" },
  { id: 8, value: "Spring 2023", label: "Spring 2023" },
  { id: 9, value: "Summer 2022", label: "Summer 2022" },
  { id: 10, value: "Fall 2022", label: "Fall 2022" },
  { id: 11, value: "HK1_2024-2025", label: "HK1 Năm 2024-2025" },
  { id: 12, value: "HK2_2024-2025", label: "HK2 Năm 2024-2025" },
  { id: 13, value: "HK3_2024-2025", label: "HK3 Năm 2024-2025" },
];

export const mockClass: ClassProps[] = [
  {
    id: 1,
    teacher: listTeacherMock[0],
    semester: semesters[0],
    className: "Giới thiệu về Khoa học Máy tính và Lập trình",
    groupCode: "A1 - Phiên sáng",
    note: "Giới thiệu về Khoa học Máy tính"
  },
  {
    id: 2,
    teacher: listTeacherMock[1],
    semester: semesters[1],
    className: "Cấu trúc Dữ liệu và Phân tích Thuật toán",
    groupCode: "B2 - Phiên chiều",
    note: "Cấu trúc Dữ liệu và Phân tích Thuật toán"
  },
  {
    id: 3,
    teacher: listTeacherMock[2],
    semester: semesters[2],
    className: "Công nghệ và Framework Phát triển Web",
    groupCode: "C3 - Phiên tối",
    note: "Công nghệ Phát triển Web"
  },
  {
    id: 4,
    teacher: listTeacherMock[3],
    semester: semesters[3],
    className: "Thiết kế và Thực thi Hệ thống Cơ sở Dữ liệu",
    groupCode: "D4 - Phiên trực tuyến",
    note: "Thiết kế Hệ thống Cơ sở Dữ liệu"
  },
  {
    id: 5,
    teacher: listTeacherMock[4],
    semester: semesters[4],
    className: "Nguyên tắc Cơ bản về Trí tuệ Nhân tạo và Học máy",
    groupCode: "E5 - Phiên hỗn hợp",
    note: "Nguyên tắc Cơ bản về Trí tuệ Nhân tạo"
  },
  {
    id: 6,
    teacher: listTeacherMock[5],
    semester: semesters[5],
    className: "Ứng dụng Học máy và Học sâu",
    groupCode: "F6 - Phiên cuối tuần",
    note: "Ứng dụng Học máy"
  },
  {
    id: 7,
    teacher: listTeacherMock[6],
    semester: semesters[6],
    className: "Nguyên tắc An ninh Mạng và Mã hóa",
    groupCode: "G7 - Phiên sáng",
    note: "Nguyên tắc An ninh Mạng"
  },
  {
    id: 8,
    teacher: listTeacherMock[7],
    semester: semesters[7],
    className: "Kiến trúc và Dịch vụ Điện toán Đám mây",
    groupCode: "H8 - Phiên chiều",
    note: "Kiến trúc Điện toán Đám mây"
  },
  {
    id: 9,
    teacher: listTeacherMock[8],
    semester: semesters[8],
    className: "Threats và Countermeasures An ninh mạng",
    groupCode: "I9 - Phiên tối",
    note: "An ninh mạng"
  },
  {
    id: 10,
    teacher: listTeacherMock[9],
    semester: semesters[9],
    className: "Kỹ thuật Khai thác Dữ liệu và Trí tuệ Kinh doanh",
    groupCode: "J10 - Phiên trực tuyến",
    note: "Khai thác Dữ liệu"
  },
  {
    id: 11,
    teacher: listTeacherMock[2],
    semester: semesters[1],
    className: "Giới thiệu về Khoa học Máy tính và Lập trình",
    groupCode: "K11 - Phiên sáng",
    note: "Giới thiệu về Khoa học Máy tính"
  },
  {
    id: 12,
    teacher: listTeacherMock[6],
    semester: semesters[3],
    className: "Cấu trúc Dữ liệu và Phân tích Thuật toán",
    groupCode: "L12 - Phiên chiều",
    note: "Cấu trúc Dữ liệu và Phân tích Thuật toán"
  },
  {
    id: 13,
    teacher: listTeacherMock[7],
    semester: semesters[4],
    className: "Công nghệ và Framework Phát triển Web",
    groupCode: "M13 - Phiên tối",
    note: "Công nghệ Phát triển Web"
  },
  {
    id: 14,
    teacher: listTeacherMock[8],
    semester: semesters[0],
    className: "Giới thiệu về Học máy và Trí tuệ Nhân tạo",
    groupCode: "N14 - Phiên sáng",
    note: "Giới thiệu về Học máy"
  },
  {
    id: 15,
    teacher: listTeacherMock[9],
    semester: semesters[1],
    className: "Phân tích và Xử lý Dữ liệu lớn",
    groupCode: "O15 - Phiên chiều",
    note: "Phân tích Dữ liệu lớn"
  },
  {
    id: 16,
    teacher: listTeacherMock[8],
    semester: semesters[2],
    className: "Kiến trúc và Phát triển Hệ thống Học máy",
    groupCode: "P16 - Phiên tối",
    note: "Kiến trúc Hệ thống Học máy"
  },
  {
    id: 17,
    teacher: listTeacherMock[7],
    semester: semesters[3],
    className: "Ứng dụng Học sâu trong Xử lý Ảnh và Video",
    groupCode: "Q17 - Phiên trực tuyến",
    note: "Ứng dụng Học sâu"
  },
  {
    id: 18,
    teacher: listTeacherMock[6],
    semester: semesters[4],
    className: "Nguyên tắc và Ứng dụng của Học máy trong Kinh doanh",
    groupCode: "R18 - Phiên hỗn hợp",
    note: "Nguyên tắc Học máy trong Kinh doanh"
  },
];

export const myClassMock : ClassProps[] = [
    {
        id: 1,
        teacher: listTeacherMock[0],
        semester: semesters[0],
        className: "Giới thiệu về Khoa học Máy tính và Lập trình",
        groupCode: "A1 - Phiên sáng",
        note: "Giới thiệu về Khoa học Máy tính"
      },
      {
        id: 2,
        teacher: listTeacherMock[0],
        semester: semesters[1],
        className: "Cấu trúc Dữ liệu và Phân tích Thuật toán",
        groupCode: "B2 - Phiên chiều",
        note: "Cấu trúc Dữ liệu và Phân tích Thuật toán"
      },
      {
        id: 3,
        teacher: listTeacherMock[0],
        semester: semesters[2],
        className: "Công nghệ và Framework Phát triển Web",
        groupCode: "C3 - Phiên tối",
        note: "Công nghệ Phát triển Web"
      },
      {
        id: 4,
        teacher: listTeacherMock[0],
        semester: semesters[3],
        className: "Thiết kế và Thực thi Hệ thống Cơ sở Dữ liệu",
        groupCode: "D4 - Phiên trực tuyến",
        note: "Thiết kế Hệ thống Cơ sở Dữ liệu"
      },
]