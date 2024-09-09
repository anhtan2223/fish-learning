'use client'    
import { Button } from "antd";
import SwitchMode from "@/ui/common/switch-mode";
import Link from "next/link";

export default function BeforeLogin() {

    return <>
        <div className='flex'>
            <Link href="/register">
                <Button className='h-fit ml-5 '>Đăng Ký</Button>
            </Link>
            <Link href="/login">
                <Button className='h-fit ml-5 '>Đăng Nhập</Button>
            </Link>
            <SwitchMode></SwitchMode>
        </div>
    </>
}

