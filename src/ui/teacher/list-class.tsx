'use client'
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import ClassElement from '@/ui/class/class-element';
import { pageSizeOptions } from '@config/pagination.config';
import { ClassProps } from '@/lib/interface/class.interface';

export default function ListClass({ listClass }: { listClass: ClassProps[] }) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get('page')) || 1;
    const pageSize = Number(searchParams.get('size')) || pageSizeOptions[0];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {listClass.slice((currentPage - 1) * pageSize, currentPage * pageSize).map((classData, index) => (
                <div 
                    key={index} 
                    onClick={() => router.push(`/teacher/class/${classData.id}`)} 
                    className='flex justify-center cursor-pointer transform hover:scale-105 transition-transform duration-300 ease-in-out'
                >
                    <ClassElement classInfo={classData} />
                </div>
            ))}
        </div>
    );
}