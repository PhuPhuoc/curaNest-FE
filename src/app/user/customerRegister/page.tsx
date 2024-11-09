"use client";
import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/react";

const PatientProfile: React.FC = () => {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center  h-[80vh]">
      <div className="text-center">
        <div className="text-lg font-semibold text-gray-500 mb-4">
          Đăng ký thành khách hàng của Curanest để có những trải nghiệm thú vị hơn
        </div>
        <Button
          onClick={() => router.push("/user/formRegisterCustomer")}
          className="bg-lime-500 text-white font-bold px-4 py-2 rounded shadow-md transition-colors"
        >
          Đăng ký ngay
        </Button>
      </div>
    </div>
  );
};

export default PatientProfile;
