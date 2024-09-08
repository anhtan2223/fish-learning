'use client'

import React, { useState, useEffect } from 'react';
import { Form, Input, Button, message, Typography, Card, List, Avatar, Row, Col, Divider, Pagination, Popconfirm } from 'antd';
import { ArrowLeftOutlined, UserOutlined, UpOutlined, DownOutlined, SettingOutlined, TeamOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';

const { Title, Text } = Typography;
const { Search } = Input;

export default function ClassSettingPage() {
  const [form] = Form.useForm();
  const router = useRouter();
  const [classData, setClassData] = useState<any>(null);
  const [students, setStudents] = useState<any[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<any[]>([]);
  const [showSettings, setShowSettings] = useState(true);
  const [showStudents, setShowStudents] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    // Fetch class data and student list here
    // For now, we'll use mock data
    setClassData({
      id: 1,
      name: 'Sample Class',
      description: 'This is a sample class description',
      code: 'ABC123'
    });

    // Generate a larger list of mock students
    const mockStudents = Array.from({ length: 50 }, (_, index) => ({
      id: index + 1,
      name: `Học sinh ${index + 1}`,
      email: `student${index + 1}@example.com`
    }));
    setStudents(mockStudents);
    setFilteredStudents(mockStudents);
  }, []);

  const onFinish = (values: any) => {
    console.log('Received values of form:', values);
    // Here you would typically send the updated data to your backend
    message.success('Cài đặt lớp học đã được cập nhật thành công!');
    router.push('/teacher/class/[id]'); // Replace [id] with actual class id
  };

  const goBack = () => {
    router.back();
  };

  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };

  const toggleStudents = () => {
    setShowStudents(!showStudents);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearch = (value: string) => {
    const filtered = students.filter(student => 
      student.name.toLowerCase().includes(value.toLowerCase()) ||
      student.email.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredStudents(filtered);
    setCurrentPage(1);
  };

  const handleDelete = (id: number) => {
    const updatedStudents = students.filter(student => student.id !== id);
    setStudents(updatedStudents);
    setFilteredStudents(updatedStudents);
    message.success('Học sinh đã được xóa thành công!');
  };

  const paginatedStudents = filteredStudents.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <Button 
        icon={<ArrowLeftOutlined />} 
        onClick={goBack}
        style={{ marginBottom: '20px' }}
        className="hover:bg-blue-50"
      >
        Quay lại
      </Button>
      <Row gutter={[24, 24]} justify="center">
        <Col xs={24} lg={20}>
          <Card className="shadow-lg rounded-lg">
            <div className="text-center mb-8">
              <Title level={2}>
                <SettingOutlined className="mr-2" />
                Cài đặt Lớp học
              </Title>
              <Text type="secondary">Chỉnh sửa thông tin lớp học của bạn</Text>
            </div>
            <Divider />
            {classData && (
              <div className="mb-8">
                <Title level={4} onClick={toggleSettings} className="cursor-pointer flex items-center">
                  <SettingOutlined className="mr-2" />
                  Cập nhật Cài đặt 
                  {showSettings ? <UpOutlined className="ml-2" /> : <DownOutlined className="ml-2" />}
                </Title>
                {showSettings && (
                  <Form
                    form={form}
                    name="class_settings"
                    onFinish={onFinish}
                    layout="vertical"
                    initialValues={classData}
                    className="mt-4"
                  >
                    <Form.Item
                      name="name"
                      label="Tên lớp học"
                      rules={[{ required: true, message: 'Vui lòng nhập tên lớp học!' }]}
                    >
                      <Input placeholder="Nhập tên lớp học" />
                    </Form.Item>

                    <Form.Item
                      name="description"
                      label="Mô tả"
                      rules={[{ required: true, message: 'Vui lòng nhập mô tả lớp học!' }]}
                    >
                      <Input.TextArea placeholder="Nhập mô tả lớp học" rows={4} />
                    </Form.Item>

                    <Form.Item
                      name="code"
                      label="Mã lớp học"
                    >
                      <Input disabled />
                    </Form.Item>

                    <Form.Item>
                      <Button type="primary" htmlType="submit" className="w-full">
                        Cập nhật Cài đặt
                      </Button>
                    </Form.Item>
                  </Form>
                )}
              </div>
            )}

            <Divider />

            <div>
              <Title level={4} onClick={toggleStudents} className="cursor-pointer flex items-center">
                <TeamOutlined className="mr-2" />
                Danh sách Học sinh 
                {showStudents ? <UpOutlined className="ml-2" /> : <DownOutlined className="ml-2" />}
              </Title>
              {showStudents && (
                <>
                  <Search
                    placeholder="Tìm kiếm học sinh"
                    onSearch={handleSearch}
                    style={{ marginBottom: 16 }}
                  />
                  <List
                    className="mt-4"
                    itemLayout="horizontal"
                    dataSource={paginatedStudents}
                    renderItem={item => (
                      <List.Item
                        key={item.id}
                        actions={[
                          <Popconfirm
                            key="delete"
                            title="Bạn có chắc chắn muốn xóa học sinh này?"
                            onConfirm={() => handleDelete(item.id)}
                            okText="Có"
                            cancelText="Không"
                          >
                            <Button icon={<DeleteOutlined />} danger>Xóa</Button>
                          </Popconfirm>
                        ]}
                      >
                        <List.Item.Meta
                          avatar={<Avatar icon={<UserOutlined />} />}
                          title={<a href={`/student/${item.id}`}>{item.name}</a>}
                          description={item.email}
                        />
                      </List.Item>
                    )}
                  />
                  <Pagination
                    current={currentPage}
                    total={filteredStudents.length}
                    pageSize={pageSize}
                    onChange={handlePageChange}
                    className="mt-4 text-center"
                  />
                </>
              )}
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
