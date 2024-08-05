'use client'
import { MoonOutlined, SunOutlined } from '@ant-design/icons';
import { Button } from "antd";
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function SwitchMode() {
    const { resolvedTheme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)
    const toggleDarkMode = () => {
        if (resolvedTheme == 'dark')
            setTheme('light')
        else setTheme('dark')
    }
    useEffect(() => {
        setMounted(true)
    }, [])
    if (!mounted) {
        return null
    }
    return (
        <div className='w-fit dark:text-black h-fit flex items-center ml-5'>
            <Button
                shape="circle"
                icon={resolvedTheme == 'light' ? <MoonOutlined className='dark:bg-black' /> : <SunOutlined />}
                onClick={toggleDarkMode}
            />
        </div>
    );
}