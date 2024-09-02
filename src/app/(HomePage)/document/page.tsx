'use client'
import React, { useState } from "react";
import { List, Typography, Space, Button, Input, Select, DatePicker, Modal, message } from "antd";
import { FileOutlined, DownloadOutlined, SearchOutlined, EyeOutlined, FilePdfOutlined, FileWordOutlined, FileExcelOutlined, FilePptOutlined } from "@ant-design/icons";

const { Title, Paragraph } = Typography;
const { Option } = Select;

interface Document {
  title: string;
  type: string;
  size: string;
  date: string;
  content: string;
}

const documents: Document[] = [
  {
    title: "Hướng dẫn sử dụng phần mềm",
    type: "PDF",
    size: "2.5 MB",
    date: "2023-05-20",
    content: "Đây là nội dung chi tiết của hướng dẫn sử dụng phần mềm...",
  },
  {
    title: "Báo cáo tài chính Q2 2023",
    type: "XLSX",
    size: "1.8 MB",
    date: "2023-07-15",
    content: "Đây là nội dung chi tiết của báo cáo tài chính Q2 2023...",
  },
  {
    title: "Quy trình làm việc mới",
    type: "DOCX",
    size: "500 KB",
    date: "2023-08-01",
    content: "Đây là nội dung chi tiết của quy trình làm việc mới...",
  },
  {
    title: "Bản trình bày dự án XYZ",
    type: "PPTX",
    size: "5.2 MB",
    date: "2023-08-10",
    content: "Đây là nội dung chi tiết của bản trình bày dự án XYZ...",
  },
];

export default function DocumentPage() {
  const [filteredDocuments, setFilteredDocuments] = useState<Document[]>(documents);
  const [searchText, setSearchText] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterDate, setFilterDate] = useState<any>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);

  const handleSearch = (value: string) => {
    setSearchText(value);
    filterDocuments(value, filterType, filterDate);
  };

  const handleTypeFilter = (value: string) => {
    setFilterType(value);
    filterDocuments(searchText, value, filterDate);
  };

  const handleDateFilter = (date: any) => {
    setFilterDate(date);
    filterDocuments(searchText, filterType, date);
  };

  const filterDocuments = (text: string, type: string, date: any) => {
    let filtered = documents.filter((doc) =>
      doc.title.toLowerCase().includes(text.toLowerCase())
    );

    if (type !== "all") {
      filtered = filtered.filter((doc) => doc.type === type);
    }

    if (date) {
      filtered = filtered.filter((doc) => doc.date === date.format("YYYY-MM-DD"));
    }

    setFilteredDocuments(filtered);
  };

  const showModal = (document: Document) => {
    setSelectedDocument(document);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleDownload = (document: Document) => {
    // Implement actual download logic here
    message.success(`Đang tải xuống: ${document.title}`);
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'PDF':
        return <FilePdfOutlined style={{ fontSize: '24px', color: '#ff4d4f' }} />;
      case 'DOCX':
        return <FileWordOutlined style={{ fontSize: '24px', color: '#1890ff' }} />;
      case 'XLSX':
        return <FileExcelOutlined style={{ fontSize: '24px', color: '#52c41a' }} />;
      case 'PPTX':
        return <FilePptOutlined style={{ fontSize: '24px', color: '#fa8c16' }} />;
      default:
        return <FileOutlined style={{ fontSize: '24px' }} />;
    }
  };

  return (
    <div className="p-6">
      <Title level={2}>Danh Sách Tài Liệu</Title>
      <Space className="mb-4" wrap>
        <Input
          placeholder="Tìm kiếm tài liệu"
          prefix={<SearchOutlined />}
          onChange={(e) => handleSearch(e.target.value)}
          style={{ width: 200 }}
        />
        <Select defaultValue="all" style={{ width: 120 }} onChange={handleTypeFilter}>
          <Option value="all">Tất cả</Option>
          <Option value="PDF">PDF</Option>
          <Option value="XLSX">XLSX</Option>
          <Option value="DOCX">DOCX</Option>
          <Option value="PPTX">PPTX</Option>
        </Select>
        <DatePicker onChange={handleDateFilter} />
      </Space>
      <List
        itemLayout="horizontal"
        dataSource={filteredDocuments}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Button key="view" icon={<EyeOutlined />} onClick={() => showModal(item)}>
                Xem
              </Button>,
              <Button key="download" icon={<DownloadOutlined />} onClick={() => handleDownload(item)}>
                Tải xuống
              </Button>,
            ]}
          >
            <List.Item.Meta
              avatar={getFileIcon(item.type)}
              title={item.title}
              description={
                <Space>
                  <span>{item.type}</span>
                  <span>{item.size}</span>
                  <span>{item.date}</span>
                </Space>
              }
            />
          </List.Item>
        )}
      />
      <Modal
        title={selectedDocument?.title}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Paragraph>{selectedDocument?.content}</Paragraph>
        <Space direction="vertical">
          <span>Loại: {selectedDocument?.type}</span>
          <span>Kích thước: {selectedDocument?.size}</span>
          <span>Ngày: {selectedDocument?.date}</span>
        </Space>
      </Modal>
    </div>
  );
}
