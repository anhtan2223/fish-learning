"use client";

import React, { useState } from "react";
import {
  Typography,
  Card,
  Button,
  Space,
  Form,
  Input,
  DatePicker,
  message,
  Checkbox,
  Divider,
} from "antd";
import { ArrowLeftOutlined, SaveOutlined, ClockCircleOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import moment from "moment";

const { Title, Text } = Typography;

export default function CreateAssignmentPage() {
  const router = useRouter();
  const params = useParams();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [hasDueDate, setHasDueDate] = useState(false);

  const goBack = () => {
    router.push(`/teacher/class/${params.id}`);
  };

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      // Here you would typically send a POST request to your API
      // For now, we'll just simulate an API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      message.success("Bài tập đã được tạo thành công");
      router.push(`/teacher/class/${params.id}`);
    } catch (error) {
      message.error("Có lỗi xảy ra khi tạo bài tập");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <Button icon={<ArrowLeftOutlined />} onClick={goBack} className="hover:bg-blue-50">
          Quay lại Lớp học
        </Button>
        <Card className="shadow-md">
          <Title level={2} className="text-center mb-6">Tạo Bài Tập Mới</Title>
          <Divider />
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            className="max-w-4xl mx-auto"
          >
            <Form.Item
              name="title"
              label={<Text strong>Tiêu đề</Text>}
              rules={[{ required: true, message: "Vui lòng nhập tiêu đề bài tập" }]}
            >
              <Input size="large" placeholder="Nhập tiêu đề bài tập" />
            </Form.Item>
            <Form.Item
              name="description"
              label={<Text strong>Mô tả</Text>}
              rules={[{ required: true, message: "Vui lòng nhập mô tả bài tập" }]}
            >
              <Input.TextArea rows={6} placeholder="Nhập mô tả chi tiết về bài tập" />
            </Form.Item>
            <Form.Item>
              <Checkbox checked={hasDueDate} onChange={(e) => setHasDueDate(e.target.checked)}>
                <Text strong>Có hạn nộp</Text>
              </Checkbox>
            </Form.Item>
            {hasDueDate && (
              <Form.Item
                name="dueDate"
                label={<Text strong>Hạn nộp</Text>}
                rules={[{ required: true, message: "Vui lòng chọn hạn nộp bài tập" }]}
              >
                <DatePicker
                  showTime
                  format="DD/MM/YYYY HH:mm"
                  size="large"
                  style={{ width: '100%' }}
                  placeholder="Chọn ngày và giờ hạn nộp"
                  suffixIcon={<ClockCircleOutlined />}
                />
              </Form.Item>
            )}
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                icon={<SaveOutlined />}
                loading={loading}
                size="large"
                className="w-full mt-4"
              >
                Tạo Bài Tập
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Space>
    </div>
  );
}
