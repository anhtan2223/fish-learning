'use client'
import { Avatar, Popover } from 'antd';
import { UserOutlined, FormOutlined, LogoutOutlined } from '@ant-design/icons';
import Link from 'next/link';
import SwitchMode from '@/ui/common/switch-mode';
import { useSetAtom } from 'jotai';
import { isLoginAtom } from '@storage';

const user = {
    name: "User Name",
    role: "Role"
}

export default function AfterLogin() {
    const setLogin = useSetAtom(isLoginAtom)
    const logout = () => {
        setLogin(value => !value)
    }
    function ChangePage() {
        return <div className=''>
            <Link href='/baidang' className='flex gap-3 py-1 hover:text-primary cursor-pointer transition-colors'>
                <FormOutlined style={{ fontSize: '20px' }} />
                Bài Đăng Của Tôi
            </Link>
            <Link href='/taikhoan' className='flex gap-3 py-1  hover:text-primary cursor-pointer transition-colors'>
                <UserOutlined style={{ fontSize: '20px' }} />
                Cài Đặt Tài Khoản
            </Link>
            <div>
                <hr />
            </div>
            <div className='flex gap-3 py-1 hover:text-primary  cursor-pointer' onClick={logout}>
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
