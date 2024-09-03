import SortComponent from "@ui/common/sort";
import MySearch from "@ui/common/search";
import React from "react";

export default function SearchClassBar() {
    const sortOtp = [
        // { label: 'Mặc định', value: 'default' },
        { label: 'Niên Khoá', value: 'default' },
        { label: 'Giảng Viên', value: 'teacher' },
    ]
    return (
        <div className='flex h-[32px]'>
            <MySearch
                placeholder="Tìm Kiếm Lớp Học"
                className='w-3/12 mr-5'
            />
            <div className="flex mr-3 justify-end items-center">
                <div className="flex items-center">
                    <SortComponent options={sortOtp} />
                </div>
            </div>
        </div>
    )
}
