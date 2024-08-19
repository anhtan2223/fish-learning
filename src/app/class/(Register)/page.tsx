import { Divider, Collapse } from "antd";
import type { CollapseProps } from 'antd';
import Link from "next/link";
import { Button, Flex } from 'antd';



export default function Page() {
  return <>
    <div className="flex flex-col w-full gap-5">
      <div className="flex text-xl font-bold justify-start ">Máy Học Ứng Dụng</div>
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
          2023-2024
        </div>
      </div>

      <div className="flex w-full">
        <div className="w-[120px] font-semibold flex justify-start" >
          Học Kỳ
        </div>
        <div className="">
          1
        </div>
      </div>

      <div className="flex w-full">
        <div className="w-[120px] font-semibold flex justify-start" >
          Ghi Chú
        </div>
        <div className="">
          Máy Học Ứng Dụng nhóm 1
        </div>
      </div>
      <div className="flex w-full justify-center gap-5">
        <Link href="/class/id">
          <Button ghost type="primary">Ghi Danh Lớp Học</Button>
        </Link>
        <Link href="/course">
          <Button danger ghost>Quay Lại</Button>
        </Link>
      </div>
    </div>
  </>
}