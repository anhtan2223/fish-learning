import {
  MinusCircleOutlined,
  CheckCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Form, Space, Radio, Input, Tooltip, Button, message } from "antd";
import { MultipleChoiceQuestion } from "@/lib/interface";

export default function MultipleQuestion({
  currentQuestion,
  currentQuestionIndex,
  handleQuestionChange,
}: {
  currentQuestion: MultipleChoiceQuestion;
  currentQuestionIndex: number;
  handleQuestionChange: (field: string, value: any) => void;
}) {
  return (
    <div>
      <Form.List
        name={["questions", currentQuestionIndex, "options"]}
        initialValue={currentQuestion.options}
      >
        {(fields, { add, remove }) => (
          <>
            <Form.Item label="Đáp án" required>
              <Space direction="vertical" style={{ width: "100%" }}>
                {fields.map((field, index) => (
                  <Space
                    key={field.key}
                    style={{
                      display: "flex",
                      marginBottom: 8,
                      width: "100%",
                    }}
                    align="baseline"
                  >
                    <Radio
                      value={currentQuestion.options[index]}
                      checked={
                        currentQuestion.correctAnswer ===
                        currentQuestion.options[index]
                      }
                      onChange={(e) =>
                        handleQuestionChange("correctAnswer", e.target.value)
                      }
                    >
                      <Form.Item
                        {...field}
                        validateTrigger={["onChange", "onBlur"]}
                        rules={[
                          {
                            required: true,
                            whitespace: true,
                            message:
                              "Vui lòng nhập lựa chọn hoặc xóa trường này.",
                          },
                        ]}
                        noStyle
                      >
                        <Input
                          placeholder={`Lựa chọn ${index + 1}`}
                          style={{ width: 300 }}
                          onChange={(e) => {
                            const newOptions = [...currentQuestion.options];
                            newOptions[index] = e.target.value;
                            handleQuestionChange("options", newOptions);
                          }}
                        />
                      </Form.Item>
                    </Radio>
                    <Tooltip title="Xóa lựa chọn">
                      <Button
                        type="text"
                        danger
                        icon={<MinusCircleOutlined />}
                        onClick={() => {
                          if (fields.length > 1) {
                            remove(field.name);
                            const newOptions = [...currentQuestion.options];
                            newOptions.splice(index, 1);
                            handleQuestionChange("options", newOptions);
                            if (
                              currentQuestion.correctAnswer ===
                              currentQuestion.options[index]
                            ) {
                              handleQuestionChange("correctAnswer", "");
                            }
                          } else {
                            message.warning("Phải có ít nhất một đáp án");
                          }
                        }}
                      />
                    </Tooltip>
                    {currentQuestion.correctAnswer ===
                      currentQuestion.options[index] && (
                      <Tooltip title="Đáp án đúng">
                        <CheckCircleOutlined style={{ color: "#52c41a" }} />
                      </Tooltip>
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
                  const newOptions = [...currentQuestion.options, ""];
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
    </div>
  );
}
