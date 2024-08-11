import LayoutWithSidebar from "@ui/layout/layout-with-sidebar";



export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <LayoutWithSidebar>
            {children}
        </LayoutWithSidebar>
    );
}