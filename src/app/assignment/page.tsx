'use client'
import { useEffect } from 'react';
import { Result, Button } from 'antd';
import { useRouter } from 'next/navigation';

export default function AssignmentNotFound() {
  const router = useRouter();

  useEffect(() => {
    // You can add any side effects here if needed
  }, []);

  const handleBackHome = () => {
    router.back();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Result
        status="404"
        title="404"
        subTitle="Xin lỗi, trang bạn đang tìm kiếm không tồn tại."
        extra={
          <Button type="primary" onClick={handleBackHome}>
            Quay về Trang chủ
          </Button>
        }
      />
    </div>
  );
}
