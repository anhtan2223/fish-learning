import CodeEditor from "@/ui/assignment/code-editor";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { Form, Button, Space, Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import { CodeQuestion } from "@/lib/interface";

export default function CodeQuestionComponent({
  currentQuestion,
  currentQuestionIndex,
  handleQuestionChange,
  handleTestCaseChange,
  handleAddTestCase,
  handleDeleteTestCase,
}: {
  currentQuestion: CodeQuestion;
  currentQuestionIndex: number;
  handleQuestionChange: (field: string, value: any) => void;
  handleTestCaseChange: (index: number, field: string, value: any) => void;
  handleAddTestCase: () => void;
  handleDeleteTestCase: (index: number) => void;
}) {
  return (
    <>
      <Form.Item
        label="Gợi ý"
        name={["questions", currentQuestionIndex, "hint"]}
        initialValue={currentQuestion.hint}
      >
        <TextArea
          rows={2}
          onChange={(e) => handleQuestionChange("hint", e.target.value)}
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
      <Form.Item label="Test Cases">
        <Button
          type="dashed"
          onClick={handleAddTestCase}
          block
          icon={<PlusOutlined />}
        >
          Thêm Test Case
        </Button>
        {currentQuestion.testCases?.map((testCase, index) => (
          <Space
            key={index}
            direction="vertical"
            style={{ width: "100%", marginTop: 16 }}
          >
            <Input
              placeholder="Input"
              value={testCase.input}
              onChange={(e) =>
                handleTestCaseChange(index, "input", e.target.value)
              }
            />
            <Input
              placeholder="Expected Output"
              value={testCase.expectedOutput}
              onChange={(e) =>
                handleTestCaseChange(index, "expectedOutput", e.target.value)
              }
            />
            <Button
              type="text"
              danger
              icon={<MinusCircleOutlined />}
              onClick={() => handleDeleteTestCase(index)}
            >
              Xóa Test Case
            </Button>
          </Space>
        ))}
      </Form.Item>
    </>
  );
}
