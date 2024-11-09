"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Input,
  Button,
  Breadcrumbs,
  BreadcrumbItem,
  DateInput,
  DateValue,
} from "@nextui-org/react";
import { v4 as uuidv4 } from "uuid"; // Import uuid
import { toast } from "react-toastify";

const FormRegister: React.FC = () => {
  const router = useRouter();

  const [name, setName] = useState("");
  const [dob, setDob] = useState<DateValue | null>(null);
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [cccd, setCccd] = useState("");
  const [city, setCity] = useState("Hồ Chí Minh");
  const [district, setDistrict] = useState("");
  const [ward, setWard] = useState("");

  const handleSubmit = () => {
    const nameRegex = /^[^0-9]*$/;
    if (!name || !nameRegex.test(name)) {
      toast.error("Họ và Tên không được để trống và không được chứa số.");
      return;
    }

    if (!dob) {
      toast.error("Ngày sinh không được để trống.");
      return;
    }

    if (!address) {
      toast.error("Địa chỉ không được để trống.");
      return;
    }

    const phoneRegex = /^\d{1,10}$/;
    if (!phoneNumber || !phoneRegex.test(phoneNumber)) {
      toast.error(
        "Số điện thoại không được để trống, chỉ chứa số, và tối đa 10 chữ số."
      );
      return;
    }

    const cccdRegex = /^\d{1,12}$/;
    if (!cccd || !cccdRegex.test(cccd)) {
      toast.error("Số CCCD không được để trống và tối đa 12 chữ số.");
      return;
    }

    if (!district) {
      toast.error("Quận không được để trống.");
      return;
    }

    if (!ward) {
      toast.error("Phường không được để trống.");
      return;
    }

    const formattedDob = dob ? dob.toString() : "";

    const profile = {
      id: uuidv4(),
      name,
      dob: formattedDob,
      address,
      phoneNumber,
      cccd,
      city,
      district,
      ward,
    };

    console.log(profile);
    toast.success("Thông tin đã được đăng ký thành công!");
    router.push("/user/patientProfile");
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className="p-6">
      <Breadcrumbs className="mb-4">
        <BreadcrumbItem href="/user/customerRegister">
          Đăng ký khách hàng
        </BreadcrumbItem>
        <BreadcrumbItem>Đăng ký</BreadcrumbItem>
      </Breadcrumbs>

      <h1 className="text-2xl font-bold mb-4">Vui lòng nhập thông tin</h1>

      {/* Bố cục ảnh và các trường nhập liệu */}
      <div className="mb-4 flex gap-x-10">
        {/* Các trường nhập liệu */}
        <div className="flex-1">
          <div className="flex gap-4 mb-4">
            <Input
              label="Họ và Tên"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="flex-1"
              size="lg"
            />
            <DateInput
              label="Ngày sinh"
              value={dob}
              onChange={(date) => setDob(date)}
              className="flex-1"
              size="lg"
            />
          </div>

          <div className="flex gap-4 mb-4">
            <Input
              label="Số thẻ Căn cước công dân"
              value={cccd}
              onChange={(e) => setCccd(e.target.value)}
              className="flex-1"
              size="lg"
            />
            <Input
              label="Số điện thoại"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="flex-1"
              size="lg"
            />
          </div>

          <div className="flex gap-4 mb-4">
            <Input
              label="Địa chỉ"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="flex-1"
              size="lg"
            />
            <Input
              label="Phường"
              value={ward}
              onChange={(e) => setWard(e.target.value)}
              className="flex-1"
              size="lg"
            />
          </div>

          <div className="flex gap-4 mb-4">
            <Input
              label="Quận"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              className="flex-1"
              size="lg"
            />
            <Input
              label="Thành phố"
              disabled
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="flex-1"
              size="lg"
            />
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-2">
        <Button onClick={handleGoBack} size="lg" color="danger">
          <svg
            className="w-4 h-4 text-white dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 5H1m0 0 4 4M1 5l4-4"
            />
          </svg>
          Quay lại
        </Button>

        <Button size="lg" onClick={handleSubmit} color="primary">
          Đăng ký
        </Button>
      </div>
    </div>
  );
};

export default FormRegister;
