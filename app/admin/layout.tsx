import type { Metadata } from "next";
import AdminHeader from "../../components/admin/AdminHeader";

export const metadata: Metadata = {
  title: { default: "Protocol Review Admin", template: "%s | Protocol Review Admin" },
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <AdminHeader />
      {children}
    </div>
  );
}
