import TeacherListCourse from "@/ui/teacher/list-class";
import MyPagination from "@/ui/common/pagination";
import TeacherSearchBar from "@/ui/teacher/search-bar";
import { myClassMock } from "@/lib/mock/class.mock";

export default function MyCoursePage() {
  return (
    <div>
      <div className="mb-5 text-lg font-bold flex items-center">
        <p>Lớp Học Của Tôi</p>
        <div className="flex flex-grow justify-end">
          <TeacherSearchBar></TeacherSearchBar>
        </div>
      </div>
      <TeacherListCourse listClass={myClassMock}></TeacherListCourse>
      <div className="flex w-full justify-end">
        <MyPagination total={myClassMock.length}></MyPagination>
      </div>
    </div>
  );
}
