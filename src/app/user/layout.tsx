import MainLayout from "@/app/layout/userLayout/MainLayout";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <MainLayout>{children}</MainLayout>
    </div>
  );
}
