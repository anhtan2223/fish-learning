'use client'
import { useState, useEffect } from 'react';
import { Typography, Tabs, Card, Button, Space, Form, Input, Modal, Switch, message } from 'antd';
import { BookOutlined, FormOutlined, FileTextOutlined, PlusOutlined, EditOutlined, EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import ReactMarkdown from 'react-markdown';
import { useRouter } from 'next/navigation';

const { Title } = Typography;
const { TabPane } = Tabs;
const { TextArea } = Input;

interface Quiz {
  id: number;
  question: string;
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

export default function EditClassPage() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [activeTab, setActiveTab] = useState('1');
  const [form] = Form.useForm();
  const [isEditing, setIsEditing] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Fetch sessions data from API
    // For now, we'll use mock data
    setSessions([
      {
        key: '1',
        title: 'Giới thiệu về KNN',
        content: '# Giới thiệu về KNN\n\nKNN (K-Nearest Neighbors) là một thuật toán học máy...',
        quiz: [
          { id: 1, question: 'KNN là viết tắt của gì?' },
          { id: 2, question: 'KNN có thể được sử dụng cho bài toán nào?' },
        ],
        documents: [
          { name: 'KNN Overview.pdf', url: '/documents/knn_overview.pdf' },
          { name: 'KNN in Practice.pdf', url: '/documents/knn_in_practice.pdf' },
        ],
      },
      // ... other sessions
    ]);
  }, []);

  const handleSave = (values: Partial<Session>) => {
    const updatedSessions = sessions.map(session => 
      session.key === activeTab ? { ...session, ...values } : session
    );
    setSessions(updatedSessions);
    message.success('Changes saved successfully!');
  };

  const handleAddSession = () => {
    const newSession: Session = {
      key: String(sessions.length + 1),
      title: `New Session ${sessions.length + 1}`,
      content: '',
      quiz: [],
      documents: [],
    };
    setSessions([...sessions, newSession]);
    setActiveTab(newSession.key);
  };

  const handleDeleteSession = (key: string) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this session?',
      content: 'This action cannot be undone.',
      onOk() {
        const updatedSessions = sessions.filter(session => session.key !== key);
        setSessions(updatedSessions);
        if (key === activeTab) {
          setActiveTab(updatedSessions[0]?.key || '1');
        }
        message.success('Session deleted successfully');
      },
    });
  };

  const navigateToQuizEdit = (quizId: number) => {
    router.push(`/teacher/class/${activeTab}/quiz/${quizId}`);
  };

  const navigateToDocumentEdit = (documentUrl: string) => {
    router.push(`/teacher/class/${activeTab}/document?url=${encodeURIComponent(documentUrl)}`);
  };

  return (
    <div className="edit-class-page">
      <Title level={2} className="text-center mb-8">Edit: Phương Pháp K Láng Giềng (KNN)</Title>
      
      <Space className="mb-4">
        <Switch
          checkedChildren={<EditOutlined />}
          unCheckedChildren={<EyeOutlined />}
          checked={isEditing}
          onChange={(checked) => setIsEditing(checked)}
        />
      </Space>

      <Tabs 
        activeKey={activeTab} 
        onChange={setActiveTab}
        type="editable-card"
        onEdit={(targetKey, action) => {
          if (action === 'add') {
            handleAddSession();
          } else if (action === 'remove') {
            handleDeleteSession(targetKey as string);
          }
        }}
      >
        {sessions.map(session => (
          <TabPane tab={session.title} key={session.key}>
            <Card>
              {isEditing ? (
                <Form
                  form={form}
                  initialValues={session}
                  onFinish={handleSave}
                  layout="vertical"
                >
                  <Form.Item name="title" label="Session Title">
                    <Input />
                  </Form.Item>
                  <Form.Item name="content" label="Content">
                    <TextArea rows={10} />
                  </Form.Item>
                  
                  <Form.Item label="Quiz">
                    <Space direction="vertical">
                      {session.quiz.map((q, index) => (
                        <Button key={index} onClick={() => navigateToQuizEdit(q.id)}>
                          Quiz {index + 1}: {q.question}
                        </Button>
                      ))}
                      <Button type="dashed" icon={<PlusOutlined />} onClick={() => navigateToQuizEdit(session.quiz.length + 1)}>
                        Add New Quiz
                      </Button>
                    </Space>
                  </Form.Item>

                  <Form.Item label="Documents">
                    <Space direction="vertical">
                      {session.documents.map((doc, index) => (
                        <Button key={index} onClick={() => navigateToDocumentEdit(doc.url)}>
                          {doc.name}
                        </Button>
                      ))}
                      <Button type="dashed" icon={<PlusOutlined />} onClick={() => navigateToDocumentEdit('')}>
                        Add New Document
                      </Button>
                    </Space>
                  </Form.Item>

                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      Save Changes
                    </Button>
                  </Form.Item>
                </Form>
              ) : (
                <Space direction="vertical" size="large" style={{ width: '100%' }}>
                  <div>
                    <Title level={4}><BookOutlined /> Preview</Title>
                    <ReactMarkdown>{session.content}</ReactMarkdown>
                  </div>
                  
                  {session.quiz && session.quiz.length > 0 && (
                    <div>
                      <Title level={4}><FormOutlined /> Quiz</Title>
                      <Space>
                        {session.quiz.map((q, index) => (
                          <Button key={index} onClick={() => navigateToQuizEdit(q.id)}>
                            Quiz {index + 1}
                          </Button>
                        ))}
                      </Space>
                    </div>
                  )}
                  
                  {session.documents && session.documents.length > 0 && (
                    <div>
                      <Title level={4}><FileTextOutlined /> Documents</Title>
                      <Space>
                        {session.documents.map((doc, index) => (
                          <Button key={index} onClick={() => navigateToDocumentEdit(doc.url)}>
                            {doc.name}
                          </Button>
                        ))}
                      </Space>
                    </div>
                  )}
                </Space>
              )}
            </Card>
          </TabPane>
        ))}
      </Tabs>
    </div>
  );
}