"use client";
import { useAppContext } from "@/app/app-provider";
import AdminNavbar from "@/app/layout/adminLayout/AdminNavbar";
import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, setUser, setAccount } = useAppContext();

  function handleLogout() {
    setUser(null);
    setAccount(null);
    localStorage.removeItem("user");
    document.cookie =
      "userRole=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
  }

  return (
    <div className="flex min-h-screen">
      <AdminNavbar />
      <div className="flex-1 flex flex-col lg:ml-72">
        <header className="bg-[#FFF] shadow-sm p-4 fixed w-full z-40 top-0">
          <div className="mr-72 flex items-center justify-between">
            <h1 className="text-xl font-semibold ml-8 text-sky-300 ">
              Chào mừng trở lại {user?.user_name}
            </h1>
            <Link
              href="/login"
              onClick={handleLogout}
              className="block w-[10%] bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 text-center rounded-lg"
            >
              Đăng xuất
            </Link>
          </div>
        </header>
        <main
          className="flex-1 p-14 mt-12 bg-gray-100"
          style={{ minHeight: "calc(100vh - 170px)" }}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
