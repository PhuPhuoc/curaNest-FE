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

const UserNavbar = () => {
  const menuItems = [
    { title: "Hồ sơ bệnh nhân", link: "/patientProfile" },
    { title: "Tìm kiếm điều dưỡng", link: "/findingNurse" },
    { title: "Lịch hẹn sắp tới", link: "/upcomingSchedule" },
    { title: "Lịch sử giao dịch", link: "/historyTransaction" },
  ];

  const allMenuItems = [...menuItems, { title: "Log out", link: "/login" }];

  return (
    <Navbar className="w-full">
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarContent className="sm:hidden pr-3" justify="center">
        <NavbarBrand>
          <p className="font-bold text-inherit hover:text-sky-400 text-2xl">
            CURANEST
          </p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex gap-4 font-semibold justify-between flex-1"
        justify="center"
      >
        <NavbarBrand>
          <p className="font-bold text-inherit text-2xl hover:text-sky-400 mr-10">
            CURANEST
          </p>
        </NavbarBrand>
        {menuItems.map((item, index) => (
          <NavbarItem key={`${item}-${index}`}>
            <Button
              href={`/user/${item.link}`}
              variant="ghost"
              className="text-foreground hover:text-white px-4 py-2"
              as={Link}
            >
              {item.title}
            </Button>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent className="sm:flex-1 sm:justify-end" justify="end">
        <NavbarItem>
          <Button
            as={Link}
            href="/login"
            variant="flat"
            className="hidden sm:block bg-slate-900 text-white font-semibold underline-offset-1 underline decoration-indigo-600 px-4 py-2"
          >
            Log out
          </Button>
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
              href={`/user/${item.link}`}
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
