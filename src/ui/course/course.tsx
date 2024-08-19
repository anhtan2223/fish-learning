import Image from 'next/image';
import { Avatar } from 'antd';

export default function Course() {
    
    return (
        <div className='w-[250px] min-h-fit border bg-white dark:bg-dark rounded-lg p-3 mb-4'>
            <div className='text-lg font-bold w-full flex justify-center'>Máy Học Ứng Dụng</div>
            <div className='flex items-center'>
                <Avatar size={58} className='bg-inherit border-2'>
                    <Image src="/logo.light.png" alt='Avatar' width={100} height={100} ></Image>
                </Avatar>
                <div>Nguyễn Văn A</div>
            </div>
            <div className='text-xs italic font-medium' >Học Kỳ 2 Năm 2023-2024 </div>
            <div className='text-xs italic font-medium truncate'>Lớp Học Máy Học Ứng Dụng Nhóm 3</div>
        </div>
    );
}