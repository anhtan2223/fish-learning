import LayoutWithSidebar from "@ui/layout/layout-with-sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
    return <div className="transition-all">
        <LayoutWithSidebar title="Đăng Ký Lớp Học">
            {children}
        </LayoutWithSidebar>
    </div>
}