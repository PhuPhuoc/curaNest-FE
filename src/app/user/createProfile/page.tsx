"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Input,
  Button,
  Chip,
  Breadcrumbs,
  BreadcrumbItem,
  DateInput,
  DateValue,
  Textarea,
} from "@nextui-org/react";
import { v4 as uuidv4 } from "uuid"; // Import uuid

const services = [
  {
    name: "Thay băng",
    color: "bg-blue-500",
    hoverColor: "hover:bg-blue-600",
    textColor: "text-white",
  },
  {
    name: "Cho ăn",
    color: "bg-green-500",
    hoverColor: "hover:bg-green-600",
    textColor: "text-white",
  },
  {
    name: "Tiêm thuốc",
    color: "bg-red-500",
    hoverColor: "hover:bg-red-600",
    textColor: "text-white",
  },
];

const CreateProfile: React.FC = () => {
  const router = useRouter();

  const [name, setName] = useState("");
  const [dob, setDob] = useState<DateValue | null>(null);
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [cccd, setCccd] = useState("");
  const [medicalDescription, setMedicalDescription] = useState("");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [avatar, setAvatar] = useState<File | null>(null);

  const handleChipClick = (service: string) => {
    setSelectedServices((prevSelected) =>
      prevSelected.includes(service)
        ? prevSelected.filter((s) => s !== service)
        : [...prevSelected, service]
    );
  };

  const handleSubmit = () => {
    const nameRegex = /^[^0-9]*$/;
    if (!name || !nameRegex.test(name)) {
      alert("Họ và Tên không được để trống và không được chứa số.");
      return;
    }

    if (!dob) {
      alert("Ngày sinh không được để trống.");
      return;
    }

    if (!address) {
      alert("Địa chỉ không được để trống.");
      return;
    }

    const phoneRegex = /^\d{1,10}$/;
    if (!phoneNumber || !phoneRegex.test(phoneNumber)) {
      alert(
        "Số điện thoại không được để trống, chỉ chứa số, và tối đa 10 chữ số."
      );
      return;
    }

    const cccdRegex = /^\d{1,12}$/;
    if (!cccd || !cccdRegex.test(cccd)) {
      alert("Số CCCD không được để trống và tối đa 12 chữ số.");
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

      medicalDescription,
      selectedServices,
      avatar: avatar ? URL.createObjectURL(avatar) : "",
    };

    console.log(profile);

    // Lấy danh sách hồ sơ hiện tại từ localStorage
    const existingProfiles = JSON.parse(
      localStorage.getItem("profiles") || "[]"
    );

    // Thêm hồ sơ mới vào danh sách
    existingProfiles.push(profile);

    // Lưu danh sách hồ sơ cập nhật vào localStorage
    localStorage.setItem("profiles", JSON.stringify(existingProfiles));

    router.push("/user/patientProfile");
  };

  const handProleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAvatar(e.target.files[0]);
    }
  };

  // Handle Go Back
  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className="p-6">
      <Breadcrumbs className="mb-4">
        <BreadcrumbItem href="/user/patientProfile">
          Hồ sơ bệnh nhân
        </BreadcrumbItem>
        <BreadcrumbItem>Tạo hồ sơ bệnh nhân</BreadcrumbItem>
      </Breadcrumbs>

      <h1 className="text-2xl font-bold mb-4">Tạo hồ sơ bệnh nhân</h1>

      {/* Bố cục ảnh và các trường nhập liệu */}
      <div className="mb-4 flex gap-x-10">
        {/* Ảnh đại diện */}
        <div className="w-60 h-60 flex-shrink-0">
          <label className="relative flex items-center justify-center w-full h-full bg-gray-200 border border-gray-300 rounded-lg overflow-hidden">
            <input
              type="file"
              accept="image/*"
              onChange={handProleFileChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
            {avatar ? (
              <img
                src={URL.createObjectURL(avatar)}
                alt="Avatar preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-gray-500">Chọn ảnh</span>
            )}
          </label>
        </div>

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

            <Input
              label="Số thẻ Căn cước công dân"
              value={cccd}
              onChange={(e) => setCccd(e.target.value)}
              className="flex-1"
              size="lg"
            />
          </div>

          <div className="flex gap-4 ">
            <Input
              label="Địa chỉ"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
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

          <div className="flex gap-4 mb-4"></div>

          <Textarea
            placeholder="Mô tả bệnh lý"
            value={medicalDescription}
            onChange={(e) => setMedicalDescription(e.target.value)}
            className="mb-4"
            size="lg"
          />

          <div className="mt-4">
            <p className="text-lg font-semibold">Chọn dịch vụ mong muốn</p>
            <div className="flex flex-wrap gap-2 mt-3">
              {services.map(({ name, color, hoverColor, textColor }) => (
                <Chip
                  key={name}
                  onClick={() => handleChipClick(name)}
                  className={`transition-colors ${
                    selectedServices.includes(name)
                      ? `${color} ${textColor}`
                      : "bg-gray-300 text-gray-700"
                  } ${hoverColor}`}
                >
                  {name}
                </Chip>
              ))}
            </div>
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
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 5H1m0 0 4 4M1 5l4-4"
            />
          </svg>
          Quay lại
        </Button>

        <Button size="lg" onClick={handleSubmit} color="primary">
          Tạo
        </Button>
      </div>
    </div>
  );
};

export default CreateProfile;
