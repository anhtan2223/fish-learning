import ListCourse from "@/ui/course/list-course";
import MyPagination from "@/ui/common/pagination";
import SearchCourseBar from "@/ui/course/search-bar";

export default function CoursePage() {
    return (
        <div>
            <div className='mb-5 text-lg font-bold flex items-center'>
                <p>Lớp Học</p>
                <div className="flex flex-grow justify-end">
                    <SearchCourseBar></SearchCourseBar>
                </div>
            </div>
            <ListCourse></ListCourse>
            <div className="flex w-full justify-end">
                <MyPagination className="" total={100}></MyPagination>
            </div>

        </div>
    );
}