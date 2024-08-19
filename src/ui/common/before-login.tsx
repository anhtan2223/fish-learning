'use client'    
import { Button } from "antd";
import SwitchMode from "@/ui/common/switch-mode";
import { isLoginAtom } from "@storage";
import { useSetAtom } from "jotai";
import Link from "next/link";

export default function BeforeLogin() {
    const setLogin = useSetAtom(isLoginAtom)
    const login = () => {
        setLogin(value => !value)
    }

    return <>
        <div className='flex'>
            <Link href="/teacher">
                <Button type="text" className='h-fit ml-5 text-black dark:text-white'>Đăng Ký</Button>
            </Link>
            <Button className='h-fit ml-5 text-black dark:text-white' onClick={login}>Đăng Nhập</Button>
            <SwitchMode></SwitchMode>
        </div>
    </>
}

