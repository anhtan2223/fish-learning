"use client";
import { useState } from "react";
import { Divider, Card, Typography, Space, message } from "antd";
import Link from "next/link";
import { Button } from "antd";
import {
  UserOutlined,
  CalendarOutlined,
  FileTextOutlined,
  BookOutlined,
  TeamOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";

const { Title, Text } = Typography;

export default function Page() {
  const router = useRouter();
  const [isEnrolling, setIsEnrolling] = useState(false);

  const handleGoBack = () => {
    router.back();
  };

  const handleEnroll = async () => {
    setIsEnrolling(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      message.success('Ghi danh thành công!');
      router.push('/class/1');
    } catch (error) {
      message.error('Có lỗi xảy ra. Vui lòng thử lại.');
    } finally {
      setIsEnrolling(false);
    }
  };

  return (
    <div className="w-full p-5 mx-auto">
      <Card className="rounded-lg">
        <Space direction="vertical" size="large" className="w-full">
          <div className="flex justify-between items-center">
            <div className="flex justify-center w-full">
              <Title level={2} className="text-center ">
                <BookOutlined className="mr-2" />
                Máy Học Ứng Dụng
              </Title>
            </div>
            <div style={{ width: "82px" }}></div> {/* Spacer for alignment */}
          </div>
          <Divider />
          <Space direction="vertical" className="w-full">
            <div className="flex items-center">
              <UserOutlined className="text-blue-500 mr-2 text-xl" />
              <Text strong className="w-[120px] text-lg">
                Giảng Viên:
              </Text>
              <Text className="text-lg">Nguyễn Văn A</Text>
            </div>
            <div className="flex items-center">
              <CalendarOutlined className="text-green-500 mr-2 text-xl" />
              <Text strong className="w-[120px] text-lg">
                Niên Khoá:
              </Text>
              <Text className="text-lg">Học Kỳ 1 - 2023-2024</Text>
            </div>
            <div className="flex items-center">
              <TeamOutlined className="text-purple-500 mr-2 text-xl" />
              <Text strong className="w-[120px] text-lg">
                Nhóm:
              </Text>
              <Text className="text-lg">1</Text>
            </div>
            <div className="flex items-center">
              <FileTextOutlined className="text-orange-500 mr-2 text-xl" />
              <Text strong className="w-[120px] text-lg">
                Ghi Chú:
              </Text>
              <Text className="text-lg">Máy Học Ứng Dụng - CT292</Text>
            </div>
          </Space>
          <Divider />
          <div className="flex justify-center gap-5">
            <Button
              type="primary"
              icon={<BookOutlined />}
              onClick={handleEnroll}
              loading={isEnrolling}
              size="large"
            >
              Ghi Danh Lớp Học
            </Button>
            <Link href="/">
              <Button danger icon={<CalendarOutlined />} size="large">
                Quay Lại Trang Chủ
              </Button>
            </Link>
          </div>
        </Space>
      </Card>
    </div>
  );
}
