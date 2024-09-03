'use client'
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import ClassElement from './class-element';
import { pageSizeOptions } from '@config/pagination.config';

export default function ListClass() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get('page')) || 1
    const pageSize = Number(searchParams.get('size')) || pageSizeOptions[0]

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 place-content-center">
            {Array.from({ length: pageSize }).map((_, index) => (
                <div 
                    key={index} 
                    onClick={() => router.push(`/class/${index}`)} 
                    className='flex justify-center cursor-pointer transform hover:scale-105 transition-transform duration-300 ease-in-out'
                >
                    <ClassElement />
                </div>
            ))}
        </div>
    );
}