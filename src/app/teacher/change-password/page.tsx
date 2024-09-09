"use client";

import { useState } from "react";
import { Form, Input, Button, Card, Typography, message, Row, Col } from "antd";
import { LockOutlined, UserOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import Link from "next/link";

const { Title } = Typography;

export default function ChangePasswordPage() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const onFinish = async (values: any) => {
        setLoading(true);
        try {
            // Here you would typically send a request to your API to change the password
            await new Promise(resolve => setTimeout(resolve, 1000));
            message.success("Mật khẩu đã được thay đổi thành công!");
            router.push("/teacher/account"); // Redirect to account page after successful password change
        } catch (error) {
            message.error("Thay đổi mật khẩu thất bại. Vui lòng thử lại.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center min-h-[calc(100vh-200px)] bg-gray-100 p-4">
            <Card className="w-full p-8 border-0 ">
                <div className="flex justify-between items-center mb-8">
                    <Link href="/teacher/account">
                        <Button type="text" icon={<ArrowLeftOutlined />} className="flex items-center">
                            Quay lại
                        </Button>
                    </Link>
                    <Title level={2} className="text-center m-0">
                        <LockOutlined className="mr-3" />
                        Đổi Mật Khẩu
                    </Title>
                    <div style={{ width: '80px' }}></div> {/* This empty div balances the layout */}
                </div>
                <Form
                    name="change-password"
                    onFinish={onFinish}
                    layout="vertical"
                    size="large"
                    initialValues={{ username: "user123" }} // Assuming a default username
                >
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="username"
                                label="Tên đăng nhập"
                            >
                                <Input 
                                    prefix={<UserOutlined />} 
                                    disabled
                                    className="rounded-md py-3 bg-gray-100"
                                />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                name="currentPassword"
                                label="Mật khẩu hiện tại"
                                rules={[{ required: true, message: 'Vui lòng nhập mật khẩu hiện tại!' }]}
                            >
                                <Input.Password 
                                    prefix={<LockOutlined />} 
                                    placeholder="Mật khẩu hiện tại" 
                                    className="rounded-md py-3"
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                            <Form.Item
                                name="newPassword"
                                label="Mật khẩu mới"
                                rules={[
                                    { required: true, message: 'Vui lòng nhập mật khẩu mới!' },
                                    { min: 8, message: 'Mật khẩu phải có ít nhất 8 ký tự!' }
                                ]}
                            >
                                <Input.Password 
                                    prefix={<LockOutlined />} 
                                    placeholder="Mật khẩu mới" 
                                    className="rounded-md py-3"
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                            <Form.Item
                                name="confirmPassword"
                                label="Xác nhận mật khẩu mới"
                                dependencies={['newPassword']}
                                rules={[
                                    { required: true, message: 'Vui lòng xác nhận mật khẩu mới!' },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue('newPassword') === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error('Mật khẩu xác nhận không khớp!'));
                                        },
                                    }),
                                ]}
                            >
                                <Input.Password 
                                    prefix={<LockOutlined />} 
                                    placeholder="Xác nhận mật khẩu mới" 
                                    className="rounded-md py-3"
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item>
                        <Button 
                            type="primary" 
                            htmlType="submit" 
                            className="w-full bg-gray-700 h-12 text-lg" 
                            loading={loading}
                        >
                            Đổi Mật Khẩu
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
}
