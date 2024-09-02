'use client'
import { useState } from 'react';
import { Typography, Tabs, Card, Button, Space } from 'antd';
import { BookOutlined, FormOutlined, FileTextOutlined } from '@ant-design/icons';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';

const { Title } = Typography;
const { TabPane } = Tabs;

export default function ClassPage() {
  const [activeTab, setActiveTab] = useState('1');

  const sessions = [
    {
      key: '1',
      title: 'Giới thiệu về KNN',
      content: `
# Giới thiệu về KNN

KNN (K-Nearest Neighbors) là một thuật toán học máy đơn giản và hiệu quả được sử dụng cho cả bài toán phân loại và hồi quy.

## Nguyên lý hoạt động

1. Chọn số K (số lượng láng giềng gần nhất)
2. Tính khoảng cách từ điểm cần dự đoán đến tất cả các điểm trong tập dữ liệu
3. Chọn K điểm có khoảng cách gần nhất
4. Đối với bài toán phân loại: lấy nhãn xuất hiện nhiều nhất trong K điểm
5. Đối với bài toán hồi quy: lấy giá trị trung bình của K điểm

## Ưu điểm và nhược điểm

### Ưu điểm:
- Đơn giản, dễ hiểu
- Không cần huấn luyện mô hình

### Nhược điểm:
- Chậm khi dự đoán với tập dữ liệu lớn
- Nhạy cảm với dữ liệu nhiễu
      `,
      quiz: [
        { id: 1, question: 'KNN là viết tắt của gì?' },
        { id: 2, question: 'KNN có thể được sử dụng cho bài toán nào?' },
      ],
      documents: [
        { name: 'KNN Overview.pdf', url: '/documents/knn_overview.pdf' },
        { name: 'KNN in Practice.pdf', url: '/documents/knn_in_practice.pdf' },
      ],
    },
    {
      key: '2',
      title: 'Ứng dụng của KNN',
      content: `
# Ứng dụng của KNN

KNN có nhiều ứng dụng trong thực tế:

1. **Hệ thống gợi ý**: Đề xuất sản phẩm dựa trên sở thích của người dùng tương tự.

2. **Nhận dạng chữ viết tay**: Phân loại các ký tự dựa trên sự tương đồng với các mẫu đã biết.

3. **Phân tích tài chính**: Dự đoán xu hướng giá cổ phiếu dựa trên các mẫu lịch sử tương tự.

4. **Chẩn đoán y tế**: Phân loại các bệnh dựa trên các triệu chứng và so sánh với các ca bệnh đã biết.

5. **Nhận dạng khuôn mặt**: So sánh đặc trưng khuôn mặt với cơ sở dữ liệu để nhận dạng cá nhân.
      `,
      documents: [
        { name: 'KNN Applications.pdf', url: '/documents/knn_applications.pdf' },
        { name: 'Case Studies.pdf', url: '/documents/case_studies.pdf' },
      ],
    },
  ];

  return (
    <div className="class-page">
      <Title level={2} className="text-center mb-8">Phương Pháp K Láng Giềng (KNN)</Title>
      
      <Tabs activeKey={activeTab} onChange={setActiveTab}>
        {sessions.map(session => (
          <TabPane tab={session.title} key={session.key}>
            <Card>
              <Space direction="vertical" size="large" style={{ width: '100%' }}>
                <div>
                  <Title level={4}><BookOutlined /> Nội dung</Title>
                  <ReactMarkdown>{session.content}</ReactMarkdown>
                </div>
                
                {session.quiz && (
                  <div>
                    <Title level={4}><FormOutlined /> Bài kiểm tra</Title>
                    <Space>
                      {session.quiz.map((q, index) => (
                        // <Link key={index} href={`/assignment/${q.id}`}>
                        <Link key={index} href={`/assignment`}>
                          <Button>
                            Bài {index + 1}
                          </Button>
                        </Link>
                      ))}
                    </Space>
                  </div>
                )}
                
                {session.documents && (
                  <div>
                    <Title level={4}><FileTextOutlined /> Tài liệu</Title>
                    <Space>
                      {session.documents.map((doc, index) => (
                        <Button key={index} href={doc.url} target="_blank">
                          {doc.name}
                        </Button>
                      ))}
                    </Space>
                  </div>
                )}
              </Space>
            </Card>
          </TabPane>
        ))}
      </Tabs>
    </div>
  );
}