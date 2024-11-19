"use client";
import { useEffect, useState } from "react";
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
import techniqueApiRequest from "@/apiRequests/technique/technique";
import { Technique } from "@/types/technique";
import { toast } from "react-toastify";
import authApi from "@/apiRequests/customer/customer";
import { useAppContext } from "@/app/app-provider";
import Image from "next/image";

const colors = [
  "text-white bg-blue-500",
  "text-white bg-green-500",
  "text-white bg-red-500",
  "text-white bg-yellow-500",
];

const CreatePatientProfile: React.FC = () => {
  const router = useRouter();
  const { user } = useAppContext();

  const [full_name, setFull_name] = useState("");
  const [dob, setDob] = useState<DateValue | null>(null);
  const [address, setAddress] = useState("");
  const [phone_number, setPhone_number] = useState("");
  const [citizen_id, setCitizen_id] = useState("");
  const [city, setCity] = useState("Hồ Chí Minh");
  const [district, setDistrict] = useState("");
  const [ward, setWard] = useState("");
  const [medical_description, setMedical_description] = useState("");
  const [note_for_nurses, setNote_for_nurses] = useState("");
  const [techniques, setTechniques] = useState<Technique[]>([]);
  const [selectedTechniques, setSelectedTechniques] = useState<string[]>([]);
  const [avatar, setAvatar] = useState<File | null>(null);

  useEffect(() => {
    const fetchTechniques = async () => {
      try {
        const response = await techniqueApiRequest.getTechnique();
        const techniquesData = Array.isArray(response.payload.data)
          ? response.payload.data
          : [response.payload.data];
        setTechniques(techniquesData);
      } catch (error) {
        console.error("Failed to fetch techniques:", error);
      }
    };

    fetchTechniques();
  }, []);

  const handleChipClick = (techniqueId: string) => {
    setSelectedTechniques((prev) =>
      prev.includes(techniqueId)
        ? prev.filter((id) => id !== techniqueId)
        : [...prev, techniqueId]
    );
  };

  const handleSubmit = async () => {
    const nameRegex = /^[^0-9]*$/;
    if (!full_name || !nameRegex.test(full_name)) {
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
    if (!phone_number || !phoneRegex.test(phone_number)) {
      toast.error(
        "Số điện thoại không được để trống, chỉ chứa số, và tối đa 10 chữ số."
      );
      return;
    }

    const cccdRegex = /^\d{1,12}$/;
    if (!citizen_id || !cccdRegex.test(citizen_id)) {
      toast.error("Số CCCD không được để trống và tối đa 12 chữ số.");
      return;
    }

    const formattedDob = dob ? dob.toString() : "";

    const profile = {
      full_name,
      dob: formattedDob,
      address,
      phone_number,
      citizen_id,
      city,
      ward,
      district,
      medical_description,
      note_for_nurses,
      techniques: selectedTechniques,
      avatar: avatar ? URL.createObjectURL(avatar) : "",
    };

    if (!user?.id) {
      toast.error("Bạn cần đăng nhập trước khi đăng ký khách hàng.");
      return;
    }

    try {
      const response = await authApi.createProfilePatient(user.id, profile);
      if (response.status === 200) {
        toast.success("Hồ sơ bệnh nhân đã được tạo thành công.");
        router.push("/user/patientProfile");
      }
    } catch (error: any) {
      console.log("Không thể tạo hồ sơ bệnh nhân vì: ", error);
      toast.error("Lỗi: " + error.payload?.log || "Không thể tạo hồ sơ.");
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
              onChange={handleAvatarChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
            {avatar ? (
              <Image
              width={500}
              height={500}
                              src={URL.createObjectURL(avatar)}
                alt="Avatar preview"
                className=" object-cover"
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
              value={full_name}
              onChange={(e) => setFull_name(e.target.value)}
              className="flex-1"
              size="md"
            />
            <DateInput
              label="Ngày sinh"
              value={dob}
              onChange={(date) => setDob(date)}
              className="flex-1"
              size="md"
            />

            <Input
              label="Số thẻ Căn cước công dân"
              value={citizen_id}
              onChange={(e) => setCitizen_id(e.target.value)}
              className="flex-1"
              size="md"
            />
          </div>

          <div className="flex gap-4 mb-4">
            <Input
              label="Số điện thoại"
              value={phone_number}
              onChange={(e) => setPhone_number(e.target.value)}
              className="flex-1"
              size="md"
            />
            <Input
              label="Địa chỉ"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="flex-1"
              size="md"
            />
          </div>

          <div className="flex gap-4 mb-4">
            <Input
              label="Phường"
              value={ward}
              onChange={(e) => setWard(e.target.value)}
              className="flex-1"
              size="md"
            />

            <Input
              label="Quận"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              className="flex-1"
              size="md"
            />

            <Input
              label="Thành phố"
              disabled
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="flex-1"
              size="md"
            />
          </div>

          <Textarea
            placeholder="Mô tả bệnh lý"
            value={medical_description}
            onChange={(e) => setMedical_description(e.target.value)}
            className="mb-4"
            size="md"
          />

          <Textarea
            placeholder="Lưu ý với điều dưỡng"
            value={note_for_nurses}
            onChange={(e) => setNote_for_nurses(e.target.value)}
            className="mb-4"
            size="md"
          />

          <div className="mt-4">
            <p className="text-lg font-semibold">Chọn dịch vụ mong muốn</p>
            <div className="flex flex-wrap gap-2 mt-3">
              {techniques.map(({ id, name }, index) => (
                <Chip
                  key={id}
                  onClick={() => handleChipClick(id)}
                  className={`${
                    selectedTechniques.includes(id)
                      ? `${colors[index % colors.length]}`
                      : "text-black bg-gray-300"
                  } px-4 py-2`}
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

export default CreatePatientProfile;
