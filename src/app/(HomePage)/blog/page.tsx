'use client'
import React, { useState, useEffect } from "react";
import { Typography, Space, List, Card, Tag, Button, Input, Select, Pagination, Spin, Tooltip } from "antd";
import { CalendarOutlined, UserOutlined, EyeOutlined, SearchOutlined, ArrowRightOutlined, FireOutlined } from "@ant-design/icons";
import Link from 'next/link';

const { Title, Paragraph } = Typography;
const { Search } = Input;
const { Option } = Select;

interface BlogPost {
    id: string;
    title: string;
    datePublish: string;
    author: string;
    tags: string[];
    image: string;
    views: number;
    excerpt: string;
}

const dummyPosts: BlogPost[] = [
    {
        id: "1",
        title: "The Future of Artificial Intelligence in Education",
        datePublish: "May 15, 2023",
        author: "Dr. Jane Smith",
        tags: ["AI", "Education", "Technology"],
        image: "/example.png",
        views: 1500,
        excerpt: "Explore how AI is revolutionizing the education sector, from personalized learning to intelligent tutoring systems."
    },
    {
        id: "2",
        title: "Blockchain Technology: Beyond Cryptocurrency",
        datePublish: "June 2, 2023",
        author: "John Doe",
        tags: ["Blockchain", "Technology", "Innovation"],
        image: "/example2.png",
        views: 1200,
        excerpt: "Discover the potential applications of blockchain technology beyond cryptocurrencies, including supply chain management and digital identity verification."
    },
    {
        id: "3",
        title: "The Rise of Quantum Computing",
        datePublish: "July 10, 2023",
        author: "Dr. Alice Johnson",
        tags: ["Quantum Computing", "Technology", "Science"],
        image: "/example3.png",
        views: 980,
        excerpt: "Learn about the principles of quantum computing and its potential to revolutionize fields such as cryptography, drug discovery, and financial modeling."
    },
];

export default function BlogPage() {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterTag, setFilterTag] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(6);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate API call
        setTimeout(() => {
            setPosts(dummyPosts);
            setFilteredPosts(dummyPosts);
            setLoading(false);
        }, 1000);
    }, []);

    const handleSearch = (value: string) => {
        setSearchTerm(value);
        filterPosts(value, filterTag);
        setCurrentPage(1);
    };

    const handleTagFilter = (value: string) => {
        setFilterTag(value);
        filterPosts(searchTerm, value);
        setCurrentPage(1);
    };

    const filterPosts = (search: string, tag: string) => {
        let filtered = posts.filter((post) =>
            post.title.toLowerCase().includes(search.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(search.toLowerCase())
        );

        if (tag !== "all") {
            filtered = filtered.filter((post) => post.tags.includes(tag));
        }

        setFilteredPosts(filtered);
    };

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

    const onPageChange = (page: number) => {
        setCurrentPage(page);
    };

    const allTags = Array.from(new Set(posts.flatMap(post => post.tags)));

    const getViewsColor = (views: number) => {
        if (views >= 1000) return '#ff4d4f';
        if (views >= 500) return '#faad14';
        return '#52c41a';
    };

    return (
        <div className="p-6">
            <Title level={2}>Bài Viết</Title>
            <Space className="mb-4" direction="vertical" style={{ width: '100%' }}>
                <Space>
                    <Search
                        placeholder="Search posts"
                        onSearch={handleSearch}
                        style={{ width: 300 }}
                        prefix={<SearchOutlined />}
                        allowClear
                    />
                    <Select
                        defaultValue="all"
                        style={{ width: 150 }}
                        onChange={handleTagFilter}
                    >
                        <Option value="all">All Tags</Option>
                        {allTags.map(tag => (
                            <Option key={tag} value={tag}>{tag}</Option>
                        ))}
                    </Select>
                </Space>
            </Space>
            {loading ? (
                <div className="text-center">
                    <Spin size="large" />
                </div>
            ) : (
                <>
                    <List
                        grid={{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 3, xl: 3, xxl: 3 }}
                        dataSource={currentPosts}
                        renderItem={(post) => (
                            <List.Item>
                                <Card
                                    hoverable
                                    cover={<img alt={post.title} src={post.image} style={{ height: 200, objectFit: 'cover' }} />}
                                    actions={[
                                        <Button 
                                            key="read" 
                                            type="primary" 
                                            icon={<ArrowRightOutlined />}
                                            style={{ 
                                                background: 'linear-gradient(to right, #1890ff, #096dd9)',
                                                borderColor: '#1890ff',
                                                boxShadow: '0 2px 0 rgba(0, 0, 0, 0.045)'
                                            }}
                                        >
                                            <Link href={`/blog/${post.id}`} style={{ color: 'white' }}>Read More</Link>
                                        </Button>
                                    ]}
                                >
                                    <Card.Meta
                                        title={<Link href={`/blog/${post.id}`}>{post.title}</Link>}
                                        description={
                                            <Space direction="vertical">
                                                <Paragraph ellipsis={{ rows: 2 }}>{post.excerpt}</Paragraph>
                                                <Space>
                                                    <CalendarOutlined /> {post.datePublish}
                                                    <UserOutlined /> {post.author}
                                                    <Tooltip title={`${post.views} views`}>
                                                        <span style={{ color: getViewsColor(post.views) }}>
                                                            {post.views >= 1000 ? <FireOutlined /> : <EyeOutlined />} {post.views}
                                                        </span>
                                                    </Tooltip>
                                                </Space>
                                                <Space>
                                                    {post.tags.map((tag) => (
                                                        <Tag key={tag} color="blue">{tag}</Tag>
                                                    ))}
                                                </Space>
                                            </Space>
                                        }
                                    />
                                </Card>
                            </List.Item>
                        )}
                    />
                    <Pagination
                        current={currentPage}
                        total={filteredPosts.length}
                        pageSize={postsPerPage}
                        onChange={onPageChange}
                        showSizeChanger={false}
                        className="mt-4 text-center"
                    />
                </>
            )}
        </div>
    );
}
