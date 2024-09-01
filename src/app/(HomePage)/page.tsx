import SearchClassBar from "@/ui/class/search-bar";
import MyPagination from "@/ui/common/pagination";
import ListClass from "@/ui/class/list-class";

export default function classPage() {
    return (
        <div>
            <div className='mb-5 text-lg font-bold flex items-center'>
                <p>Lớp Học</p>
                <div className="flex flex-grow justify-end">
                    <SearchClassBar></SearchClassBar>
                </div>
            </div>
            <ListClass></ListClass>
            <div className="flex w-full justify-end">
                <MyPagination className="" total={100}></MyPagination>
            </div>

        </div>
    );
}