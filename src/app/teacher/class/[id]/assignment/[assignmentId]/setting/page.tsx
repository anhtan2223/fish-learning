"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Typography,
  Card,
  Button,
  Space,
  Input,
  Form,
  Select,
  message,
  Spin,
  Divider,
  Popconfirm,
  Radio,
  Drawer,
  List,
  Avatar,
  InputNumber,
  Upload,
} from "antd";
import {
  ArrowLeftOutlined,
  PlusOutlined,
  SaveOutlined,
  DeleteOutlined,
  LeftOutlined,
  RightOutlined,
  MinusCircleOutlined,
  MenuOutlined,
  QuestionCircleOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import CodeEditor from "@/ui/assignment/code-editor";

const { Title, Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;

interface Question {
  id: number;
  type: string;
  content: string;
  options?: string[];
  correctAnswer?: string;
  points: number;
  explanation?: string;
  hint?: string;
  codeAnswer?: string;
  image?: string;
}

export default function Page() {
  const router = useRouter();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [assignment, setAssignment] = useState<any>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [drawerVisible, setDrawerVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Simulating API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        setAssignment({
          id: 1,
          title: "Triển khai Thuật toán KNN",
        });

        setQuestions([
          {
            id: 1,
            type: "multiple_choice",
            content: "Thuật toán KNN là viết tắt của?",
            options: [
              "K-Nearest Neighbors",
              "K-Nearest Networks",
              "K-Nearest Nodes",
              "K-Nearest Numerals",
            ],
            correctAnswer: "K-Nearest Neighbors",
            points: 1,
            explanation: "KNN stands for K-Nearest Neighbors, a popular machine learning algorithm.",
          },
          {
            id: 2,
            type: "code",
            content: "Viết một hàm Python để tính khoảng cách Euclidean giữa hai điểm.",
            points: 2,
            hint: "Hãy sử dụng công thức khoảng cách Euclidean và hàm math.sqrt().",
            codeAnswer: "import math\n\ndef euclidean_distance(point1, point2):\n    return math.sqrt(sum((p1 - p2) ** 2 for p1, p2 in zip(point1, point2)))",
          },
        ]);
      } catch (error) {
        message.error("Có lỗi xảy ra khi tải dữ liệu");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const goBack = () => {
    router.back();
  };

  const handleAddQuestion = () => {
    const newQuestion: Question = {
      id: questions.length + 1,
      type: "multiple_choice",
      content: "",
      options: [""],
      correctAnswer: "",
      points: 1,
      explanation: "",
      hint: "",
      codeAnswer: "",
    };
    setQuestions([...questions, newQuestion]);
    setCurrentQuestionIndex(questions.length);
  };

  const handleQuestionChange = (field: string, value: any) => {
    const updatedQuestions = [...questions];
    updatedQuestions[currentQuestionIndex] = { ...updatedQuestions[currentQuestionIndex], [field]: value };
    setQuestions(updatedQuestions);
  };

  const handleDeleteQuestion = () => {
    const updatedQuestions = questions.filter((_, i) => i !== currentQuestionIndex);
    setQuestions(updatedQuestions);
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSave = async () => {
    try {
      await form.validateFields();
      // Implement save logic here
      message.success("Đã lưu thay đổi");
    } catch (error) {
      message.error("Vui lòng kiểm tra lại thông tin");
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const showDrawer = () => {
    setDrawerVisible(true);
  };

  const onCloseDrawer = () => {
    setDrawerVisible(false);
  };

  const handleImageUpload = (info: any) => {
    if (info.file.status === 'done') {
      handleQuestionChange("image", info.file.response.url);
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="p-6">
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <Button icon={<ArrowLeftOutlined />} onClick={goBack}>
          Quay lại
        </Button>
        <Card>
          <Title level={2}>Cài đặt bài tập: {assignment?.title}</Title>
          <Form form={form} layout="vertical">
            <Space style={{ marginBottom: 16 }}>
              <Button
                icon={<LeftOutlined />}
                onClick={handlePreviousQuestion}
                disabled={currentQuestionIndex === 0}
              >
                Câu trước
              </Button>
              <Button
                icon={<RightOutlined />}
                onClick={handleNextQuestion}
                disabled={currentQuestionIndex === questions.length - 1}
              >
                Câu sau
              </Button>
              <Button icon={<MenuOutlined />} onClick={showDrawer}>
                Tất cả câu hỏi
              </Button>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={handleAddQuestion}
              >
                Thêm câu hỏi
              </Button>
              <Text>Câu hỏi {currentQuestionIndex + 1}/{questions.length}</Text>
            </Space>
            <Card style={{ marginBottom: 16 }}>
              <Space direction="vertical" style={{ width: "100%" }}>
                <Form.Item
                  label="Loại câu hỏi"
                  required
                  name={["questions", currentQuestionIndex, "type"]}
                  initialValue={currentQuestion.type}
                >
                  <Select
                    onChange={(value) =>
                      handleQuestionChange("type", value)
                    }
                  >
                    <Option value="multiple_choice">Trắc nghiệm</Option>
                    <Option value="code">Câu trả lời bằng Code</Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  label="Điểm"
                  required
                  name={["questions", currentQuestionIndex, "points"]}
                  initialValue={currentQuestion.points}
                >
                  <InputNumber
                    min={0}
                    onChange={(value) => handleQuestionChange("points", value)}
                  />
                </Form.Item>
                <Form.Item
                  label="Nội dung câu hỏi"
                  required
                  name={["questions", currentQuestionIndex, "content"]}
                  initialValue={currentQuestion.content}
                >
                  <TextArea
                    rows={4}
                    onChange={(e) =>
                      handleQuestionChange("content", e.target.value)
                    }
                  />
                </Form.Item>
                <Form.Item
                  label="Hình ảnh (nếu có)"
                  name={["questions", currentQuestionIndex, "image"]}
                >
                  <Upload
                    name="image"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    action="/api/upload" // Replace with your upload API
                    onChange={handleImageUpload}
                  >
                    {currentQuestion.image ? (
                      <img src={currentQuestion.image} alt="question" style={{ width: '100%' }} />
                    ) : (
                      <div>
                        <PlusOutlined />
                        <div style={{ marginTop: 8 }}>Upload</div>
                      </div>
                    )}
                  </Upload>
                </Form.Item>
                {currentQuestion.type === "multiple_choice" && (
                  <Form.List
                    name={["questions", currentQuestionIndex, "options"]}
                    initialValue={currentQuestion.options}
                  >
                    {(fields, { add, remove }) => (
                      <>
                        <Form.Item
                          label="Đáp án"
                          required
                        >
                          <Space direction="vertical" style={{ width: '100%' }}>
                            {fields.map((field, index) => (
                              <Space key={field.key} style={{ display: 'flex', marginBottom: 8, width: '100%' }} align="baseline">
                                <Radio
                                  value={currentQuestion.options?.[index]}
                                  checked={currentQuestion.correctAnswer === currentQuestion.options?.[index]}
                                  onChange={(e) => handleQuestionChange("correctAnswer", e.target.value)}
                                >
                                  <Form.Item
                                    {...field}
                                    validateTrigger={["onChange", "onBlur"]}
                                    rules={[
                                      {
                                        required: true,
                                        whitespace: true,
                                        message: "Vui lòng nhập lựa chọn hoặc xóa trường này.",
                                      },
                                    ]}
                                    noStyle
                                  >
                                    <Input
                                      placeholder={`Lựa chọn ${index + 1}`}
                                      style={{ width: 300 }}
                                      onChange={(e) => {
                                        const newOptions = [...(currentQuestion.options || [])];
                                        newOptions[index] = e.target.value;
                                        handleQuestionChange("options", newOptions);
                                      }}
                                    />
                                  </Form.Item>
                                </Radio>
                                <Button
                                  type="text"
                                  danger
                                  icon={<MinusCircleOutlined />}
                                  onClick={() => {
                                    if (fields.length > 1) {
                                      remove(field.name);
                                      const newOptions = [...(currentQuestion.options || [])];
                                      newOptions.splice(index, 1);
                                      handleQuestionChange("options", newOptions);
                                      if (currentQuestion.correctAnswer === currentQuestion.options?.[index]) {
                                        handleQuestionChange("correctAnswer", "");
                                      }
                                    } else {
                                      message.warning("Phải có ít nhất một đáp án");
                                    }
                                  }}
                                >
                                  Xóa
                                </Button>
                                {currentQuestion.correctAnswer === currentQuestion.options?.[index] && (
                                  <CheckCircleOutlined style={{ color: '#52c41a' }} />
                                )}
                              </Space>
                            ))}
                          </Space>
                        </Form.Item>
                        <Form.Item>
                          <Button
                            type="dashed"
                            onClick={() => {
                              add();
                              const newOptions = [...(currentQuestion.options || []), ""];
                              handleQuestionChange("options", newOptions);
                            }}
                            block
                            icon={<PlusOutlined />}
                          >
                            Thêm lựa chọn
                          </Button>
                        </Form.Item>
                      </>
                    )}
                  </Form.List>
                )}
                {currentQuestion.type === "code" && (
                  <>
                    <Form.Item
                      label="Gợi ý"
                      name={["questions", currentQuestionIndex, "hint"]}
                      initialValue={currentQuestion.hint}
                    >
                      <TextArea
                        rows={2}
                        onChange={(e) =>
                          handleQuestionChange("hint", e.target.value)
                        }
                        placeholder="Nhập gợi ý cho câu hỏi code"
                      />
                    </Form.Item>
                    <Form.Item
                      label="Đáp án mẫu"
                      name={["questions", currentQuestionIndex, "codeAnswer"]}
                      initialValue={currentQuestion.codeAnswer}
                    >
                      <CodeEditor
                        initialValue={currentQuestion.codeAnswer}
                        onChange={(value) => handleQuestionChange("codeAnswer", value)}
                      />
                    </Form.Item>
                  </>
                )}
                <Form.Item
                  label="Giải thích đáp án"
                  name={["questions", currentQuestionIndex, "explanation"]}
                  initialValue={currentQuestion.explanation}
                >
                  <TextArea
                    rows={2}
                    onChange={(e) =>
                      handleQuestionChange("explanation", e.target.value)
                    }
                  />
                </Form.Item>
                <Popconfirm
                  title="Bạn có chắc chắn muốn xóa câu hỏi này?"
                  onConfirm={handleDeleteQuestion}
                  okText="Có"
                  cancelText="Không"
                >
                  <Button danger icon={<DeleteOutlined />}>
                    Xóa câu hỏi
                  </Button>
                </Popconfirm>
              </Space>
            </Card>
            <Divider />
            <Button
              type="primary"
              icon={<SaveOutlined />}
              onClick={handleSave}
              block
            >
              Lưu thay đổi
            </Button>
          </Form>
        </Card>
      </Space>
      <Drawer
        title={<Title level={4}>Tất cả câu hỏi</Title>}
        placement="right"
        onClose={onCloseDrawer}
        visible={drawerVisible}
        width={400}
      >
        <List
          itemLayout="horizontal"
          dataSource={questions}
          renderItem={(question, index) => (
            <List.Item
              key={question.id}
              onClick={() => {
                setCurrentQuestionIndex(index);
                onCloseDrawer();
              }}
              style={{ cursor: 'pointer' }}
            >
              <List.Item.Meta
                avatar={<Avatar icon={<QuestionCircleOutlined />} />}
                title={`Câu hỏi ${index + 1} (${question.points} điểm)`}
                description={question.content.length > 50 ? `${question.content.substring(0, 50)}...` : question.content}
              />
            </List.Item>
          )}
        />
      </Drawer>
    </div>
  );
}
