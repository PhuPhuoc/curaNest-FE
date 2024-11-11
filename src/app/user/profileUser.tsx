import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  User,
} from "@nextui-org/react";
import { useAppContext } from "@/app/app-provider";

const ProfileUser = () => {
  const { setUser, user } = useAppContext();
  function handleLogout() {
    setUser(null);
    localStorage.removeItem("user");
    document.cookie =
      "userRole=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
  }
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
            description={user?.email || "Email không xác định"}
            name={user?.user_name || "Tên không xác định"}
          />
        </DropdownTrigger>

        <DropdownMenu aria-label="User Actions" variant="flat">
          <DropdownItem key="change_password">Đổi mật khẩu</DropdownItem>

          <DropdownItem
            href="/login"
            onClick={handleLogout}
            key="logout"
            color="danger"
          >
            Đăng xuất
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </>
  );
};

export default ProfileUser;
