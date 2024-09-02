'use client'
import { Form, Input, Button, Typography, Space } from "antd";
import {
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";

const { Title, Paragraph } = Typography;
const { TextArea } = Input;

export default function ContactPage() {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log("Received values:", values);
    // Handle form submission here
  };

  return (
    <div className="p-6 flex flex-col justify-center">
      <Title level={1}>Thông Tin Liên Hệ</Title>

      <Space direction="vertical" size="large" className="w-full justify-center">
        <Space className="h-full flex items-center">
          <EnvironmentOutlined />
          <p>123 Đường ABC, Quận XYZ, Thành phố HCM</p>
        </Space>

        <Space>
          <PhoneOutlined />
          <p>(028) 1234 5678</p>
        </Space>

        <Space>
          <MailOutlined />
          <p>info@example.com</p>
        </Space>

        <Space>
          <ClockCircleOutlined />
          <p>Thứ 2 - Thứ 6: 8:00 - 17:00</p>
        </Space>
      </Space>

      <Title level={3} className="mt-8 mb-4">
        Gửi Tin Nhắn Cho Chúng Tôi
      </Title>
      <Form form={form} name="contact" onFinish={onFinish} layout="vertical">
        <Form.Item
          name="name"
          label="Họ và Tên"
          rules={[{ required: true, message: "Vui lòng nhập họ và tên!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: "Vui lòng nhập email!" },
            { type: "email", message: "Email không hợp lệ!" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="message"
          label="Nội dung tin nhắn"
          rules={[
            { required: true, message: "Vui lòng nhập nội dung tin nhắn!" },
          ]}
        >
          <TextArea rows={4} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Gửi Tin Nhắn
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
