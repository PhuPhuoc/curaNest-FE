import AdminLayout from "@/app/layout/adminLayout/AdminLayout";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <AdminLayout>{children}</AdminLayout>
    </div>
  );
}
