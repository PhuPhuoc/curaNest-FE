import UserNavbar from "@/app/layout/userLayout/UserNavbar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <UserNavbar />
      <div>{children}</div>
    </div>
  );
}
