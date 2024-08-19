
import MySearch from "@/ui/common/search";

export default function TeacherSearchBar() {
    return (
        <div className='flex h-[32px]'>
            <MySearch
                placeholder="Tìm Kiếm Lớp Học"
                className='w-full'
            />
        </div>
    )
}
