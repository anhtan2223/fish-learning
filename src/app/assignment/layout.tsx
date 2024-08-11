import HeaderAssignment from "@/ui/common/header-assignment";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="bg-gray dark:bg-gray-dark min-h-screen">
            <div className="bg-white dark:bg-dark padding">
                <HeaderAssignment></HeaderAssignment>
            </div>
            <div className="padding m-4 rounded-xl h-full bg-white dark:bg-dark">
                {children}
            </div>
        </div>
    );
}