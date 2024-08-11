import Header from "@/ui/common/header";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="bg-gray dark:bg-dark transition-all min-h-screen">
            <Header></Header>
            <div className="w-full padding h-full">
                {children}
            </div>
        </div>
    );
}