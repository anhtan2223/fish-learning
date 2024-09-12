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
  InputNumber,
  Upload,
  Tooltip,
} from "antd";
import {
  ArrowLeftOutlined,
  PlusOutlined,
  SaveOutlined,
  DeleteOutlined,
  LeftOutlined,
  RightOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { MultipleChoiceQuestion , CodeQuestion , Question } from "@/lib/interface";
import MultipleQuestion from "@/ui/assignment/multiple-question";
import CodeQuestionComponent from "@/ui/assignment/code-question";
import DrawerAssignment from "@/ui/assignment/drawer-assignment";
import { questionMock } from "@/lib/mock";

const { Title, Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;


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

        setQuestions(questionMock);
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
    const newQuestion: MultipleChoiceQuestion = {
      id: questions.length + 1,
      type: "multiple_choice",
      content: "",
      options: [""],
      correctAnswer: "",
      points: 1,
    };
    setQuestions([...questions, newQuestion]);
    setCurrentQuestionIndex(questions.length);
  };

  const handleQuestionChange = (field: string, value: any) => {
    const updatedQuestions = [...questions];
    updatedQuestions[currentQuestionIndex] = {
      ...updatedQuestions[currentQuestionIndex],
      [field]: value,
    };
    setQuestions(updatedQuestions);
  };

  const handleDeleteQuestion = () => {
    const updatedQuestions = questions.filter(
      (_, i) => i !== currentQuestionIndex
    );
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
    if (info.file.status === "done") {
      handleQuestionChange("image", info.file.response.url);
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  const handleAddTestCase = () => {
    const currentQuestion = questions[currentQuestionIndex] as CodeQuestion;
    const newTestCases = [
      ...(currentQuestion.testCases || []),
      { input: "", expectedOutput: "", isHidden: false },
    ];
    handleQuestionChange("testCases", newTestCases);
  };

  const handleTestCaseChange = (index: number, field: string, value: any) => {
    const currentQuestion = questions[currentQuestionIndex] as CodeQuestion;
    const newTestCases = [...(currentQuestion.testCases || [])];
    newTestCases[index] = { ...newTestCases[index], [field]: value };
    handleQuestionChange("testCases", newTestCases);
  };

  const handleDeleteTestCase = (index: number) => {
    const currentQuestion = questions[currentQuestionIndex] as CodeQuestion;
    const newTestCases = (currentQuestion.testCases || []).filter((_, i) => i !== index);
    handleQuestionChange("testCases", newTestCases);
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
              <Tooltip title="Câu hỏi trước">
                <Button
                  icon={<LeftOutlined />}
                  onClick={handlePreviousQuestion}
                  disabled={currentQuestionIndex === 0}
                />
              </Tooltip>
              <Tooltip title="Câu hỏi tiếp theo">
                <Button
                  icon={<RightOutlined />}
                  onClick={handleNextQuestion}
                  disabled={currentQuestionIndex === questions.length - 1}
                />
              </Tooltip>
              <Tooltip title="Xem tất cả câu hỏi">
                <Button icon={<MenuOutlined />} onClick={showDrawer} />
              </Tooltip>
              <Tooltip title="Thêm câu hỏi mới">
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={handleAddQuestion}
                >
                  Thêm câu hỏi
                </Button>
              </Tooltip>
              <Text strong>
                Câu hỏi {currentQuestionIndex + 1}/{questions.length}
              </Text>
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
                    onChange={(value) => handleQuestionChange("type", value)}
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
                      <img
                        src={currentQuestion.image}
                        alt="question"
                        style={{ width: "100%" }}
                      />
                    ) : (
                      <div>
                        <PlusOutlined />
                        <div style={{ marginTop: 8 }}>Upload</div>
                      </div>
                    )}
                  </Upload>
                </Form.Item>
                {currentQuestion.type === "multiple_choice" && (
                  <MultipleQuestion
                    currentQuestion={currentQuestion as MultipleChoiceQuestion}
                    currentQuestionIndex={currentQuestionIndex}
                    handleQuestionChange={handleQuestionChange}
                  />
                )}
                {currentQuestion.type === "code" && (
                  <CodeQuestionComponent
                    currentQuestion={currentQuestion as CodeQuestion}
                    currentQuestionIndex={currentQuestionIndex}
                    handleQuestionChange={handleQuestionChange}
                    handleTestCaseChange={handleTestCaseChange}
                    handleAddTestCase={handleAddTestCase}
                    handleDeleteTestCase={handleDeleteTestCase}
                  />  
                )}
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
      <DrawerAssignment
        questions={questions}
        drawerVisible={drawerVisible}
        onCloseDrawer={onCloseDrawer}
        setCurrentQuestionIndex={setCurrentQuestionIndex}
      />
    </div>
  );
}
