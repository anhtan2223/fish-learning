'use client'
import { Avatar, Popover } from 'antd';
import { UserOutlined, FormOutlined, LogoutOutlined, EditOutlined, BookOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import SwitchMode from '@/ui/common/switch-mode';
import { useSetAtom } from 'jotai';
import { isLoginAtom } from '@storage';

const user = {
    name: "User Name",
    role: "Role"
}

export default function AfterLogin() {
    const router = useRouter()
    const setLogin = useSetAtom(isLoginAtom)
    const logout = () => {
        setLogin(value => !value)
        router.push('/')
    }
    function ChangePage() {
        return <div className=''>
            <Link href='/account' className='flex gap-3 py-2  hover:text-primary cursor-pointer transition-colors'>
                <UserOutlined style={{ fontSize: '20px' }} />
                Tài Khoản Của Tôi
            </Link>

            <Link href='/account/class' className='flex gap-3 py-2 hover:text-primary cursor-pointer transition-colors'>
                <BookOutlined style={{ fontSize: '20px' }} />
                Lớp Học Của Tôi
            </Link>

            <Link href='/accout/blog' className='flex gap-3 py-2 hover:text-primary cursor-pointer transition-colors'>
                <FormOutlined style={{ fontSize: '20px' }} />
                Bài Đăng Của Tôi
            </Link>
            
            <div>
                <hr />
            </div>
            <div className='flex gap-3 py-2 hover:text-primary  cursor-pointer' onClick={logout}>
                <LogoutOutlined style={{ fontSize: '20px' }} />
                Đăng Xuất
            </div>
        </div>
    }

    return (
        <>
            <Popover content={<ChangePage />} trigger="hover">
                <div className='flex gap-2 items-center cursor-pointer ml-4'>
                    <div>
                        <div className='flex justify-end text-base font-medium'>{user.name}</div>
                        <div className='flex justify-end text-xs text-red-400 dark:text-blue-500 font-light'>{user.role}</div>
                    </div>
                    <Avatar icon={<UserOutlined />} />
                </div>
            </Popover>
            <SwitchMode></SwitchMode>
        </>
    )
}
