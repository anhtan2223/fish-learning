'use client'
import Tiptap from "@/ui/common/rich-text-editor";
import { Button, Select } from "antd";
import Link from "next/link";
import { Input } from "antd";

const { TextArea } = Input;


export default function AddCourse() {
    return (
        <div>
            <div className="flex flex-col w-full gap-5">
                <div className="flex text-xl font-bold justify-start ">Thêm Mới Lớp Học</div>
                <div className="flex w-full">
                    <div className="w-[120px] font-semibold flex justify-start" >
                        Giảng Viên
                    </div>
                    <div className="">
                        Nguyễn Văn A
                    </div>
                </div>
                <div className="flex w-full">
                    <div className="w-[120px] font-semibold flex justify-start" >
                        Niên Khoá
                    </div>
                    <div className="">
                        <Select
                            // popupMatchSelectWidth={true}
                            defaultValue="jack"
                            options={[
                                { value: 'jack', label: 'HK1 Năm 2024-2025' },
                                { value: 'lucy', label: 'HK2 Năm 2024-2025' },
                                { value: 'Yiminghe', label: 'HK3 Năm 2024-2025' },
                            ]}
                        />
                    </div>
                </div>

                <div className="flex w-full">
                    <div className="w-[120px] font-semibold flex justify-start" >
                        Tên Lớp
                    </div>
                    <div className="">
                        <Input></Input>
                    </div>
                </div>

                <div className="flex w-full">
                    <div className="w-[120px] font-semibold flex justify-start" >
                        Ghi Chú
                    </div>
                    <div className="w-full">
                    <TextArea
                        placeholder="Nhập ghi chú cho lớp học"
                        autoSize={{ minRows: 3, maxRows: 6 }}
                        className="w-full mx-3"
                    />
                    </div>
                </div>

                <div className="flex w-full justify-center gap-5">
                    <Link href="/teacher/course/id">
                        <Button ghost type="primary">Tạo Mới</Button>
                    </Link>
                    <Link href="/teacher">
                        <Button danger ghost>Quay Lại</Button>
                    </Link>
                </div>
            </div>

        </div>
    );
}