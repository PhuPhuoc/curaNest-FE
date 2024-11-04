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
import { AcmeLogo } from "../../Icon/AcmeLogo";
import SliderPage from "@/app/layout/homepage/SliderPage";
import AboutPage from "@/app/layout/homepage/AboutPage";
import TreatmentPage from "@/app/layout/homepage/ServicePage";

const HeaderHomePage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = ["Home", "About", "Treatment", "Login"];

  return (
    <div>
      <Navbar onMenuOpenChange={setIsMenuOpen}>
        <NavbarContent>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden"
          />
          <NavbarBrand>
            <AcmeLogo />
            <Link
              href={"/"}
              className="font-bold text-inherit text-2xl mr-6"
            >
              CURANEST
            </Link>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent
          className="hidden sm:flex gap-6 font-semibold"
          justify="center"
        >
          <NavbarItem>
            <Link
              color="foreground"
              href="/"
              className="hover:text-gray"
            >
              Trang chủ
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="#about" color="foreground" className="hover:text-gray">
              Giới thiệu
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link
              color="foreground"
              href="#treatment"
              className="hover:text-gray"
            >
              Dịch vụ
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem>
            <Button
              as={Link}
              href="/login"
              variant="flat"
              className="bg-slate-900 text-white font-semibold underline-offset-1 underline decoration-indigo-600"
            >
              Đăng nhập
            </Button>
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

      <div id="slider">
        <SliderPage />
      </div>

      <div id="about">
        <AboutPage />
      </div>

      <div id="treatment">
        <TreatmentPage />
      </div>
    </div>
  );
};

export default HeaderHomePage;
