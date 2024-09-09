"use client";
import { useState, useEffect } from "react";
import { Card, Space, Typography, Button, Input, message } from "antd";
import { useRouter, useParams } from "next/navigation";
import { EditOutlined, SaveOutlined } from "@ant-design/icons";

const { Title, Paragraph } = Typography;
const { TextArea } = Input;

export default function EditQuestionPage() {
  const [question, setQuestion] = useState({
    id: "",
    title: "",
    content: "",
    hint: "",
  });
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    if (params.id) {
      // Fetch question data based on id
      // This is a placeholder. Replace with actual API call
      setQuestion({
        id: params.id as string,
        title: "Sample Question",
        content: "This is a sample question content.",
        hint: "This is a sample hint.",
      });
    }
  }, [params.id]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setQuestion((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // Save the updated question
    // This is a placeholder. Replace with actual API call
    console.log("Saving question:", question);
    message.success("Question saved successfully!");
    router.push(`/assignment/${question.id}`);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen">
      <Card className="shadow-lg rounded-xl">
        <Space direction="vertical" size="large" className="w-full">
          <Title level={2} className="text-center text-blue-600">
            Edit Question
          </Title>
          <Input
            name="title"
            value={question.title}
            onChange={handleInputChange}
            placeholder="Question Title"
            prefix={<EditOutlined />}
            size="large"
          />
          <TextArea
            name="content"
            value={question.content}
            onChange={handleInputChange}
            placeholder="Question Content"
            autoSize={{ minRows: 4, maxRows: 8 }}
          />
          <TextArea
            name="hint"
            value={question.hint}
            onChange={handleInputChange}
            placeholder="Question Hint"
            autoSize={{ minRows: 2, maxRows: 4 }}
          />
          <Button
            type="primary"
            icon={<SaveOutlined />}
            size="large"
            onClick={handleSave}
            className="w-full"
          >
            Save Question
          </Button>
        </Space>
      </Card>
    </div>
  );
}
