"use client";
import NurseNavbar from "@/app/layout/nurseLayout/NurseNavBar";
import ProfileNurse from "@/app/nurse/profileNurse";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
  User,
} from "@nextui-org/react";
import { useState } from "react";
import { useAppContext } from "@/app/app-provider";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import axios from "axios";
import paymentApiRequest from "@/apiRequests/payment/payment";
export interface FormPayment {
  amount: string;
  user_id: string | null;
}

export default function NurseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { setUser, user, setAccount } = useAppContext();
  const showDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);
  const [loading, setLoading] = useState(false);
  const [feeError, setFeeError] = useState(false);
  const router = useRouter();
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [createFormData, setCreateFormData] = useState<FormPayment>({
    amount: "",
    user_id: user && user?.id,
  });

  const [amount, setAmount] = useState<number>(0);
  async function fetchCurrentAmount() {
    setLoading(true);
    try {
      if (user) {
        const response = await paymentApiRequest.getWallet(user.id);
        setAmount(response.payload.data.wallet_amount);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching techniques:", error);
      setLoading(false);
    }
  }

  function handleLogout() {
    setUser(null);
    setAccount(null);
    localStorage.removeItem("user");
    document.cookie =
      "userRole=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
  }

  const handleCreateModalOpen = () => {
    setCreateModalOpen(true);
    fetchCurrentAmount();
  };

  const handleCreateModalClose = () => {
    setCreateModalOpen(false);
    setCreateFormData({ user_id: "", amount: "" });
    setFeeError(false);
  };

  const handleCreateSubmit = async () => {
    const feeNumeric = createFormData.amount.replace(/\D/g, "");
    if (feeNumeric.length < 4) {
      setFeeError(true);
      return;
    }

    const feeAsNumber = parseInt(feeNumeric, 10);
    const finalData = {
      user_id: user?.id,
      amount: feeAsNumber,
    };

    try {
      const response = await axios.get(
        `https://api.curanest.com.vn/api/v1/payments/vnpay-url?amount=${finalData.amount}&nurse_id=${finalData.user_id}`,
        {
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200 && response.data?.data?.payment_url) {
        const paymentUrl = response.data.data.payment_url;
        router.push(paymentUrl);
      } else {
        toast.error("Không lấy được URL thanh toán.");
      }
    } catch (error) {
      console.error("Error creating payment URL:", error);
      toast.error("Có lỗi xảy ra trong quá trình xử lý.");
    }
  };

  const handleFeeInputChange = (value: string) => {
    const numericValue = value.replace(/[^\d]/g, "");
    const formattedValue = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    if (numericValue.length < 4) {
      setFeeError(true);
    } else {
      setFeeError(false);
    }

    setCreateFormData((prev) => ({
      ...prev,
      amount: formattedValue,
    }));
  };

  return (
    <div className="flex min-h-screen">
      <NurseNavbar />
      <div className="flex-1 flex flex-col lg:ml-64 bg-gray-200">
        <header className="bg-white w-full shadow-sm p-4 fixed items-center  top-0">
          <div className="mr-[300px] float-right">
            <Dropdown placement="bottom-start">
              <DropdownTrigger>
                <User
                  as="button"
                  avatarProps={{
                    isBordered: true,
                    src: user?.avatar,
                  }}
                  className="transition-transform "
                  description={user?.email}
                  name={user?.user_name || "Tên không xác định"}
                />
              </DropdownTrigger>

              <DropdownMenu aria-label="User Actions" variant="flat">
                <DropdownItem
                  color="primary"
                  key="information"
                  onClick={showDrawer}
                >
                  Thông tin cá nhân
                </DropdownItem>
                <DropdownItem
                  color="secondary"
                  key="payment"
                  onClick={handleCreateModalOpen}
                >
                  Số dư của ví
                </DropdownItem>
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

      <Modal
        isOpen={createModalOpen}
        onClose={handleCreateModalClose}
        size="2xl"
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-2 text-center">
            <h2 className="text-2xl font-bold text-gray-800">
              Nạp tiền vào tài khoản
            </h2>
            <p className="text-sm text-gray-500">
              Nhập số tiền cần nạp hoặc kiểm tra số dư hiện tại của bạn.
            </p>
          </ModalHeader>

          <ModalBody>
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow-sm">
                <span className="text-lg font-semibold text-gray-600">
                  Số dư hiện tại:
                </span>
                <span className="text-2xl font-bold text-cyan-500">
                  {new Intl.NumberFormat("vi-VN").format(amount || 0)} VND
                </span>
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="amount"
                  className="text-lg font-medium text-gray-700"
                >
                  Số tiền nạp
                </label>
                <Input
                  id="amount"
                  size="lg"
                  placeholder="Nhập số tiền"
                  variant="bordered"
                  value={createFormData.amount}
                  onChange={(e) => handleFeeInputChange(e.target.value)}
                  endContent={<div className="text-default-400">VND</div>}
                  isInvalid={feeError}
                  errorMessage={
                    feeError ? "Số tiền phải lớn hơn hoặc bằng 1,000 VND" : ""
                  }
                  className="text-xl font-medium"
                />
              </div>
            </div>
          </ModalBody>

          <ModalFooter className="flex justify-end">
            <div className="flex gap-4">
              <Button
                size="lg"
                color="danger"
                variant="light"
                onPress={handleCreateModalClose}
                className="text-lg font-bold"
              >
                Hủy
              </Button>
              <Button
                isLoading={loading}
                size="lg"
                className="bg-cyan-400 text-white text-lg font-bold hover:bg-cyan-500"
                onPress={handleCreateSubmit}
              >
                Xác nhận
              </Button>
            </div>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
