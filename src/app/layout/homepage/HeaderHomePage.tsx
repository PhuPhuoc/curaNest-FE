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
import SliderPage from "@/app/layout/homepage/SliderPage";
import AboutPage from "@/app/layout/homepage/AboutPage";
import TreatmentPage from "@/app/layout/homepage/TreatmentPage";

const HeaderHomePage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = ["Home", "About", "Treatment", "Login"];

  return (
    <div>
      <Navbar onMenuOpenChange={setIsMenuOpen} className="bg-sky-400">
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
            <Link
              color="foreground"
              href="#slider"
              className="hover:text-white"
            >
              Home
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="#about" color="foreground" className="hover:text-white">
              About
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link
              color="foreground"
              href="#treatment"
              className="hover:text-white"
            >
              Treatment
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
              Login
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
