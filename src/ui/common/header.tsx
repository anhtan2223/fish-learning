'use client';
import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import BeforeLogin from '@/ui/common/before-login';
import AfterLogin from '@/ui/common/after-login';
import { isLoginAtom } from '@/lib/storage';
import { useAtomValue } from 'jotai';
import { useTheme } from 'next-themes';

const info = [
    { name: "Bài Học", href: "/course" },
    { name: "Tài Liệu", href: "/document" },
    { name: "Blog", href: "/blog" },
    { name: "Test", href: "/test" },
]

export default function Header() {
    const path = usePathname();
    const isLogin = useAtomValue<boolean>(isLoginAtom)
    const { resolvedTheme } = useTheme()

    return (
        <>
            <div className='h-fit w-full flex mx-auto px-[12px] py-2'>
                <div className='w-fit flex items-center'>
                    <Link href={'/'}>
                        <Image src={resolvedTheme == 'dark' ? '/logo.dark.png' : '/logo.light.png'} 
                            width={60} height={60} 
                            className='w-auto h-full ' alt='Logo'></Image>
                    </Link>
                </div>

                <div className='flex items-center flex-grow justify-end'>
                    {!isLogin ? <BeforeLogin></BeforeLogin> : <AfterLogin></AfterLogin>}
                </div>
            </div>

            <div className='w-full z-40 lg:relative h-fit bg-primary dark:bg-primary-dark'>
                <div className='flex h-full w-full justify-center lg:justify-start lg:w-full  mx-auto text-white'>
                    {info.map(i => {
                        return <Link href={i.href} key={i.name} className={
                            clsx(
                                'w-fit h-full py-2 px-4 items-center justify-center hover:bg-secondary dark:hover:bg-secondary-dark',
                                (path == i.href) && 'bg-secondary dark:bg-secondary-dark'
                            )
                        }>
                            {i.name}
                        </Link>
                    })}
                </div>
            </div>
        </>
    );
}
