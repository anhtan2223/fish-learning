import { Button } from "antd";
import Link from 'next/link'
import SortComponent from "@ui/common/sort";
import MySearch from "@ui/common/search";
import React from "react";

export default function SearchClassBar({ isAdd = false }: {
    isAdd?: boolean
}) {
    const sortOtp = [
        // { label: 'Mặc định', value: 'default' },
        { label: 'Niên Khoá', value: 'default' },
        { label: 'Giảng Viên', value: 'teacher' },
    ]
    return (
        <div className='flex h-[32px]'>
            <div className="flex mr-3 justify-end items-center w-4/12">
                <div className="flex items-center">
                    <SortComponent options={sortOtp} />
                </div>
            </div>
            <MySearch
                placeholder="Tìm Kiếm Lớp Học"
                className='w-8/12'
            />
            {
                isAdd && <Link href='/baidang/vieclam'>
                    <Button className="mx-3" type="primary">Tạo Mới</Button>
                </Link>
            }

        </div>
    )
}
