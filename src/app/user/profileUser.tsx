// components/ProfileDrawer.tsx
import React, { useState } from "react";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar, User} from "@nextui-org/react";



const ProfileUser = () => {
  return (
    <>
     <Dropdown placement="bottom-start">
        <DropdownTrigger>
          <User
            as="button"
            avatarProps={{
              isBordered: true,
              src: "https://as2.ftcdn.net/v2/jpg/04/10/43/77/1000_F_410437733_hdq4Q3QOH9uwh0mcqAhRFzOKfrCR24Ta.jpg",
            }}
            className="transition-transform"
            description="nhantamhd@gmail.com"
            name="Hồ Đắc Nhân Tâm"
          />
        </DropdownTrigger>

        <DropdownMenu aria-label="User Actions" variant="flat">
          
          <DropdownItem key="change_password">
           Đổi mật khẩu
          </DropdownItem>
         
          <DropdownItem href="/" key="logout" color="danger">
           Đăng xuất
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </>
  );
};

export default ProfileUser;
