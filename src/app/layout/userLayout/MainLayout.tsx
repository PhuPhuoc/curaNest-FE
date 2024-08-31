import UserNavbar from "@/app/layout/userLayout/UserNavbar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <UserNavbar />
      <div className="">{children}</div>
    </div>
  );
}
