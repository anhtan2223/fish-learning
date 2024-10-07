'use client'
import React from 'react';
import SearchClassBar from "@/ui/class/search-bar";
import MyPagination from "@/ui/common/pagination";
import ListClass from "@/ui/class/list-class";
import { Typography } from "antd";
import { mockClass } from '@/lib/mock/class.mock';

const { Title, Paragraph } = Typography;

export default function ClassPage() {
  return (
    <div className="p-6">
      <Title level={2}>Lớp Học</Title>
      <SearchClassBar></SearchClassBar>
      <div className="mt-5">
        <ListClass listClass={mockClass} ></ListClass>
      </div>
      <div className="mt-5 flex justify-end">
        <MyPagination total={100}></MyPagination>
      </div>
    </div>
  );
}
