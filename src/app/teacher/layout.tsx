import TeacherLayout from "@/ui/layout/layout-teacher";

export default function Layout({children}: {children: React.ReactNode}) {
    return (
        <TeacherLayout>
            {children}
        </TeacherLayout>
    );
}