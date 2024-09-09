"use client";

import { useState } from "react";
import { Form, Input, Button, Card, Typography, message, Divider } from "antd";
import { UserOutlined, LockOutlined, MailOutlined, LoginOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useRouter } from "next/navigation";

const { Title, Text } = Typography;

export default function RegisterPage() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const onFinish = async (values: any) => {
        setLoading(true);
        try {
            // Here you would typically send a request to your registration API
            // For now, we'll just simulate a registration
            await new Promise(resolve => setTimeout(resolve, 1000));
            message.success("Đăng ký thành công!");
            router.push("/login"); // Redirect to login page after successful registration
        } catch (error) {
            message.error("Đăng ký thất bại. Vui lòng thử lại.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center h-[calc(100vh-200px)] bg-gray-100 p-4">
            <Card className="w-full max-w-xl shadow-2xl rounded-lg">
                <Title level={1} className="text-center mb-8 ">
                    <LoginOutlined className="mr-3" />
                    Đăng Ký
                </Title>
                <Form
                    name="register"
                    onFinish={onFinish}
                    layout="vertical"
                    size="large"
                >
                    <Form.Item
                        name="fullName"
                        rules={[{ required: true, message: 'Vui lòng nhập tên người dùng!' }]}
                    >
                        <Input 
                            prefix={<UserOutlined />} 
                            placeholder="Tên người dùng" 
                            className="rounded-md py-3"
                        />
                    </Form.Item>
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập!' }]}
                    >
                        <Input 
                            prefix={<UserOutlined />} 
                            placeholder="Tên đăng nhập" 
                            className="rounded-md py-3"
                        />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        rules={[
                            { required: true, message: 'Vui lòng nhập email!' },
                            { type: 'email', message: 'Email không hợp lệ!' }
                        ]}
                    >
                        <Input 
                            prefix={<MailOutlined />} 
                            placeholder="Email" 
                            className="rounded-md py-3"
                        />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
                    >
                        <Input.Password 
                            prefix={<LockOutlined />} 
                            placeholder="Mật khẩu" 
                            className="rounded-md py-3"
                        />
                    </Form.Item>
                    <Form.Item
                        name="confirm"
                        dependencies={['password']}
                        rules={[
                            { required: true, message: 'Vui lòng xác nhận mật khẩu!' },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('Mật khẩu xác nhận không khớp!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password 
                            prefix={<LockOutlined />} 
                            placeholder="Xác nhận mật khẩu" 
                            className="rounded-md py-3"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button 
                            type="primary" 
                            htmlType="submit" 
                            className="w-full bg-gray-700 h-12 text-lg" 
                            loading={loading}
                        >
                            Đăng Ký
                        </Button>
                    </Form.Item>
                </Form>
                <Divider plain className="my-8">Hoặc</Divider>
                <div className="text-center text-lg">
                    <Text>Đã có tài khoản? </Text>
                    <Link href="/login" className="hover:underline font-semibold">
                        Đăng nhập ngay
                    </Link>
                </div>
            </Card>
        </div>
    );
}