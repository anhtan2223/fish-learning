"use client";
import { useState, useEffect } from "react";
import {
  Typography,
  Tabs,
  Card,
  Button,
  Space,
  Form,
  Input,
  Modal,
  Switch,
  message,
  Row,
  Col,
  Divider,
  List,
} from "antd";
import {
  BookOutlined,
  FormOutlined,
  FileTextOutlined,
  PlusOutlined,
  EditOutlined,
  EyeOutlined,
  DeleteOutlined,
  SettingOutlined,
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
  id: number;
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

export default function EditClassPage() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [activeTab, setActiveTab] = useState("1");
  const [title, setTitle] = useState("");
  const [form] = Form.useForm();
  const [isEditing, setIsEditing] = useState(false);
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
          {
            id: 1,
            name: "KNN Overview.pdf",
            url: "/documents/knn_overview.pdf",
          },
          {
            id: 2,
            name: "KNN in Practice.pdf",
            url: "/documents/knn_in_practice.pdf",
          },
          {
            id: 3,
            name: "KNN vs Other Algorithms.pdf",
            url: "/documents/knn_comparison.pdf",
          },
        ],
      },
      {
        key: "2",
        title: "Giới thiệu về Naive Bayes",
        content:
          '<h1>Giới thiệu về Naive Bayes</h1><p>Naive Bayes là một thuật toán phân loại dựa trên định lý Bayes với giả định "naive" về sự độc lập giữa các đặc trưng.</p><h2>Ưu điểm</h2><ul><li>Đơn giản và hiệu quả</li><li>Hoạt động tốt với dữ liệu có chiều cao</li><li>Phù hợp cho các bài toán phân loại văn bản</li></ul>',
        quiz: [
          { id: 1, name: "Bài tập 2" },
          { id: 2, name: "Kiểm tra 15 phút" },
          { id: 3, name: "Kiểm tra Cuối Kỳ" },
        ],
        documents: [
          {
            id: 1,
            name: "Naive Bayes Explained.pdf",
            url: "/documents/naive_bayes_explained.pdf",
          },
          {
            id: 2,
            name: "Probabilistic Models in ML.pdf",
            url: "/documents/probabilistic_models.pdf",
          },
        ],
      },
      {
        key: "3",
        title: "Cây quyết định và Random Forest",
        content:
          "<h1>Cây quyết định và Random Forest</h1><p>Cây quyết định là một mô hình dự đoán có cấu trúc cây, trong khi Random Forest là một tập hợp các cây quyết định.</p><h2>So sánh</h2><table><tr><th>Cây quyết định</th><th>Random Forest</th></tr><tr><td>Dễ hiểu và diễn giải</td><td>Độ chính xác cao hơn</td></tr><tr><td>Có thể overfitting</td><td>Giảm thiểu overfitting</td></tr></table>",
        quiz: [
          { id: 1, name: "Bài tập 3" },
          { id: 2, name: "Kiểm tra 15 phút" },
          { id: 3, name: "Kiểm tra Cuối Kỳ" },
        ],
        documents: [
          {
            id: 1,
            name: "Decision Trees Basics.pdf",
            url: "/documents/decision_trees.pdf",
          },
          {
            id: 2,
            name: "Random Forest Algorithm.pdf",
            url: "/documents/random_forest.pdf",
          },
          {
            id: 3,
            name: "Ensemble Methods in ML.pdf",
            url: "/documents/ensemble_methods.pdf",
          },
        ],
      },
      {
        key: "4",
        title: "Giới thiệu về SVM",
        content:
          "<h1>Giới thiệu về SVM</h1><p>Support Vector Machine (SVM) là một thuật toán học có giám sát được sử dụng cho cả bài toán phân loại và hồi quy.</p><h2>Khái niệm chính</h2><ul><li>Hyperplane: Mặt phẳng phân chia các lớp</li><li>Margin: Khoảng cách từ hyperplane đến các điểm gần nhất</li><li>Support Vectors: Các điểm gần nhất với hyperplane</li></ul><p>SVM tìm kiếm hyperplane có margin lớn nhất để phân loại dữ liệu.</p>",
        quiz: [
          { id: 1, name: "Bài tập 4" },
          { id: 2, name: "Kiểm tra 15 phút" },
          { id: 3, name: "Kiểm tra Cuối Kỳ" },
        ],
        documents: [
          {
            id: 1,
            name: "SVM Fundamentals.pdf",
            url: "/documents/svm_fundamentals.pdf",
          },
          {
            id: 2,
            name: "Kernel Tricks in SVM.pdf",
            url: "/documents/kernel_tricks.pdf",
          },
        ],
      },
      // ... other sessions
    ]);
  }, []);

  const handleSave = (values: Partial<Session>) => {
    const updatedSessions = sessions.map((session) =>
      session.key === activeTab ? { ...session, ...values } : session
    );
    setSessions(updatedSessions);
    message.success("Changes saved successfully!");
  };

  const handleAddSession = () => {
    const newSession: Session = {
      key: String(sessions.length + 1),
      title: `New Session ${sessions.length + 1}`,
      content: "",
      quiz: [],
      documents: [],
    };
    setSessions([...sessions, newSession]);
    setActiveTab(newSession.key);
  };

  const handleDeleteSession = (key: string) => {
    Modal.confirm({
      title: "Are you sure you want to delete this session?",
      content: "This action cannot be undone.",
      onOk() {
        const updatedSessions = sessions.filter(
          (session) => session.key !== key
        );
        setSessions(updatedSessions);
        if (key === activeTab) {
          setActiveTab(updatedSessions[0]?.key || "1");
        }
        message.success("Session deleted successfully");
      },
    });
  };

  const navigateToAssignmentEdit = (assignmentId: number) => {
    router.push(`/teacher/class/${activeTab}/assignment/${assignmentId}`);
  };
  const navigateToAssignmentCreate = () => {
    router.push(`/teacher/class/${activeTab}/assignment`);
  };

  const navigateToDocumentEdit = (docId: string) => {
    router.push(`/teacher/class/${activeTab}/document/${docId}`);
  };
  const navigateToDocumentCreate = () => {
    router.push(`/teacher/class/${activeTab}/document`);
  };

  const navigateToClassroomSettings = () => {
    router.push(`/teacher/class/${activeTab}/setting`);
  };

  return (
    <div className="edit-class-page">
      <Row justify="space-between" align="middle" className="mb-8">
        <Row align="middle" justify="space-between" className="w-fit mt-4">
          <p className="h-full items-center text-3xl font-bold">
            Máy Học Ứng Dụng
          </p>
          <div
            onClick={navigateToClassroomSettings}
            className="cursor-pointer h-full items-center ml-3"
          >
            <SettingOutlined style={{ fontSize: "30px" }} />
          </div>
        </Row>
        <Col>
          <Space>
            <Switch
              checkedChildren={<EditOutlined />}
              unCheckedChildren={<EyeOutlined />}
              checked={isEditing}
              onChange={(checked) => setIsEditing(checked)}
            />
            <Button
              type="primary"
              onClick={handleAddSession}
              icon={<PlusOutlined />}
            >
              Add Session
            </Button>
          </Space>
        </Col>
      </Row>

      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        type="card"
        tabBarExtraContent={{
          right: (
            <Button
              danger
              icon={<DeleteOutlined />}
              onClick={() => handleDeleteSession(activeTab)}
            >
              Delete Session
            </Button>
          ),
        }}
      >
        {sessions.map((session) => (
          <TabPane tab={session.title} key={session.key}>
            <Card>
              {isEditing ? (
                <Form
                  form={form}
                  initialValues={session}
                  onFinish={handleSave}
                  layout="vertical"
                >
                  <Form.Item label="Tiêu Đề" name="title">
                    <Input />
                  </Form.Item>

                  <Form.Item name="content" label="Nội Dung">
                    <RichTextEditor
                      content={session.content}
                      onChange={(content) => (session.content = content)}
                      isEditor={true}
                    />
                  </Form.Item>

                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item label="Bài Tập và Câu Hỏi">
                        <List
                          dataSource={session.quiz}
                          renderItem={(item) => (
                            <List.Item
                              actions={[
                                <Button
                                  key="edit"
                                  onClick={() =>
                                    navigateToAssignmentEdit(item.id)
                                  }
                                >
                                  Chỉnh sửa
                                </Button>,
                              ]}
                            >
                              <List.Item.Meta title={item.name} />
                            </List.Item>
                          )}
                        />
                        <Button
                          type="dashed"
                          icon={<PlusOutlined />}
                          onClick={() => navigateToAssignmentCreate()}
                          block
                          style={{ marginTop: "10px" }}
                        >
                          Thêm Bài Tập/Câu Hỏi Mới
                        </Button>
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label="Tài Liệu">
                        <List
                          dataSource={session.documents}
                          renderItem={(item) => (
                            <List.Item
                              actions={[
                                <Button
                                  key="edit"
                                  onClick={() =>
                                    navigateToDocumentEdit(item.id.toString())
                                  }
                                >
                                  Chỉnh sửa
                                </Button>,
                              ]}
                            >
                              <List.Item.Meta title={item.name} />
                            </List.Item>
                          )}
                        />
                        <Button
                          type="dashed"
                          icon={<PlusOutlined />}
                          onClick={() => navigateToDocumentCreate()}
                          block
                          style={{ marginTop: "10px" }}
                        >
                          Thêm Tài Liệu Mới
                        </Button>
                      </Form.Item>
                    </Col>
                  </Row>

                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      Lưu Thay Đổi
                    </Button>
                  </Form.Item>
                </Form>
              ) : (
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
                      onChange={(content) => handleSave({ content })}
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
                                      onClick={() =>
                                        navigateToAssignmentEdit(item.id)
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
                                        navigateToDocumentEdit(
                                          item.id.toString()
                                        )
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
              )}
            </Card>
          </TabPane>
        ))}
      </Tabs>
    </div>
  );
}
