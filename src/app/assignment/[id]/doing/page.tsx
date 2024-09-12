"use client";
import { useState, useEffect } from "react";
import MenuQuestion from "@/ui/common/menu-question";
import { Button, Card, Typography, Space, message, Tooltip, Radio } from "antd";
import CodeEditor from "@ui/assignment/code-editor";
import {
  RightOutlined,
  FileTextOutlined,
  ClockCircleOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { useRouter, useSearchParams, useParams } from "next/navigation";
import Link from "next/link";
import {
  Question,
  MultipleChoiceQuestion,
  CodeQuestion,
} from "@/lib/interface";
import { questionMock } from "@/lib/mock";

const { Title, Paragraph, Text } = Typography;

export default function Assignment() {
  const [code, setCode] = useState<string | undefined>("");
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(-1);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useParams();
  const assignmentId = params.id;

  const questions: Question[] = questionMock;

  useEffect(() => {
    const questionId = searchParams.get("question");
    if (questionId) {
      const index = questions.findIndex((q) => q.id === parseInt(questionId));
      if (index !== -1) {
        setCurrentQuestion(index);
      }
    }
  }, [searchParams]);

  useEffect(() => {
    if (timeRemaining === -1) return;

    const timer = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          setIsTimeUp(true);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemaining]);

  useEffect(() => {
    if (isTimeUp) {
      message.warning("Hết thời gian làm bài!");
      handleSubmit();
    }
  }, [isTimeUp]);

  const handleCodeChange = (newCode: string | undefined) => {
    setCode(newCode);
  };

  const handleAnswerChange = (e: any) => {
    setSelectedAnswer(e.target.value);
  };

  const handleSubmit = () => {
    if (questions[currentQuestion].type === "code") {
      console.log("Submitted code:", code);
    } else {
      console.log("Submitted answer:", selectedAnswer);
    }
    setIsSubmitted(true);
    message.success("Bài làm đã được nộp thành công!");
    setTimeout(() => {
      router.push(`/assignment/result/1`);
    }, 1000);
  };

  const formatTime = (seconds: number) => {
    if (seconds === -1) return "Không giới hạn";
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      const nextQuestion = currentQuestion + 1;
      setCurrentQuestion(nextQuestion);
      setCode("");
      setSelectedAnswer("");
      setIsSubmitted(false);
      router.push(
        `/assignment/${assignmentId}/doing?question=${questions[nextQuestion].id}`,
        { scroll: false }
      );
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      const prevQuestion = currentQuestion - 1;
      setCurrentQuestion(prevQuestion);
      setCode("");
      setSelectedAnswer("");
      setIsSubmitted(false);
      router.push(
        `/assignment/${assignmentId}/doing?question=${questions[prevQuestion].id}`,
        { scroll: false }
      );
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 min-h-screen">
      <div className="fixed top-0 left-0">
        <MenuQuestion
          number={questions.length}
          assignmentId={assignmentId.toString()}
        />
      </div>
      <Card className="mt-6 shadow-lg rounded-xl overflow-hidden">
        <Space direction="vertical" size="large" className="w-full">
          <div className="flex justify-between items-center p-4 rounded-lg">
            <Title level={2} className="text-blue-700 mb-0">
              Bài Tập Số {assignmentId}
            </Title>
            <Tooltip title="Thời gian còn lại để hoàn thành bài tập">
              <Text
                strong
                className={`text-lg ${
                  timeRemaining > 0 && timeRemaining < 300
                    ? "text-red-500"
                    : "text-blue-600"
                }`}
              >
                <ClockCircleOutlined className="mr-2" />
                {formatTime(timeRemaining)}
              </Text>
            </Tooltip>
          </div>
          <div
            key={currentQuestion}
            className="transition-all duration-300 ease-in-out"
          >
            <Card
              title={
                <div className="flex items-center">
                  <Link
                    href={`/assignment/${assignmentId}/doing?question=${questions[currentQuestion].id}`}
                    scroll={false}
                  >
                    <Title level={3} className="mb-0 mr-2 text-blue-600">
                      Câu {currentQuestion + 1}
                    </Title>
                  </Link>
                  <Text type="secondary">
                    ({questions[currentQuestion].points} điểm)
                  </Text>
                </div>
              }
              extra={<FileTextOutlined className="text-2xl text-blue-500" />}
              className="shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <Paragraph className="text-lg">
                {questions[currentQuestion].content}
              </Paragraph>
              {questions[currentQuestion].type === "code" && (
                <Paragraph type="secondary" className="text-sm p-2 rounded-md">
                  <InfoCircleOutlined className="mr-1 text-yellow-500" /> Gợi ý:{" "}
                  {(questions[currentQuestion] as CodeQuestion).hint}
                </Paragraph>
              )}
            </Card>
          </div>
          <Card
            title={
              <Title level={4} className="text-blue-600">
                Trả Lời
              </Title>
            }
            className="shadow-inner"
          >
            {questions[currentQuestion].type === "code" ? (
              <div className="h-fit mb-6 rounded-md overflow-hidden">
                <CodeEditor onChange={handleCodeChange} initialValue={code} />
              </div>
            ) : (
              <Radio.Group onChange={handleAnswerChange} value={selectedAnswer}>
                <Space direction="vertical">
                  {(
                    questions[currentQuestion] as MultipleChoiceQuestion
                  ).options.map((option, index) => (
                    <Radio key={index} value={option}>
                      {option}
                    </Radio>
                  ))}
                </Space>
              </Radio.Group>
            )}
            <div className="flex justify-between items-center w-full mt-6">
              <Button
                type="default"
                icon={<RightOutlined style={{ transform: "rotate(180deg)" }} />}
                size="large"
                onClick={handlePreviousQuestion}
                disabled={currentQuestion === 0}
                className="hover:bg-blue-50 transition-colors duration-300"
              >
                Câu Trước
              </Button>
              {currentQuestion === questions.length - 1 ? (
                <Button
                  type="primary"
                  size="large"
                  onClick={handleSubmit}
                  className="bg-green-500 hover:bg-green-600 border-none"
                >
                  Nộp Bài
                </Button>
              ) : (
                <Button
                  type="default"
                  icon={<RightOutlined />}
                  size="large"
                  onClick={handleNextQuestion}
                  disabled={currentQuestion === questions.length - 1}
                  className="hover:bg-blue-50 transition-colors duration-300"
                >
                  Câu Tiếp Theo
                </Button>
              )}
            </div>
          </Card>
        </Space>
      </Card>
    </div>
  );
}
