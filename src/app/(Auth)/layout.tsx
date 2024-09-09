import Header from "@/ui/common/header";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="bg-gray dark:bg-gray-dark transition-all min-h-screen">
            <div className="bg-white dark:bg-dark">
                <Header></Header>
            </div>
            <div className="w-full  padding h-full">
                {children}
            </div>
        </div>
    );
}