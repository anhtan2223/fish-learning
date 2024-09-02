'use client'
import React, { useState, useEffect } from "react";
import { Typography, Space, Divider, Image, Tag, Button, Input, Form, List, Avatar, message, Skeleton } from "antd";
import { CalendarOutlined, UserOutlined, ShareAltOutlined, LikeOutlined, CommentOutlined, EyeOutlined } from "@ant-design/icons";

const { Title, Paragraph, Text } = Typography;
const { TextArea } = Input;

interface Comment {
    id: string;
    author: string;
    content: string;
    createdAt: Date;
}

interface BlogPost {
    id: string;
    title: string;
    datePublish: string;
    author: string;
    tags: string[];
    image: string;
    content: {
        heading: string;
        text: string;
    }[];
    views: number;
}

const contentPost: BlogPost = {
    id: "1",
    title: "The Future of Artificial Intelligence in Education",
    datePublish: "May 15, 2023",
    author: "Dr. Jane Smith",
    tags: ["AI", "Education", "Technology"],
    image: "/example.png",
    content: [
        {
            heading: "Introduction to AI in Education",
            text: "Artificial Intelligence is revolutionizing various sectors, and education is no exception. This post explores how AI is shaping the future of learning and teaching."
        },
        {
            heading: "Personalized Learning Experiences",
            text: "AI-powered systems can analyze student performance and adapt content to individual learning styles, pacing, and needs. This section discusses the benefits and challenges of personalized learning."
        },
        {
            heading: "AI-Assisted Teaching",
            text: "From grading assignments to providing instant feedback, AI is becoming an invaluable tool for educators. We'll examine how AI can support teachers and enhance their effectiveness in the classroom."
        },
        {
            heading: "Ethical Considerations",
            text: "As we integrate AI into education, it's crucial to address privacy concerns, data security, and potential biases. This section explores the ethical implications of AI in educational settings."
        }
    ],
    views: 0
}

export default function BlogPostPage() {
    const [post, setPost] = useState<BlogPost | null>(null);
    const [likes, setLikes] = useState(0);
    const [comments, setComments] = useState<Comment[]>([]);
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate fetching post data
        const fetchPost = async () => {
            setLoading(true);
            await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
            setPost({ ...contentPost, views: contentPost.views + 1 });
            setLoading(false);
        };
        fetchPost();
    }, []);

    const handleLike = () => {
        setLikes(prevLikes => prevLikes + 1);
        message.success('Thank you for liking this post!');
    };

    const handleComment = (values: { comment: string }) => {
        const newComment: Comment = {
            id: Date.now().toString(),
            author: "Anonymous",
            content: values.comment,
            createdAt: new Date()
        };
        setComments(prevComments => [newComment, ...prevComments]);
        form.resetFields();
        message.success('Comment posted successfully!');
    };

    const handleShare = () => {
        // Implement share functionality
        message.info('Sharing functionality to be implemented');
    };

    if (loading) {
        return <Skeleton active />;
    }

    if (!post) {
        return <div>Post not found</div>;
    }

    return (
        <div className="max-w-3xl mx-auto p-6">
            <Title level={1} className="text-center mb-8">
                {post.title}
            </Title>
            
            <Space className="mb-4 flex justify-between items-center">
                <Space>
                    <CalendarOutlined />
                    <Text type="secondary">Published on: </Text>
                    <Text strong>{post.datePublish}</Text>
                    <Divider type="vertical" />
                    <UserOutlined />
                    <Text type="secondary">Author: </Text>
                    <Text strong>{post.author}</Text>
                    <Divider type="vertical" />
                </Space>
                <Space>
                    {post.tags.map((tag, index) => (
                        <Tag key={index} color="blue">{tag}</Tag>
                    ))}
                </Space>
            </Space>
            
            <Image
                src={post.image}
                alt="AI in Education"
                className="w-full rounded-lg mb-6"
                fallback="data:image/png;base64,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"
            />
            
            <Paragraph className="text-lg mb-6">
                {post.content[0].text}
            </Paragraph>
            
            {post.content.slice(1).map((section, index) => (
                <React.Fragment key={index}>
                    <Title level={2} className="mt-8 mb-4">{section.heading}</Title>
                    <Paragraph>{section.text}</Paragraph>
                </React.Fragment>
            ))}
            
            <Title level={2} className="mt-8 mb-4">Conclusion</Title>
            <Paragraph>
                As AI continues to evolve, its impact on education will undoubtedly grow. By embracing these technologies responsibly, we can create more effective, engaging, and personalized learning experiences for students worldwide.
            </Paragraph>
            
            <Divider />
            
            <Space className="mt-6 w-full justify-between">
                <Space>
                    <Button icon={<LikeOutlined />} onClick={handleLike}>Like ({likes})</Button>
                    <Button icon={<CommentOutlined />}>Comment ({comments.length})</Button>
                </Space>
                <Button icon={<ShareAltOutlined />} onClick={handleShare}>Share</Button>
            </Space>

            <Form form={form} onFinish={handleComment} className="mt-6">
                <Form.Item name="comment" rules={[{ required: true, message: 'Please enter your comment!' }]}>
                    <TextArea rows={4} placeholder="Write a comment..." />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">Submit Comment</Button>
                </Form.Item>
            </Form>

            <List
                className="mt-6"
                header={`${comments.length} ${comments.length === 1 ? 'comment' : 'comments'}`}
                itemLayout="horizontal"
                dataSource={comments}
                renderItem={comment => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={<Avatar icon={<UserOutlined />} />}
                            title={comment.author}
                            description={
                                <>
                                    <Text>{comment.content}</Text>
                                    <br />
                                    <Text type="secondary">{comment.createdAt.toLocaleString()}</Text>
                                </>
                            }
                        />
                    </List.Item>
                )}
            />
        </div>
    );
}
