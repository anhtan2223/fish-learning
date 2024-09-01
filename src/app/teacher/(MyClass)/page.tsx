import TeacherListCourse from "@/ui/teacher/list-course";
import MyPagination from "@/ui/common/pagination";
import TeacherSearchBar from "@/ui/teacher/search-bar";

export default function MyCoursePage() {
    return (
        <div>
            <div className='mb-5 text-lg font-bold flex items-center'>
                <p>Lớp Học Của Tôi</p>
                <div className="flex flex-grow justify-end">
                    <TeacherSearchBar></TeacherSearchBar>
                </div>
            </div>
            <TeacherListCourse></TeacherListCourse>
            <div className="flex w-full justify-end">
                <MyPagination className="" total={100}></MyPagination>
            </div>

        </div>
    );
}