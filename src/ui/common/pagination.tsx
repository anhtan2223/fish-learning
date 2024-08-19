'use client';

import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { Pagination } from 'antd';
import { pageSizeOptions } from '@/config/pagination.config';

export default function MyPagination(
  { 
    className ,
    total 
  }:
  { className? : string
    total: number 
  }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1
  const pageSize = Number(searchParams.get('size')) || pageSizeOptions[0]


  const createPageURL = (pageNumber: number, pageSize: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    params.set('size', pageSize.toString());
    return `${pathname}?${params.toString()}`;
  };

  if(currentPage*pageSize > total){
    const url = createPageURL(Math.floor(total/pageSize),pageSize)
    router.replace(url)
  }

  const handlePageChange = (page: number, pageSize: number) => {
    const url = createPageURL(page, pageSize);
    router.replace(url)
  };

  return (
    <div className={className}>
      <Pagination
        current={currentPage}
        total={total}
        showQuickJumper
        size='small' 
        showLessItems
        onChange={handlePageChange}
        showSizeChanger={true}
        pageSize={pageSize}
        pageSizeOptions={pageSizeOptions}
      />
    </div>
  );
}
