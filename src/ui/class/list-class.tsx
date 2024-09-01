'use client'
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import ClassElement from './class-element';
import { pageSizeOptions } from '@config/pagination.config';
import React from 'react';

export default function ListClass() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get('page')) || 1
    const pageSize = Number(searchParams.get('size')) || pageSizeOptions[0]

    return (
        <div className="flex justify-around flex-wrap">
            {Array.from({ length: pageSize }).map((_, index) => (
                <div key={index} onClick={ () => router.push("/class") } className='pointer transform hover:scale-110 transition-transform'>
                    <ClassElement></ClassElement>
                </div>
            ))}
        </div>
    );
}