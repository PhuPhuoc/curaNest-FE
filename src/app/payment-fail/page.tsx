"use client";
import { Divider } from "@nextui-org/react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

const Page = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const amount = searchParams.get("amount");
  const date = searchParams.get("date");
  const infor = searchParams.get("infor");

  function handleRouteBack() {
    router.push("/nurse");
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white text-center p-8 rounded-lg shadow-lg w-1/3">
        <Image
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2ZHIDTj48-MPJgzYFgx0w7Bn5VbMSfbz-uA&s" 
          alt="Success Icon"
          width={120}
          height={120}
          className="mx-auto mb-4 rounded-full p-2"
        />

        <h1 className="text-2xl font-bold mb-4 text-red-400">
          Thanh toán thất bại!
        </h1>
        <h1 className="text-2xl font-bold italic mb-4">
          {amount
            ? `${new Intl.NumberFormat("vi-VN").format(Number(amount))} VND`
            : "Số tiền không xác định"}
        </h1>

        <div className="grid gap-4 text-left text-gray-700">
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

export default Page;
