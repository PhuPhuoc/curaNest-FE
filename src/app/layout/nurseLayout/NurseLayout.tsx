"use client";
import NurseNavbar from "@/app/layout/nurseLayout/NurseNavBar";
import ProfileNurse from "@/app/nurse/profileNurse";
import { Button } from "@nextui-org/react";
import { useState } from "react";
import { UserOutlined } from "@ant-design/icons";

export default function NurseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const showDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  return (
    <div className="flex min-h-screen">
      <NurseNavbar />
      <div className="flex-1 flex flex-col lg:ml-64 bg-gray-200">
        <header className="bg-white w-full shadow-sm p-4 fixed items-center  top-0">
          <div className="mr-72 float-right">
            <Button onClick={showDrawer} className="bg-[#fff] border-1 ">
              <UserOutlined style={{ fontSize: "28px", color: "#b8b8b8" }} />
            </Button>
          </div>
        </header>

        <main
          className="flex-1 p-8 mt-20"
          style={{ minHeight: "calc(100vh - 170px)" }}
        >
          {children}
        </main>
      </div>
      <ProfileNurse open={isDrawerOpen} onClose={closeDrawer} />
    </div>
  );
}
