import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "./sidebar/page";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      {/* Sidebar */}
      <aside>
        <AppSidebar />
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4">
        {children} {/* Render child routes dynamically */}
      </main>
    </div>
  );
}
