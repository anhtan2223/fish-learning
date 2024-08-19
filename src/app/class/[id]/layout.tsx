import LayoutWithSidebar from "@ui/layout/layout-with-sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
    return <div className="transition-all">
        <LayoutWithSidebar title="Lớp Học">
            {children}
        </LayoutWithSidebar>
    </div>
}