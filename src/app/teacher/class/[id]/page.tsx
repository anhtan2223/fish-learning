'use client'
import { useState, useEffect } from 'react';
import { Typography, Tabs, Card, Button, Space, Form, Input, Modal, Switch, message } from 'antd';
import { BookOutlined, FormOutlined, FileTextOutlined, PlusOutlined, EditOutlined, EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import ReactMarkdown from 'react-markdown';
import RichTextEditor from '@/ui/common/rich-text-editor';
import { useRouter } from 'next/navigation';
import { title } from 'process';
import { init } from 'next/dist/compiled/webpack/webpack';


const { Title } = Typography;
const { TabPane } = Tabs;
const { TextArea } = Input;

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

export default function EditClassPage() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [activeTab, setActiveTab] = useState('1');
  const [title, setTitle] = useState('');
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
        content: '<h1>Giới thiệu về KNN</h1><p>KNN (K-Nearest Neighbors) là một thuật toán học máy được sử dụng trong phân loại và hồi quy. Nó dựa trên nguyên tắc rằng các điểm dữ liệu gần nhau có xu hướng thuộc cùng một lớp.</p><h2>Nguyên lý hoạt động</h2><p>KNN hoạt động bằng cách:</p><ul><li>Tính khoảng cách từ điểm cần dự đoán đến tất cả các điểm trong tập huấn luyện</li><li>Chọn K điểm gần nhất</li><li>Dự đoán dựa trên đa số trong K điểm đó</li></ul>',
        quiz: [
          { id: 1 ,  name: 'Bài tập 1'},
          { id: 2 ,  name: 'Kiểm tra 15 phút'},
          { id: 3 ,  name: 'Kiểm tra Cuối Kỳ'},
        ],
        documents: [
          { name: 'KNN Overview.pdf', url: '/documents/knn_overview.pdf' },
          { name: 'KNN in Practice.pdf', url: '/documents/knn_in_practice.pdf' },
          { name: 'KNN vs Other Algorithms.pdf', url: '/documents/knn_comparison.pdf' },
        ],
      },
      {
        key: '2',
        title: 'Giới thiệu về Naive Bayes',
        content: '<h1>Giới thiệu về Naive Bayes</h1><p>Naive Bayes là một thuật toán phân loại dựa trên định lý Bayes với giả định "naive" về sự độc lập giữa các đặc trưng.</p><h2>Ưu điểm</h2><ul><li>Đơn giản và hiệu quả</li><li>Hoạt động tốt với dữ liệu có chiều cao</li><li>Phù hợp cho các bài toán phân loại văn bản</li></ul>',
        quiz: [
          { id: 1 , name: 'Bài tập 2'},
          { id: 2 , name: 'Kiểm tra 15 phút'},
          { id: 3 , name: 'Kiểm tra Cuối Kỳ'},
        ],
        documents: [
          { name: 'Naive Bayes Explained.pdf', url: '/documents/naive_bayes_explained.pdf' },
          { name: 'Probabilistic Models in ML.pdf', url: '/documents/probabilistic_models.pdf' },
        ],
      },
      {
        key: '3',
        title: 'Cây quyết định và Random Forest',
        content: '<h1>Cây quyết định và Random Forest</h1><p>Cây quyết định là một mô hình dự đoán có cấu trúc cây, trong khi Random Forest là một tập hợp các cây quyết định.</p><h2>So sánh</h2><table><tr><th>Cây quyết định</th><th>Random Forest</th></tr><tr><td>Dễ hiểu và diễn giải</td><td>Độ chính xác cao hơn</td></tr><tr><td>Có thể overfitting</td><td>Giảm thiểu overfitting</td></tr></table>',
        quiz: [
          { id: 1 , name: 'Bài tập 3'},
          { id: 2 , name: 'Kiểm tra 15 phút'},
          { id: 3 , name: 'Kiểm tra Cuối Kỳ'},
        ],
        documents: [
          { name: 'Decision Trees Basics.pdf', url: '/documents/decision_trees.pdf' },
          { name: 'Random Forest Algorithm.pdf', url: '/documents/random_forest.pdf' },
          { name: 'Ensemble Methods in ML.pdf', url: '/documents/ensemble_methods.pdf' },
        ],
      },
      {
        key: '4',
        title: 'Giới thiệu về SVM',
        content: '<h1>Giới thiệu về SVM</h1><p>Support Vector Machine (SVM) là một thuật toán học có giám sát được sử dụng cho cả bài toán phân loại và hồi quy.</p><h2>Khái niệm chính</h2><ul><li>Hyperplane: Mặt phẳng phân chia các lớp</li><li>Margin: Khoảng cách từ hyperplane đến các điểm gần nhất</li><li>Support Vectors: Các điểm gần nhất với hyperplane</li></ul><p>SVM tìm kiếm hyperplane có margin lớn nhất để phân loại dữ liệu.</p>',
        quiz: [
          { id: 1 , name: 'Bài tập 4'},
          { id: 2 , name: 'Kiểm tra 15 phút'},
          { id: 3 , name: 'Kiểm tra Cuối Kỳ'},
        ],
        documents: [
          { name: 'SVM Fundamentals.pdf', url: '/documents/svm_fundamentals.pdf' },
          { name: 'Kernel Tricks in SVM.pdf', url: '/documents/kernel_tricks.pdf' },
        ],
      }
      // ... other sessions
    ]
  );
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
      <Title level={2} className="text-center mb-8">Máy Học Ứng Dụng</Title>
      
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
                  <Form.Item label="Tiêu Đề">
                  <Input defaultValue={session.title} onChange={(e) => session.title = e.target.value}/>
                  </Form.Item>
                  
                  
                  <Form.Item name="content" label="Nội Dung">
                    <RichTextEditor content={session.content} onChange={(content) => { session.content = content }} isEditor={!isEditing} />
                  </Form.Item>

                  <Form.Item label="Bài Tập">
                    <Space direction="vertical">
                      {session.quiz.map((q, index) => (
                        <Button key={index} onClick={() => navigateToQuizEdit(q.id)}>
                          {q.name}
                        </Button>
                      ))}
                      <Button type="dashed" icon={<PlusOutlined />} onClick={() => navigateToQuizEdit(session.quiz.length + 1)}>
                        Thêm Bài Tập Mới
                      </Button>
                    </Space>
                  </Form.Item>

                  <Form.Item label="Tài Liệu">
                    <Space direction="vertical">
                      {session.documents.map((doc, index) => (
                        <Button key={index} onClick={() => navigateToDocumentEdit(doc.url)}>
                          {doc.name}
                        </Button>
                      ))}
                      <Button type="dashed" icon={<PlusOutlined />} onClick={() => navigateToDocumentEdit('')}>
                        Thêm Tài Liệu Mới
                      </Button>
                    </Space>
                  </Form.Item>

                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      Lưu Thay Đổi
                    </Button>
                  </Form.Item>
                </Form>
              ) : (
                <Space direction="vertical" size="large" style={{ width: '100%' }}>
                  <div>
                    <Title level={4}><BookOutlined />{session.title}</Title>

                    {/* <ReactMarkdown>{session.content}</ReactMarkdown> */}
                    <RichTextEditor content={session.content} onChange={(content) => handleSave({ content })} isEditor={!isEditing} />

                  </div>
                  
                  {session.quiz && session.quiz.length > 0 && (
                    <div>
                      <Title level={4}><FormOutlined />Bài Tập</Title>
                      <Space>
                        {session.quiz.map((q, index) => (
                          <Button key={index} onClick={() => navigateToQuizEdit(q.id)}>
                            {q.name}
                          </Button>
                        ))}
                      </Space>
                    </div>
                  )}
                  
                  {session.documents && session.documents.length > 0 && (
                    <div>
                      <Title level={4}><FileTextOutlined />Tài Liệu</Title>
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