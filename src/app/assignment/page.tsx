'use client'
import MenuQuestion from "@/ui/common/menu-question";
import { Button, Divider } from "antd";
import CodeEdittor from "@ui/assignment/code-editor"

export default function Assignment() {
    return <>
        <MenuQuestion></MenuQuestion>
        <div>
            <Divider orientation="left">Câu 1</Divider>
            <div >
                Đọc file dữ liệu” “baitap1.csv”
            </div>
            <Divider orientation="left">Trả Lời</Divider>
            <div className="h-full">
                <CodeEdittor></CodeEdittor>
            </div>
            <div className="flex ">
                <Button className="mt-5">Câu Tiếp Theo</Button>
            </div>
        </div>
    </>
}