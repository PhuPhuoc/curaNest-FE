"use client";
import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ProfileUser from "@/app/user/profileUser";
import { useAppContext } from "@/app/app-provider";

const UserNavbar = () => {
  const pathname = usePathname();
  const { user } = useAppContext();

  const menuItems = [
    { title: "Trang chủ", link: "/", roles: ["user"] },
    { title: "Đăng ký khách hàng", link: "/customerRegister", roles: ["user"] },
    { title: "Hồ sơ bệnh nhân", link: "/patientProfile", roles: ["customer"] },
    {
      title: "Tìm kiếm điều dưỡng",
      link: "/findingNurse",
      roles: ["user", "customer"],
    },
    {
      title: "Lịch hẹn sắp tới",
      link: "/upcomingSchedule",
      roles: ["customer"],
    },
    {
      title: "Lịch sử giao dịch",
      link: "/historyTransaction",
      roles: ["customer"],
    },
  ];

  const filteredMenuItems = menuItems.filter((item) =>
    item.roles.includes(user?.role ?? "")
  );

  const allMenuItems = [
    ...filteredMenuItems,
    { title: "Log out", link: "/login" },
  ];

  return (
    <Navbar className="w-full">
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarContent className="sm:hidden pr-3" justify="center">
        <NavbarBrand>
          <p className="font-bold text-inherit hover:text-lime-500 text-2xl">
            CURANEST
          </p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex gap-2 font-semibold justify-between flex-1"
        justify="center"
      >
        <NavbarBrand>
          <Link
            href="/"
            className="font-bold text-inherit text-2xl hover:text-lime-500 mr-2"
          >
            CURANEST
          </Link>
        </NavbarBrand>

        {filteredMenuItems.map((item, index) => (
          <NavbarItem
            key={`${item}-${index}`}
            isActive={
              pathname ===
              (item.title === "Trang chủ" ? item.link : `/user${item.link}`)
            }
          >
            <Link
              href={
                item.title === "Trang chủ" ? item.link : `/user${item.link}`
              }
              className={`${
                user?.role === "customer" ? "px-4" : "px-10"
              } py-2 ${
                pathname ===
                (item.title === "Trang chủ" ? item.link : `/user${item.link}`)
                  ? "text-lime-500 bg-lime-50 rounded-xl shadow-lg"
                  : "text-foreground"
              }`}
            >
              {item.title}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent className="sm:flex-1 sm:justify-end ml-2" justify="end">
        <NavbarItem>
          <ProfileUser />
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {allMenuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Button
              color={
                index === allMenuItems.length - 1
                  ? "danger"
                  : index === 2
                  ? "primary"
                  : "default"
              }
              className="w-full"
              href={`/user${item.link}`}
              variant="ghost"
              as={Link}
            >
              {item.title}
            </Button>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
};

export default UserNavbar;
