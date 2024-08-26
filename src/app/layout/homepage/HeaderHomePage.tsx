"use client";
import { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Button,
} from "@nextui-org/react";
import { AcmeLogo } from "@/app/layout/homepage/AcmeLogo";

const HeaderHomePage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = ["Log Out", "Log in"];

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} className="bg-sky-400 ">
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <AcmeLogo />
          <p className="font-bold text-inherit">CURANEST</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex gap-6 font-semibold"
        justify="center"
      >
        <NavbarItem>
          <Link color="foreground" href="#" className="hover:text-white">
            Features
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="#" color="foreground" className="hover:text-white">
            Customers
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#" className="hover:text-white">
            Integrations
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <Button
            as={Link}
            href="#"
            variant="flat"
            className="bg-slate-900 text-white font-semibold"
          >
            Login
          </Button>
        </NavbarItem>
        <NavbarItem className="hidden lg:flex">
          <Link
            href="#"
            className="text-white underline decoration-indigo-500 underline-offset-2"
          >
            Sign up
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={
                index === 2
                  ? "primary"
                  : index === menuItems.length - 1
                  ? "danger"
                  : "foreground"
              }
              className="w-full"
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
};

export default HeaderHomePage;
