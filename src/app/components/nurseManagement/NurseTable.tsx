"use client";

import nurseApiRequest from "@/apiRequests/nurse/nurse";
import techniqueApiRequest from "@/apiRequests/technique/technique";
import Lightning from "@/app/Icon/Lightning";
import Plus from "@/app/Icon/Plus";
import { CreateNurseData, Nurse } from "@/types/nurse";
import { Technique } from "@/types/technique";
import {
  Button,
  Input,
  Table,
  Avatar,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Select,
  SelectItem,
  ModalFooter,
  PopoverTrigger,
  PopoverContent,
  Popover,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "react-toastify";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../../../firebaseConfig";

interface FormData {
  full_name: string;
  phone_number: string;
}

export interface NurseData {
  id: number;
  avatar: string | null;
  certificate: string;
  citizen_id: string;
  current_workplace: string;
  education_level: string;
  email: string;
  expertise: string;
  full_name: string;
  name: string;
  password: string;
  phone_number: string;
  slogan: string;
  techniques: string[];
  work_experience: string;
}

const inputStyles = {
  inputStyle: {
    fontSize: 18,
  },
  classNames: {
    label: "text-[22px] font-bold text-black/70 dark:text-white/90 mb-2",
    input: [
      "bg-transparent mt-2",
      "text-black/90 dark:text-white/90",
      "placeholder:text-default-700/50 dark:placeholder:text-white/60",
    ],
    errorMessage: "text-red-500 text-sm mt-1",
  },
};

interface FormErrors extends Record<keyof CreateNurseData, string> {}

export const uploadImageToFirebase = async (uri: string) => {
  try {
    const response = await fetch(uri);
    const blob = await response.blob();
    const filename = `images/${Date.now()}_${uri.split("/").pop()}`;
    const storageRef = ref(storage, filename);

    await uploadBytes(storageRef, blob);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  } catch (error) {
    console.error("Error uploading image:", error);
    return null;
  }
};

const NurseTable = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewAvatar, setPreviewAvatar] = useState<string | null>(null);
  const router = useRouter();
  
  const [formData, setFormData] = useState<FormData>({
    full_name: "",
    phone_number: "",
  });

  const [loading, setLoading] = useState(false);
  const [nurseList, setNurseList] = useState<Nurse[]>([]);
  const [techniques, setTechniques] = useState<Technique[]>([]);

  async function fetchTechniques() {
    try {
      const response = await techniqueApiRequest.getTechnique();
      setTechniques(response.payload.data);
    } catch (error) {
      console.error("Error fetching techniques:", error);
    }
  }

  async function fetchNurseList() {
    try {
      const response = await nurseApiRequest.listNurse();
      setNurseList(response.payload.data);
    } catch (error) {
      console.error("Error fetching NurseList:", error);
    }
  }

  useEffect(() => {
    fetchNurseList();
  }, []);

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [createFormData, setCreateFormData] = useState<CreateNurseData>({
    avatar:
      "https://gratisography.com/wp-content/uploads/2024/01/gratisography-cyber-kitty-800x525.jpg",
    certificate: "",
    citizen_id: "",
    current_workplace: "",
    education_level: "",
    email: "",
    expertise: "",
    full_name: "",
    name: "",
    password: "",
    phone_number: "",
    slogan: "",
    techniques: [],
    work_experience: "",
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({
    name: "",
    email: "",
    full_name: "",
    citizen_id: "",
    current_workplace: "",
    phone_number: "",
    slogan: "",
    education_level: "",
    work_experience: "",
    avatar: "",
    techniques: "",
    certificate: "",
    expertise: "",
    password: "",
  });

  const handleRowDoubleClick = (nurse: Nurse) => {
    router.push(`./nurse-management/${nurse.user_id}`);
  };

  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  const pages = Math.ceil(nurseList.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return nurseList.slice(start, end);
  }, [page, nurseList]);

  const handleCreateModalOpen = () => {
    setCreateModalOpen(true);
    fetchTechniques();
  };

  const handleCreateModalClose = () => {
    setCreateModalOpen(false);
    fetchNurseList();
    setCreateFormData({
      avatar: null,
      certificate: "",
      citizen_id: "",
      current_workplace: "",
      education_level: "",
      email: "",
      expertise: "",
      full_name: "",
      name: "",
      password: "",
      phone_number: "",
      slogan: "",
      techniques: [],
      work_experience: "",
    });
    setFormErrors({
      avatar: "",
      certificate: "",
      citizen_id: "",
      current_workplace: "",
      education_level: "",
      email: "",
      expertise: "",
      full_name: "",
      name: "",
      password: "",
      phone_number: "",
      slogan: "",
      techniques: "",
      work_experience: "",
    });
    setPreviewAvatar(null);
  };

  const handleCreateSubmit = async () => {
    let errors = { ...formErrors };
    let hasError = false;
    setLoading(true);

    const requiredFields: Array<{ field: keyof FormErrors; message: string }> =
      [
        { field: "name", message: "Tên đăng nhập là bắt buộc" },
        { field: "email", message: "Email là bắt buộc" },
        { field: "password", message: "Mật khẩu là bắt buộc" },
        { field: "full_name", message: "Họ và tên là bắt buộc" },
        { field: "citizen_id", message: "Mã căn cước công dân là bắt buộc" },
        { field: "current_workplace", message: "Nơi làm việc là bắt buộc" },
        { field: "phone_number", message: "Số điện thoại là bắt buộc" },
        { field: "slogan", message: "Slogan là bắt buộc" },
        { field: "education_level", message: "Trình độ học vấn là bắt buộc" },
        {
          field: "work_experience",
          message: "Kinh nghiệm làm việc là bắt buộc",
        },
        { field: "techniques", message: "Kỹ thuật là bắt buộc" },
        { field: "certificate", message: "Chứng chỉ là bắt buộc" },
        { field: "expertise", message: "Chuyên môn là bắt buộc" },
      ];

    requiredFields.forEach(({ field, message }) => {
      if (!createFormData[field as keyof CreateNurseData]) {
        errors[field] = message;
        hasError = true;
      } else {
        errors[field] = "";
      }
    });

    setFormErrors(errors);

    if (hasError) {
      return;
    }

    try {
      if (previewAvatar) {
        const uploadedAvatarUrl = await uploadImageToFirebase(previewAvatar);
        if (uploadedAvatarUrl) {
          createFormData.avatar = uploadedAvatarUrl;
        } else {
          toast.error("Lỗi tải ảnh lên. Vui lòng thử lại.");
          setLoading(false);
          return;
        }
      }
      const response = await nurseApiRequest.createNurse(createFormData);
      toast.success(response.payload.message);
      handleCreateModalClose();
      setLoading(false);
    } catch (error: any) {
      if (error.payload.log.includes("this email already exists")) {
        toast.error("Email đã tồn tại trong hệ thống");
      } else if (error.payload.log.includes("this citizen id already exists")) {
        toast.error("Mã cccd này đã tồn tại");
      } else {
        toast.error(error.payload.log);
      }
      setLoading(false);
    }
  };

  const handleCreateFormChange = (
    field: keyof CreateNurseData,
    value: string | string[] | number
  ) => {
    setCreateFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("Vui lòng chọn file ảnh");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        alert("Kích thước file không được vượt quá 5MB");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setPreviewAvatar(base64String);
        handleCreateFormChange("avatar", base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleConfirm = async () => {
    try {
      const response = await nurseApiRequest.listNurse(
        formData.full_name,
        formData.phone_number
      );
      setNurseList(response.payload.data);
    } catch (error) {
      console.error("Error fetching NurseList:", error);
    }
  };

  const handleClear = () => {
    fetchNurseList();
    setFormData({ full_name: "", phone_number: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "citizenID") {
      if (!/^\d*$/.test(value)) return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <Table
        selectionMode="single"
        aria-label="Table"
        color={"secondary"}
        topContent={
          <div className="flex w-full justify-start">
            <Button
              onClick={handleCreateModalOpen}
              className="bg-indigo-700 text-white font-bold mr-4 text-lg p-6"
              startContent={<Plus />}
            >
              Thêm mới điều dưỡng
            </Button>
            <Popover placement="bottom-start" showArrow={true}>
              <PopoverTrigger>
                <Button className="bg-green-600 text-white font-bold text-lg p-6">
                  Lọc điều dưỡng
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-6">
                <div style={{ display: "flex", gap: 10 }}>
                  <Input
                    label="Tên điều dưỡng "
                    placeholder="Vui lòng nhập tên"
                    fullWidth
                    variant="bordered"
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleChange}
                    style={{ fontSize: 20 }}
                    classNames={{
                      label:
                        "text-[20px] mb-2 text-black/50 dark:text-white/90",
                      input: [
                        "bg-transparent",
                        "text-black/90 dark:text-white/90",
                        "placeholder:text-default-700/50 dark:placeholder:text-white/60",
                      ],
                    }}
                  />
                  <Input
                    label="Số điện thoại"
                    placeholder="Vui lòng nhập số điện thoại"
                    fullWidth
                    variant="bordered"
                    name="phone_number"
                    value={formData.phone_number}
                    onChange={handleChange}
                    style={{ fontSize: 20 }}
                    classNames={{
                      label:
                        "text-[20px] mb-2 text-black/50 dark:text-white/90",
                      input: [
                        "bg-transparent",
                        "text-black/90 dark:text-white/90",
                        "placeholder:text-default-700/50 dark:placeholder:text-white/60",
                      ],
                    }}
                  />
                  <div
                    style={{
                      display: "flex",
                      gap: "1rem",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Button
                      size="lg"
                      onPress={handleConfirm}
                      startContent={<Lightning />}
                      style={{
                        color: "#FFF",
                        background: "gold",
                        fontSize: 20,
                      }}
                    >
                      Tìm kiếm
                    </Button>
                    <Button
                      color="danger"
                      onPress={handleClear}
                      size="lg"
                      style={{
                        color: "#FFF",
                        fontSize: 20,
                        background: "#ccc",
                      }}
                    >
                      Xóa tìm kiếm
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        }
        bottomContent={
          <div className="flex w-full justify-center">
            <Pagination
              size="lg"
              isCompact
              showControls
              showShadow
              color="secondary"
              page={page}
              total={pages}
              onChange={(page) => setPage(page)}
            />
          </div>
        }
        classNames={{
          wrapper: "min-h-[400px]",
        }}
      >
        <TableHeader>
          <TableColumn className="text-lg">ID</TableColumn>
          <TableColumn className="text-lg">Ảnh điều dưỡng</TableColumn>
          <TableColumn className="text-lg">Tên điều dưỡng</TableColumn>
          <TableColumn className="text-lg">Số điện thoại</TableColumn>
        </TableHeader>
        <TableBody emptyContent={"Không có thông tin điều dưỡng"}>
          {items.map((item, index) => (
            <TableRow
              key={item.user_id}
              onDoubleClick={() => handleRowDoubleClick(item)}
              style={{ cursor: "pointer" }}
            >
              <TableCell style={{ fontSize: 18 }}>{index + 1}</TableCell>
              <TableCell>
                <Avatar
                  isBordered
                  src={item.avatar}
                  className="w-20 h-20"
                  radius="md"
                />
              </TableCell>
              <TableCell style={{ fontSize: 18 }}>{item.full_name}</TableCell>
              <TableCell style={{ fontSize: 18 }}>
                {item.phone_number}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Modal
        isOpen={createModalOpen}
        onClose={handleCreateModalClose}
        style={{ maxWidth: "80vw", width: "100%" }}
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1 text-xl">
            Tạo điều dưỡng mới
          </ModalHeader>
          <ModalBody>
            <div className="flex flex-row gap-4 w-full">
              <div className="flex flex-col items-center gap-2 my-auto ">
                <Avatar
                  isBordered
                  radius="lg"
                  color="primary"
                  showFallback
                  src={previewAvatar || "../../../public/Login.png"}
                  className="w-40 h-40 cursor-pointer "
                  onClick={handleAvatarClick}
                />
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={handleAvatarChange}
                />
                <Button
                  size="sm"
                  variant="light"
                  onClick={handleAvatarClick}
                  style={{ fontSize: 20 }}
                >
                  Chọn ảnh đại diện
                </Button>
              </div>
              <div className="flex-1 space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <Input
                    label="Tên đăng nhập"
                    variant="bordered"
                    size="lg"
                    value={createFormData.name}
                    color={formErrors.name ? "danger" : "default"}
                    isInvalid={!!formErrors.name}
                    errorMessage={formErrors.name}
                    onChange={(e) =>
                      handleCreateFormChange("name", e.target.value)
                    }
                    {...inputStyles}
                  />
                  <Input
                    label="Mật khẩu"
                    variant="bordered"
                    size="lg"
                    value={createFormData.password}
                    color={formErrors.password ? "danger" : "default"}
                    isInvalid={!!formErrors.password}
                    errorMessage={formErrors.password}
                    onChange={(e) =>
                      handleCreateFormChange("password", e.target.value)
                    }
                    {...inputStyles}
                  />
                  <Input
                    label="Họ và tên điều dưỡng"
                    variant="bordered"
                    size="lg"
                    value={createFormData.full_name}
                    color={formErrors.full_name ? "danger" : "default"}
                    isInvalid={!!formErrors.full_name}
                    errorMessage={formErrors.full_name}
                    onChange={(e) =>
                      handleCreateFormChange("full_name", e.target.value)
                    }
                    {...inputStyles}
                  />
                  <Input
                    label="Email"
                    variant="bordered"
                    size="lg"
                    value={createFormData.email}
                    color={formErrors.email ? "danger" : "default"}
                    isInvalid={!!formErrors.email}
                    errorMessage={formErrors.email}
                    onChange={(e) =>
                      handleCreateFormChange("email", e.target.value)
                    }
                    {...inputStyles}
                  />
                  <Input
                    label="Mã Căn cước công dân"
                    variant="bordered"
                    size="lg"
                    value={createFormData.citizen_id}
                    color={formErrors.citizen_id ? "danger" : "default"}
                    isInvalid={!!formErrors.citizen_id}
                    errorMessage={formErrors.citizen_id}
                    onChange={(e) =>
                      handleCreateFormChange("citizen_id", e.target.value)
                    }
                    {...inputStyles}
                  />
                  <Input
                    label="Nơi làm việc hiện tại"
                    variant="bordered"
                    size="lg"
                    value={createFormData.current_workplace}
                    color={formErrors.current_workplace ? "danger" : "default"}
                    isInvalid={!!formErrors.current_workplace}
                    errorMessage={formErrors.current_workplace}
                    onChange={(e) =>
                      handleCreateFormChange(
                        "current_workplace",
                        e.target.value
                      )
                    }
                    {...inputStyles}
                  />

                  <Input
                    label="Số điện thoại"
                    variant="bordered"
                    size="lg"
                    value={createFormData.phone_number}
                    color={formErrors.phone_number ? "danger" : "default"}
                    isInvalid={!!formErrors.phone_number}
                    errorMessage={formErrors.phone_number}
                    onChange={(e) =>
                      handleCreateFormChange("phone_number", e.target.value)
                    }
                    {...inputStyles}
                  />
                  <Input
                    label="Slogan"
                    variant="bordered"
                    size="lg"
                    value={createFormData.slogan}
                    color={formErrors.slogan ? "danger" : "default"}
                    isInvalid={!!formErrors.slogan}
                    errorMessage={formErrors.slogan}
                    onChange={(e) =>
                      handleCreateFormChange("slogan", e.target.value)
                    }
                    {...inputStyles}
                  />
                  <Input
                    label="Trình độ học vấn"
                    variant="bordered"
                    size="lg"
                    value={createFormData.education_level}
                    color={formErrors.education_level ? "danger" : "default"}
                    isInvalid={!!formErrors.education_level}
                    errorMessage={formErrors.education_level}
                    onChange={(e) =>
                      handleCreateFormChange("education_level", e.target.value)
                    }
                    {...inputStyles}
                  />
                  <Input
                    label="Kinh nghiệm làm việc (năm)"
                    variant="bordered"
                    type="number"
                    size="lg"
                    value={createFormData.work_experience}
                    color={formErrors.work_experience ? "danger" : "default"}
                    isInvalid={!!formErrors.work_experience}
                    errorMessage={formErrors.work_experience}
                    {...inputStyles}
                    endContent={
                      <div className="pointer-events-none flex items-center">
                        <span className="text-default-400 text-small font-bold">
                          năm
                        </span>
                      </div>
                    }
                    onChange={(e) =>
                      handleCreateFormChange("work_experience", e.target.value)
                    }
                  />
                  <Input
                    label="Chứng chỉ"
                    variant="bordered"
                    size="lg"
                    value={createFormData.certificate}
                    color={formErrors.certificate ? "danger" : "default"}
                    isInvalid={!!formErrors.certificate}
                    errorMessage={formErrors.certificate}
                    {...inputStyles}
                    onChange={(e) =>
                      handleCreateFormChange("certificate", e.target.value)
                    }
                  />
                  <Input
                    label="Chuyên môn"
                    variant="bordered"
                    size="lg"
                    value={createFormData.expertise}
                    color={formErrors.expertise ? "danger" : "default"}
                    isInvalid={!!formErrors.expertise}
                    errorMessage={formErrors.expertise}
                    {...inputStyles}
                    onChange={(e) =>
                      handleCreateFormChange("expertise", e.target.value)
                    }
                  />
                  <Select
                    label="Dịch vụ"
                    placeholder="Chọn dịch vụ"
                    size="lg"
                    selectionMode="multiple"
                    variant="underlined"
                    {...inputStyles}
                    className="max-w-full"
                    value={createFormData.techniques}
                    isInvalid={!!formErrors.expertise}
                    errorMessage={formErrors.expertise}
                    onChange={(e) =>
                      handleCreateFormChange(
                        "techniques",
                        e.target.value.split(",")
                      )
                    }
                  >
                    {techniques.map((technique) => (
                      <SelectItem key={technique.id} value={technique.id}>
                        {technique.name}
                      </SelectItem>
                    ))}
                  </Select>
                </div>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              color="danger"
              variant="light"
              onPress={handleCreateModalClose}
              className="text-lg font-bold"
              size="lg"

            >
              Hủy
            </Button>
            <Button
              isLoading={loading}
              size="lg"
              className="bg-indigo-700 text-white text-lg font-bold"
              onPress={handleCreateSubmit}
            >
              Tạo điều dưỡng
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default NurseTable;
