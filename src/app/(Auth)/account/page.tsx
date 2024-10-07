"use client";

import { useState } from "react";
import { Form, Input, Button, Card, Typography, message, Avatar, Upload, Row, Col, Divider } from "antd";
import { UserOutlined, MailOutlined, UploadOutlined, LockOutlined, CameraOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import Link from "next/link";

const { Title, Text } = Typography;

interface AccountSettingsFormValues {
    username: string;
    fullName: string;
    email: string;
}

export default function AccountSettingsPage() {
    const [loading, setLoading] = useState(false);
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
    const router = useRouter();

    const onFinish = async (values: AccountSettingsFormValues) => {
        setLoading(true);
        try {
            // Here you would typically send a request to update user information
            await new Promise(resolve => setTimeout(resolve, 1000));
            message.success("Cập nhật thông tin thành công!");
        } catch (error) {
            message.error("Cập nhật thất bại. Vui lòng thử lại.");
        } finally {
            setLoading(false);
        }
    };

    const handleAvatarChange = (info: any) => {
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            setAvatarUrl(info.file.response.url);
            message.success(`${info.file.name} đã được tải lên thành công`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} tải lên thất bại.`);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-[calc(100vh-200px)] p-8">
            <Card className="w-full max-w-4xl shadow-2xl rounded-lg overflow-hidden">
                <div className="p-6">
                    <Title level={2} className="text-center mb-0">
                        <UserOutlined className="mr-3" />
                        Cài Đặt Tài Khoản
                    </Title>
                </div>
                <Row gutter={32} className="p-8">
                    <Col xs={24} md={8}>
                        <div className="text-center mb-8">
                            <div className="relative inline-block">
                                <Avatar 
                                    size={150} 
                                    icon={<UserOutlined />} 
                                    src={avatarUrl}
                                    className="border-2 border-black shadow-lg" 
                                />
                                <Upload
                                    accept="image/*"
                                    showUploadList={false}
                                    action="/api/upload" // Replace with your upload API
                                    onChange={handleAvatarChange}
                                >
                                    <Button 
                                        icon={<CameraOutlined />} 
                                        className="absolute bottom-0 right-0 rounded-full border-2 border-white"
                                    />
                                </Upload>
                            </div>
                            <Text className="block mt-4">Nhấn vào biểu tượng máy ảnh để thay đổi ảnh đại diện</Text>
                        </div>
                    </Col>
                    <Col xs={24} md={16}>
                        <Form
                            name="account-settings"
                            onFinish={onFinish}
                            layout="vertical"
                            size="large"
                            initialValues={{
                                username: "user123",
                                fullName: "Nguyễn Văn A",
                                email: "user@example.com",
                            }}
                        >
                            <Form.Item
                                name="username"
                                label="Tên đăng nhập"
                            >
                                <Input 
                                    prefix={<UserOutlined />} 
                                    placeholder="Tên đăng nhập" 
                                    className="rounded-md py-2"
                                    disabled
                                />
                            </Form.Item>
                            <Form.Item
                                name="fullName"
                                label="Tên người dùng"
                                rules={[
                                    { required: true, message: 'Vui lòng nhập tên người dùng!' }
                                ]}
                            >
                                <Input 
                                    prefix={<UserOutlined />} 
                                    placeholder="Tên người dùng" 
                                    className="rounded-md py-2"
                                />
                            </Form.Item>
                            <Form.Item
                                name="email"
                                label="Email"
                                rules={[
                                    { required: true, message: 'Vui lòng nhập email!' },
                                    { type: 'email', message: 'Email không hợp lệ!' }
                                ]}
                            >
                                <Input 
                                    prefix={<MailOutlined />} 
                                    placeholder="Email" 
                                    className="rounded-md py-2"
                                />
                            </Form.Item>
                            <Form.Item>
                                <Button 
                                    type="primary" 
                                    htmlType="submit" 
                                    className="w-full h-10 text-lg" 
                                    loading={loading}
                                >
                                    Cập Nhật Thông Tin
                                </Button>
                            </Form.Item>
                        </Form>
                        <Divider />
                        <div className="text-center mt-4">
                            <Link href="/change-password">
                                <Button icon={<LockOutlined />} className="w-full">
                                    Đổi Mật Khẩu
                                </Button>
                            </Link>
                        </div>
                    </Col>
                </Row>
            </Card>
        </div>
    );
}
