"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@nextui-org/react";
import MenuIcon from "@/app/Icon/MenuIcon";

const NurseNavbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { title: "Thống kê", link: "/dashboard" },
    { title: "Lịch hẹn với bệnh nhân", link: "/patientSchedule" },
    { title: "Lịch làm việc", link: "/workingSchedule" },
    { title: "Lịch sử giao dịch", link: "/historyTransaction" },
  ];

  return (
    <>
      <div className="h-screen w-64 bg-gray-800 p-4 text-white fixed hidden lg:flex flex-col">
        <div className="mb-8">
          <Link href="">
            <p className="font-bold text-inherit text-2xl hover:text-sky-400">
              CURANEST
            </p>
          </Link>
        </div>

        <nav className="flex flex-col flex-1">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              href={`/nurse${item.link}`}
              className={`block p-4 my-2 rounded-2xl font-semibold ${
                pathname === `/nurse${item.link}`
                  ? "bg-amber-500 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
              }`}
            >
              {item.title}
            </Link>
          ))}
        </nav>

      
      </div>

      {/* Mobile Navbar */}
      <div className="lg:hidden flex items-center justify-between bg-gray-800 text-white p-4 fixed w-full z-50">
        <Link href="/user/patientProfile">
          <p className="font-bold text-inherit text-2xl hover:text-sky-400">
            CURANEST
          </p>
        </Link>
        <Button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? (
            <MenuIcon/>
          ) : (
            <MenuIcon/>
          )}
        </Button>
      </div>

      {isOpen && (
        <div className="lg:hidden bg-gray-800 text-white w-full p-4 fixed z-40 top-16">
          <nav className="flex flex-col">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                href={`/user${item.link}`}
                className={`block px-4 py-2 my-2 rounded ${
                  pathname === `/user${item.link}`
                    ? "bg-blue-500 text-white"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                }`}
              >
                {item.title}
              </Link>
            ))}
            <Link
              href="/login"
              className="block w-full bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 text-center rounded"
            >
              Log out
            </Link>
          </nav>
        </div>
      )}
    </>
  );
};

export default NurseNavbar;
