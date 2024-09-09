"use client";

import { useState } from "react";
import {
  Form,
  Input,
  Button,
  Card,
  Typography,
  message,
  Checkbox,
  Divider,
} from "antd";
import { UserOutlined, LockOutlined, LoginOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { isLoginAtom } from "@storage";
import { useSetAtom } from "jotai";

const { Title, Text } = Typography;

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      // Here you would typically send a request to your authentication API
      // For now, we'll just simulate a login
      console.log(values);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      message.success("Đăng nhập thành công!");
      login();
      if (values.username == "teacher") {
        router.push("/teacher");
      } else {
        router.push("/");
      }
    } catch (error) {
      message.error("Đăng nhập thất bại. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  const setLogin = useSetAtom(isLoginAtom);
  const login = () => {
    setLogin((value) => !value);
  };

  return (
    <div className="flex justify-center items-center h-[calc(100vh-200px)] bg-gray-100 p-4">
      <Card className="w-full max-w-xl shadow-2xl rounded-lg">
        <Title level={1} className="text-center mb-8 ">
          <LoginOutlined className="mr-3" />
          Đăng Nhập
        </Title>
        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          layout="vertical"
          size="large"
        >
          <Form.Item
            name="username"
            rules={[
              { required: true, message: "Vui lòng nhập tên đăng nhập!" },
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Tên đăng nhập"
              className="rounded-md py-3"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Mật khẩu"
              className="rounded-md py-3"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Ghi nhớ đăng nhập</Checkbox>
            </Form.Item>
            <Link
              href="/forgot-password"
              className="float-right  hover:underline"
            >
              Quên mật khẩu?
            </Link>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full bg-gray-700 h-12 text-lg"
              loading={loading}
            >
              Đăng Nhập
            </Button>
          </Form.Item>
        </Form>
        <Divider plain className="my-8">
          Hoặc
        </Divider>
        <div className="text-center text-lg">
          <Text>Chưa có tài khoản? </Text>
          <Link href="/register" className=" hover:underline font-semibold">
            Đăng ký ngay
          </Link>
        </div>
      </Card>
    </div>
  );
}
