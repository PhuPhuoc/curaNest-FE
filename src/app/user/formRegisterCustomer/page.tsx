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
  CircularProgress,
} from "@nextui-org/react";
import { toast } from "react-toastify";
import { useAppContext } from "@/app/app-provider";
import authApiRequest from "@/apiRequests/customer/customer";

const FormRegister: React.FC = () => {
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
  const [loading, setLoading] = useState(false);

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
      full_name,
      dob: formattedDob,
      address,
      phone_number,
      citizen_id,
      city,
      district,
      ward,
    };
    
    if (!user?.id) {
      toast.error("Bạn cần đăng nhập trước khi đăng ký khách hàng.");
      return;
    }

    try {
      setLoading(true);
      const response = await authApiRequest.register(user.id, profile);
      if (response.status === 200) {
        toast.success(`${user.user_name} đã trở thành khách hàng của Curanest`);
        router.push("/user/patientProfile");
      }
    } catch (error: any) {
      if (error.payload.log.includes("this citizen id already exists")) {
        toast.error(`${user.user_name} đã đăng ký khách hàng của Curanest rồi!`);
      } else {
        toast.error(error.payload.log);
      }
    } finally {
      setLoading(false);
    }
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
              value={full_name}
              onChange={(e) => setFull_name(e.target.value)}
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
              value={citizen_id}
              onChange={(e) => setCitizen_id(e.target.value)}
              className="flex-1"
              size="lg"
            />
            <Input
              label="Số điện thoại"
              value={phone_number}
              onChange={(e) => setPhone_number(e.target.value)}
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

        <Button size="lg" onClick={handleSubmit} color="primary" disabled={loading}>
          {loading ? (
            <CircularProgress size="md" color="primary" />
          ) : (
            "Đăng ký"
          )}
        </Button>
      </div>
    </div>
  );
};

export default FormRegister;
