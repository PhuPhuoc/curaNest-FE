"use client";
import { Divider } from "@nextui-org/react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

const PaymentResult = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const amount = searchParams.get("amount");
  const account = searchParams.get("account");
  const date = searchParams.get("date");
  const infor = searchParams.get("infor");

  function handleRouteBack() {
    router.push("/user");
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white text-center p-8 rounded-lg shadow-lg w-1/3">
        <Image
          src="https://cdn2.fptshop.com.vn/unsafe/Uploads/images/tin-tuc/148929/Originals/tich_xanh_titktok_2.png" // Dấu tick màu trắng
          alt="Success Icon"
          width={120}
          height={120}
          className="mx-auto mb-4 rounded-full p-2"
        />

        <h1 className="text-2xl font-bold mb-4 text-cyan-400">
          Thanh toán thành công!
        </h1>
        <h1 className="text-2xl font-bold italic mb-4">
          {amount
            ? `${new Intl.NumberFormat("vi-VN").format(Number(amount))} VND`
            : "Số tiền không xác định"}
        </h1>

        <div className="grid gap-4 text-left text-gray-700">
          <Divider />

          <div className="flex items-center justify-between">
            <p className="font-medium text-lg">Số tài khoản:</p>
            <p style={{ letterSpacing: 1 }}>
              {account || "Chưa có số tài khoản"}
            </p>
          </div>
          <Divider />

          <div className="flex items-center justify-between">
            <p className="font-medium text-lg">Ngày chuyển khoản:</p>
            <p style={{ letterSpacing: 1 }}>
              {date || "Chưa có ngày chuyển khoản"}
            </p>
          </div>
          <Divider />

          <div className="flex items-center justify-between">
            <p className="font-medium text-lg">Nội dung chuyển khoản:</p>
            <p className="max-w-[200px]" style={{ letterSpacing: 1 }}>
              {infor || "Chưa có nội dung chuyển khoản"}
            </p>
          </div>
          <Divider />
        </div>

        <button
          onClick={handleRouteBack}
          className="bg-cyan-400 text-white px-6 py-4 mt-6 rounded hover:bg-cyan-600"
        >
          Quay về trang chủ
        </button>
      </div>
    </div>
  );
};

export default PaymentResult;
