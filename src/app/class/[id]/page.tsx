"use client";
import { useState, useEffect } from "react";
import {
  Typography,
  Tabs,
  Card,
  Button,
  Space,
  Row,
  Col,
  Divider,
  List,
} from "antd";
import {
  BookOutlined,
  FormOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import RichTextEditor from "@/ui/common/rich-text-editor";
import { useRouter } from "next/navigation";

const { Title } = Typography;
const { TabPane } = Tabs;

interface Quiz {
  id: number;
  name: string;
}

interface Document {
  name: string;
  url: string;
}

interface Session {
  key: string;
  title: string;
  content: string;
  quiz: Quiz[];
  documents: Document[];
}

export default function ClassPage() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [activeTab, setActiveTab] = useState("1");
  const router = useRouter();

  useEffect(() => {
    // Fetch sessions data from API
    // For now, we'll use mock data
    setSessions([
      {
        key: "1",
        title: "Giới thiệu về KNN",
        content:
          "<h1>Giới thiệu về KNN</h1><p>KNN (K-Nearest Neighbors) là một thuật toán học máy được sử dụng trong phân loại và hồi quy. Nó dựa trên nguyên tắc rằng các điểm dữ liệu gần nhau có xu hướng thuộc cùng một lớp.</p><h2>Nguyên lý hoạt động</h2><p>KNN hoạt động bằng cách:</p><ul><li>Tính khoảng cách từ điểm cần dự đoán đến tất cả các điểm trong tập huấn luyện</li><li>Chọn K điểm gần nhất</li><li>Dự đoán dựa trên đa số trong K điểm đó</li></ul>",
        quiz: [
          { id: 1, name: "Bài tập 1" },
          { id: 2, name: "Kiểm tra 15 phút" },
          { id: 3, name: "Kiểm tra Cuối Kỳ" },
        ],
        documents: [
          { name: "KNN Overview.pdf", url: "/documents/knn_overview.pdf" },
          {
            name: "KNN in Practice.pdf",
            url: "/documents/knn_in_practice.pdf",
          },
          {
            name: "KNN vs Other Algorithms.pdf",
            url: "/documents/knn_comparison.pdf",
          },
        ],
      },
      {
        key: "2",
        title: "Ứng dụng của KNN",
        content:
          "<h1>Ứng dụng của KNN</h1><p>KNN có nhiều ứng dụng trong thực tế:</p><ul><li>Hệ thống gợi ý</li><li>Nhận dạng chữ viết tay</li><li>Phân tích tài chính</li><li>Chẩn đoán y tế</li><li>Nhận dạng khuôn mặt</li></ul>",
        quiz: [
          { id: 4, name: "Bài tập 2" },
          { id: 5, name: "Kiểm tra 15 phút" },
          { id: 6, name: "Kiểm tra Cuối Kỳ" },
        ],
        documents: [
          {
            name: "KNN Applications.pdf",
            url: "/documents/knn_applications.pdf",
          },
          { name: "Case Studies.pdf", url: "/documents/case_studies.pdf" },
        ],
      },
    ]);
  }, []);

  const navigateToQuizEdit = (quizId: number) => {
    router.push(`/assignment/${quizId}`);
  };

  const navigateToDocumentEdit = (documentUrl: string) => {
    window.open(documentUrl, "_blank");
  };

  return (
    <div className="class-page">
      <Row justify="space-between" align="middle" className="mb-8">
        <Col>
          <Title level={2}>Phương Pháp K Láng Giềng (KNN)</Title>
        </Col>
      </Row>

      <Tabs activeKey={activeTab} onChange={setActiveTab} type="card">
        {sessions.map((session) => (
          <TabPane tab={session.title} key={session.key}>
            <Card>
              <Space
                direction="vertical"
                size="large"
                style={{ width: "100%" }}
              >
                <div>
                  <Title level={4}>
                    <BookOutlined /> {session.title}
                  </Title>
                  <Divider />
                  <RichTextEditor
                    content={session.content}
                    onChange={() => {}}
                    isEditor={false}
                  />
                </div>

                <Row gutter={16}>
                  <Col span={12}>
                    {session.quiz && session.quiz.length > 0 && (
                      <div>
                        <Title level={4}>
                          <FormOutlined /> Bài Tập và Câu Hỏi
                        </Title>
                        <List
                          dataSource={session.quiz}
                          renderItem={(item) => (
                            <List.Item>
                              <List.Item.Meta
                                title={
                                  <a
                                    onClick={() => navigateToQuizEdit(item.id)}
                                  >
                                    {item.name}
                                  </a>
                                }
                              />
                            </List.Item>
                          )}
                        />
                      </div>
                    )}
                  </Col>
                  <Col span={12}>
                    {session.documents && session.documents.length > 0 && (
                      <div>
                        <Title level={4}>
                          <FileTextOutlined /> Tài Liệu
                        </Title>
                        <List
                          dataSource={session.documents}
                          renderItem={(item) => (
                            <List.Item>
                              <List.Item.Meta
                                title={
                                  <a
                                    onClick={() =>
                                      navigateToDocumentEdit(item.url)
                                    }
                                  >
                                    {item.name}
                                  </a>
                                }
                              />
                            </List.Item>
                          )}
                        />
                      </div>
                    )}
                  </Col>
                </Row>
              </Space>
            </Card>
          </TabPane>
        ))}
      </Tabs>
    </div>
  );
}
