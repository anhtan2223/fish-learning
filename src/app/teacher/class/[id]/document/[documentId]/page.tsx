'use client'

import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Upload, message, Typography, Space } from 'antd';
import { UploadOutlined, FileTextOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { UploadFile } from 'antd/es/upload/interface';

const { Title, Text } = Typography;

export default function EditDocumentPage() {
  const [form] = Form.useForm();
  const router = useRouter();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [document, setDocument] = useState<any>(null);

  useEffect(() => {
    setDocument({
      id: 1,
      title: 'Sample Document',
      description: 'This is a sample document',
      url: '/documents/sample.pdf'
    });
  }, []);

  const onFinish = (values: any) => {
    console.log('Received values of form:', values);
    // Here you would typically send the updated data to your backend
    message.success('Tài liệu đã được cập nhật thành công!');
    router.push('/teacher/class/[id]'); // Replace [id] with actual class id
  };

  const normFile = (e: any) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const beforeUpload = (file: File) => {
    const isPDF = file.type === 'application/pdf';
    if (!isPDF) {
      message.error('Bạn chỉ có thể tải lên tệp PDF!');
    }
    const isLt10M = file.size / 1024 / 1024 < 10;
    if (!isLt10M) {
      message.error('Tệp phải nhỏ hơn 10MB!');
    }
    return isPDF && isLt10M;
  };

  const goBack = () => {
    router.back();
  };

  return (
    <div className="p-8">
      <Button 
        icon={<ArrowLeftOutlined />} 
        onClick={goBack}
        style={{ marginBottom: '20px' }}
      >
        Quay lại
      </Button>
      <Space direction="vertical" size="large" className="w-full">
        <div className="text-center">
          <FileTextOutlined style={{ fontSize: '48px', color: '#1890ff' }} />
          <Title level={2} className="mt-4">Chỉnh Sửa Tài Liệu</Title>
          <Text type="secondary">Cập nhật thông tin tài liệu của bạn</Text>
        </div>
        {document && (
          <Form
            form={form}
            name="edit_document"
            onFinish={onFinish}
            layout="vertical"
            className="mt-6"
            initialValues={document}
          >
            <Form.Item
              name="title"
              label="Tiêu đề tài liệu"
              rules={[{ required: true, message: 'Vui lòng nhập tiêu đề tài liệu!' }]}
            >
              <Input placeholder="Nhập tiêu đề tài liệu" />
            </Form.Item>

            <Form.Item
              name="description"
              label="Mô tả"
              rules={[{ required: true, message: 'Vui lòng nhập mô tả tài liệu!' }]}
            >
              <Input.TextArea placeholder="Nhập mô tả tài liệu" rows={4} />
            </Form.Item>

            <Form.Item
              name="upload"
              label="Tải lên"
              valuePropName="fileList"
              getValueFromEvent={normFile}
            >
              <Upload 
                name="file" 
                beforeUpload={beforeUpload}
                fileList={fileList}
                onChange={({ fileList }) => setFileList(fileList)}
                className="w-full"
              >
                <Button icon={<UploadOutlined />} className="w-full">
                  Nhấp để thay đổi tệp
                </Button>
              </Upload>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="w-full">
                Cập Nhật Tài Liệu
              </Button>
            </Form.Item>
          </Form>
        )}
      </Space>
    </div>
  );
}