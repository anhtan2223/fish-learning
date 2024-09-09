"use client";
import { Divider, Card, Typography, Space } from "antd";
import Link from "next/link";
import { Button } from "antd";
import {
  UserOutlined,
  CalendarOutlined,
  FileTextOutlined,
  BookOutlined,
  TeamOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

export default function Page() {
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <Space direction="vertical" size="large" className="w-full">
        <Title level={2} className="text-center">
          <BookOutlined className="mr-2" />
          Máy Học Ứng Dụng
        </Title>
        <Divider />
        <Space direction="vertical" className="w-full">
          <div className="flex items-center">
            <UserOutlined className="text-blue-500 mr-2" />
            <Text strong className="w-[120px]">
              Giảng Viên:
            </Text>
            <Text>Nguyễn Văn A</Text>
          </div>
          <div className="flex items-center">
            <CalendarOutlined className="text-green-500 mr-2" />
            <Text strong className="w-[120px]">
              Niên Khoá:
            </Text>
            <Text>Học Kỳ 1 - 2023-2024</Text>
          </div>
          <div className="flex items-center">
            <TeamOutlined className="text-purple-500 mr-2" />
            <Text strong className="w-[120px]">
              Nhóm:
            </Text>
            <Text>1</Text>
          </div>
          <div className="flex items-center">
            <FileTextOutlined className="text-orange-500 mr-2" />
            <Text strong className="w-[120px]">
              Ghi Chú:
            </Text>
            <Text>Máy Học Ứng Dụng - CT292</Text>
          </div>
        </Space>
        <Divider />
        <div className="flex justify-center gap-5">
          <Link href="/class/id">
            <Button type="primary" icon={<BookOutlined />}>
              Ghi Danh Lớp Học
            </Button>
          </Link>
          <Link href="/">
            <Button danger icon={<CalendarOutlined />}>
              Quay Lại
            </Button>
          </Link>
        </div>
      </Space>
    </Card>
  );
}
