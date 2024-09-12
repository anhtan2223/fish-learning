import { QuestionCircleOutlined } from "@ant-design/icons";
import { Drawer, List, Avatar, Typography } from "antd";
import { Question } from "@/lib/interface";

const { Title } = Typography;

export default function DrawerAssignment(
    {
        questions,
        drawerVisible,
        onCloseDrawer,
        setCurrentQuestionIndex,
        } : {
        questions: Question[];
        drawerVisible: boolean;
        onCloseDrawer: () => void;
        setCurrentQuestionIndex: (index: number) => void;
    }
) {
    return (
        <Drawer
        title={<Title level={4}>Tất cả câu hỏi</Title>}
        placement="right"
        onClose={onCloseDrawer}
        open={drawerVisible}
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
              style={{ cursor: "pointer" }}
            >
              <List.Item.Meta
                avatar={<Avatar icon={<QuestionCircleOutlined />} />}
                title={`Câu hỏi ${index + 1} (${question.points} điểm)`}
                description={
                  question.content.length > 50
                    ? `${question.content.substring(0, 50)}...`
                    : question.content
                }
              />
            </List.Item>
          )}
        />
      </Drawer>
    );
}