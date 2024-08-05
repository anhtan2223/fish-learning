import Header from "@/ui/common/header";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="bg-gray dark:bg-gray-dark min-h-screen">
            <div className="bg-white dark:bg-black">
                <Header></Header>
            </div>
            <div className="w-3/4 mx-auto h-full">
                {children}
            </div>
            <div className="bg-white">
                {/* Footer */}
            </div>
        </div>
    );
}