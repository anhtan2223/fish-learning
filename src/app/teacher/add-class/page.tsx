"use client";
import { Button, Select, Form, Input } from "antd";
import Link from "next/link";
import {
  UserOutlined,
  CalendarOutlined,
  BookOutlined,
  TeamOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import { ClassProps } from "@/lib/interface/class.interface";

const { TextArea } = Input;

export default function AddCourse() {
  const [form] = Form.useForm();

  const onFinish = (values: ClassProps) => {
    console.log("Form values:", values);
    // Handle form submission
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center text-blue-600 dark:text-blue-200">
        <BookOutlined className="mr-2" />
        Thêm Mới Lớp Học
      </h1>
      <Form<ClassProps> form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          label={
            <span className="">
              <UserOutlined className="mr-2" />
              Giảng Viên
            </span>
          }
          name="teacher"
        >
          <Input disabled defaultValue="Nguyễn Văn A" className="bg-gray-100" />
        </Form.Item>
        <Form.Item
          label={
            <span className="">
              <CalendarOutlined className="mr-2" />
              Niên Khoá
            </span>
          }
          name="semester"
          rules={[{ required: true, message: "Vui lòng chọn niên khoá" }]}
        >
          <Select
            placeholder="Chọn niên khoá"
            options={[
              { value: "HK1_2024-2025", label: "HK1 Năm 2024-2025" },
              { value: "HK2_2024-2025", label: "HK2 Năm 2024-2025" },
              { value: "HK3_2024-2025", label: "HK3 Năm 2024-2025" },
            ]}
            className="text-blue-600"
          />
        </Form.Item>
        <Form.Item
          label={
            <span className="">
              <BookOutlined className="mr-2" />
              Tên Lớp
            </span>
          }
          name="className"
          rules={[{ required: true, message: "Vui lòng nhập tên lớp" }]}
        >
          <Input
            placeholder="Nhập tên lớp"
            className="border-blue-300 focus:border-blue-500"
          />
        </Form.Item>
        <Form.Item
          label={
            <span className="">
              <TeamOutlined className="mr-2" />
              Mã Nhóm
            </span>
          }
          name="groupCode"
          rules={[{ required: true, message: "Vui lòng nhập mã nhóm" }]}
        >
          <Input
            placeholder="Nhập mã nhóm"
            className="border-blue-300 focus:border-blue-500"
          />
        </Form.Item>
        <Form.Item
          label={
            <span className="">
              <FileTextOutlined className="mr-2" />
              Ghi Chú
            </span>
          }
          name="note"
        >
          <TextArea
            placeholder="Nhập ghi chú cho lớp học"
            autoSize={{ minRows: 3, maxRows: 6 }}
            className="border-blue-300 focus:border-blue-500"
          />
        </Form.Item>
        <Form.Item className="flex w-full justify-around gap-4 mt-4">
          <Button type="default" htmlType="submit" className="mx-5">
            Tạo Mới
          </Button>

          <Link href="/teacher">
            <Button danger className="mx-5">
              Quay Lại
            </Button>
          </Link>
        </Form.Item>
      </Form>
    </div>
  );
}
