"use client";

import nurseApiRequest from "@/apiRequests/nurse/nurse";
import techniqueApiRequest from "@/apiRequests/technique/technique";
import Lightning from "@/app/Icon/Lightning";
import Plus from "@/app/Icon/Plus";
import { Nurse } from "@/types/nurse";
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
interface FormData {
  name: string;
  citizenID: string;
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

interface CreateNurseData {
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

const NurseTable = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewAvatar, setPreviewAvatar] = useState<string | null>(null);
  const router = useRouter();
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    citizenID: "",
  });

  const [loading, setLoading] = useState(false);
  const [nurseList, setNurseList] = useState<Nurse[]>([]);
  const [techniques, setTechniques] = useState<Technique[]>([]);

  async function fetchTechniques() {
    setLoading(true);
    try {
      const response = await techniqueApiRequest.getTechnique();
      setTechniques(response.payload.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching techniques:", error);
      setLoading(false);
    }
  }

  async function fetchNurseList() {
    setLoading(true);
    try {
      const response = await nurseApiRequest.listNurse();
      setNurseList(response.payload.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching NurseList:", error);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchNurseList();
  }, []);

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [createFormData, setCreateFormData] = useState<CreateNurseData>({
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

  const [editFormData, setEditFormData] = useState<CreateNurseData>({
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

  const handleEditModalOpen = (nurse: NurseData) => {
    setEditFormData({
      avatar: nurse.avatar,
      certificate: nurse.certificate,
      citizen_id: nurse.citizen_id,
      current_workplace: nurse.current_workplace,
      education_level: nurse.education_level,
      email: nurse.email,
      expertise: nurse.expertise,
      full_name: nurse.full_name,
      name: nurse.name,
      password: nurse.password,
      phone_number: nurse.phone_number,
      slogan: nurse.slogan,
      techniques: nurse.techniques,
      work_experience: nurse.work_experience,
    });
    setEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setEditModalOpen(false);
  };

  const handleEditSubmit = () => {
    console.log("Editing nurse with data:", editFormData);
    setEditModalOpen(false);
  };

  const handleEditFormChange = (
    field: keyof CreateNurseData,
    value: string | string[] | number
  ) => {
    setEditFormData((prev) => ({
      ...prev,
      [field]: typeof value === "string" ? parseFloat(value) : value,
    }));
  };

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
    setPreviewAvatar(null);
  };

  const handleCreateSubmit = () => {
    console.log("Creating new nurse with data:", createFormData);
    handleCreateModalClose();
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
      // Validate file type
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
        handleEditFormChange("avatar", base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleConfirm = () => {
    console.log("Confirm clicked with data:", formData);
  };

  const handleClear = () => {
    setFormData({ name: "", citizenID: "" });
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
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    style={{ fontSize: 20 }}
                    classNames={{ label: "text-[20px]  font-bold mb-2" }}
                  />
                  <Input
                    label="Mã căn cước công dân"
                    placeholder="Vui lòng nhập mã căn cước công dân"
                    fullWidth
                    variant="bordered"
                    name="citizenID"
                    value={formData.citizenID}
                    onChange={handleChange}
                    style={{ fontSize: 20 }}
                    classNames={{ label: "text-[20px] font-bold mb-2" }}
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
          <TableColumn className="text-lg">Nơi hiện tại làm việc</TableColumn>
          {/* <TableColumn className="text-lg">Hành động</TableColumn> */}
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
                {item.current_workplace}
              </TableCell>
              {/* <TableCell>
                <Button
                  color="warning"
                  style={{
                    color: "#FFF",
                    marginRight: 10,
                    fontSize: 18,
                    fontWeight: 700,
                    padding: "1.5rem",
                  }}
                  onClick={() => handleEditModalOpen(item)}
                >
                  Sửa thông tin
                </Button>
              </TableCell> */}
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
          <ModalHeader className="flex flex-col gap-1">
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
                    placeholder="Vui lòng nhập tên đăng nhập"
                    variant="bordered"
                    value={createFormData.name}
                    onChange={(e) =>
                      handleCreateFormChange("name", e.target.value)
                    }
                    style={{ fontSize: 18 }}
                    classNames={{ label: "text-[16px] font-bold mb-2" }}
                  />
                  <Input
                    label="Mật khẩu"
                    placeholder="Vui lòng nhập mật khẩu"
                    variant="bordered"
                    value={createFormData.password}
                    onChange={(e) =>
                      handleCreateFormChange("password", e.target.value)
                    }
                    style={{ fontSize: 18 }}
                    classNames={{ label: "text-[16px] font-bold mb-2" }}
                  />
                  <Input
                    label="Họ và tên điều dưỡng"
                    placeholder="Vui lòng nhập tên điều dưỡng"
                    variant="bordered"
                    value={createFormData.full_name}
                    onChange={(e) =>
                      handleCreateFormChange("full_name", e.target.value)
                    }
                    style={{ fontSize: 18 }}
                    classNames={{ label: "text-[16px] font-bold mb-2" }}
                  />
                  <Input
                    label="Email"
                    placeholder="Vui lòng nhập email"
                    variant="bordered"
                    value={createFormData.email}
                    onChange={(e) =>
                      handleCreateFormChange("email", e.target.value)
                    }
                    style={{ fontSize: 18 }}
                    classNames={{ label: "text-[16px] font-bold mb-2" }}
                  />
                  <Input
                    label="Mã Căn cước công dân"
                    placeholder="Vui lòng nhập mã CCCD"
                    variant="bordered"
                    value={createFormData.citizen_id}
                    onChange={(e) =>
                      handleCreateFormChange("citizen_id", e.target.value)
                    }
                    style={{ fontSize: 18 }}
                    classNames={{ label: "text-[16px] font-bold mb-2" }}
                  />
                  <Input
                    label="Nơi làm việc hiện tại"
                    placeholder="Vui lòng nhập nơi làm việc hiện tại"
                    variant="bordered"
                    value={createFormData.current_workplace}
                    onChange={(e) =>
                      handleCreateFormChange(
                        "current_workplace",
                        e.target.value
                      )
                    }
                    style={{ fontSize: 18 }}
                    classNames={{ label: "text-[16px] font-bold mb-2" }}
                  />

                  <Input
                    label="Số điện thoại"
                    placeholder="Vui lòng nhập số điện thoại"
                    variant="bordered"
                    value={createFormData.phone_number}
                    onChange={(e) =>
                      handleCreateFormChange("phone_number", e.target.value)
                    }
                    style={{ fontSize: 18 }}
                    classNames={{ label: "text-[16px] font-bold mb-2" }}
                  />
                  <Input
                    label="Slogan"
                    placeholder="Nhập slogan"
                    variant="bordered"
                    value={createFormData.slogan}
                    onChange={(e) =>
                      handleCreateFormChange("slogan", e.target.value)
                    }
                    style={{ fontSize: 18 }}
                    classNames={{ label: "text-[16px] font-bold mb-2" }}
                  />
                  <Input
                    label="Trình độ học vấn"
                    placeholder="Nhập trình độ học vấn"
                    variant="bordered"
                    value={createFormData.education_level}
                    onChange={(e) =>
                      handleCreateFormChange("education_level", e.target.value)
                    }
                    classNames={{ label: "text-[16px] font-bold mb-2" }}
                    style={{ fontSize: 18 }}
                  />
                  <Input
                    label="Kinh nghiệm làm việc (năm)"
                    placeholder="Nhập số năm kinh nghiệm"
                    variant="bordered"
                    type="number"
                    value={createFormData.work_experience}
                    classNames={{ label: "text-[16px] font-bold mb-2" }}
                    style={{ fontSize: 18 }}
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
                    placeholder="Nhập các chứng chỉ"
                    variant="bordered"
                    value={createFormData.certificate}
                    classNames={{ label: "text-[16px] font-bold mb-2" }}
                    style={{ fontSize: 18 }}
                    onChange={(e) =>
                      handleCreateFormChange("certificate", e.target.value)
                    }
                  />
                  <Input
                    label="Chuyên môn"
                    placeholder="Nhập chuyên môn"
                    variant="bordered"
                    value={createFormData.expertise}
                    classNames={{ label: "text-[16px] font-bold mb-2" }}
                    style={{ fontSize: 18 }}
                    onChange={(e) =>
                      handleCreateFormChange("expertise", e.target.value)
                    }
                  />
                  <Select
                    label="Dịch vụ"
                    placeholder="Chọn dịch vụ"
                    selectionMode="multiple"
                    classNames={{ label: "text-[16px] font-bold mb-2" }}
                    style={{ fontSize: 18 }}
                    className="max-w-full"
                    value={createFormData.techniques}
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
              className="text-md font-bold"
            >
              Hủy
            </Button>
            <Button
              className="bg-indigo-700 text-white text-md font-bold"
              onPress={handleCreateSubmit}
            >
              Tạo điều dưỡng
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={editModalOpen} onClose={handleEditModalClose} size="2xl">
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1 ">
            Chỉnh sửa thông tin điều dưỡng
          </ModalHeader>
          <ModalBody>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col items-center gap-2">
                <Avatar
                  isBordered
                  radius="lg"
                  color="warning"
                  showFallback
                  src={editFormData?.avatar || "../../../public/Login.png"}
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
                  className="text-xl"
                >
                  Chọn ảnh đại diện
                </Button>
              </div>
              <Input
                label="Họ và tên điều dưỡng"
                placeholder="Vui lòng nhập tên điều dưỡng"
                variant="bordered"
                value={editFormData.full_name}
                onChange={(e) =>
                  handleEditFormChange("full_name", e.target.value)
                }
                style={{ fontSize: 18 }}
                classNames={{ label: "text-[16px] font-bold mb-2" }}
              />
              <Input
                label="Mã Căn cước công dân"
                placeholder="Vui lòng nhập mã CCCD"
                variant="bordered"
                value={editFormData.citizen_id}
                onChange={(e) =>
                  handleEditFormChange("citizen_id", e.target.value)
                }
                style={{ fontSize: 18 }}
                classNames={{ label: "text-[16px] font-bold mb-2" }}
              />
              <Input
                label="Nơi làm việc hiện tại"
                placeholder="Vui lòng nhập nơi làm việc hiện tại"
                variant="bordered"
                value={editFormData.current_workplace}
                onChange={(e) =>
                  handleEditFormChange("current_workplace", e.target.value)
                }
                style={{ fontSize: 18 }}
                classNames={{ label: "text-[16px] font-bold mb-2" }}
              />
              <Input
                label="Email"
                placeholder="Vui lòng nhập email"
                variant="bordered"
                value={editFormData.email}
                onChange={(e) => handleEditFormChange("email", e.target.value)}
                style={{ fontSize: 18 }}
                classNames={{ label: "text-[16px] font-bold mb-2" }}
              />
              <Input
                label="Số điện thoại"
                placeholder="Vui lòng nhập số điện thoại"
                variant="bordered"
                value={editFormData.phone_number}
                onChange={(e) =>
                  handleEditFormChange("phone_number", e.target.value)
                }
                style={{ fontSize: 18 }}
                classNames={{ label: "text-[16px] font-bold mb-2" }}
              />
              <Input
                label="Slogan"
                placeholder="Nhập slogan"
                variant="bordered"
                value={editFormData.slogan}
                onChange={(e) => handleEditFormChange("slogan", e.target.value)}
                style={{ fontSize: 18 }}
                classNames={{ label: "text-[16px] font-bold mb-2" }}
              />
              <Input
                label="Trình độ học vấn"
                placeholder="Nhập trình độ học vấn"
                variant="bordered"
                value={editFormData.education_level}
                onChange={(e) =>
                  handleEditFormChange("education_level", e.target.value)
                }
                classNames={{ label: "text-[16px] font-bold mb-2" }}
                style={{ fontSize: 18 }}
              />
              <Input
                label="Kinh nghiệm làm việc (năm)"
                placeholder="Nhập số năm kinh nghiệm"
                variant="bordered"
                type="number"
                value={editFormData.work_experience}
                classNames={{ label: "text-[16px] font-bold mb-2" }}
                style={{ fontSize: 18 }}
                endContent={
                  <div className="pointer-events-none flex items-center">
                    <span className="text-default-400 text-small font-bold">
                      năm
                    </span>
                  </div>
                }
                onChange={(e) =>
                  handleEditFormChange("work_experience", e.target.value)
                }
              />
              <Input
                label="Chứng chỉ"
                placeholder="Nhập các chứng chỉ"
                variant="bordered"
                value={editFormData.certificate}
                classNames={{ label: "text-[16px] font-bold mb-2" }}
                style={{ fontSize: 18 }}
                onChange={(e) =>
                  handleEditFormChange("certificate", e.target.value)
                }
              />
              <Input
                label="Chuyên môn"
                placeholder="Nhập chuyên môn"
                variant="bordered"
                value={editFormData.expertise}
                classNames={{ label: "text-[16px] font-bold mb-2" }}
                style={{ fontSize: 18 }}
                onChange={(e) =>
                  handleEditFormChange("expertise", e.target.value)
                }
              />
              {/* <Select
          label="Kỹ thuật"
          placeholder="Chọn kỹ thuật"
          selectionMode="multiple"
          classNames={{ label: "text-[16px] font-bold mb-2" }}
          style={{ fontSize: 18 }}
          className="max-w-full"
          value={editFormData.techniques}
          onChange={(e) => handleEditFormChange("techniques", e.target.value.split(","))}
        >
          {techniqueOptions.map((technique) => (
            <SelectItem key={technique.value} value={technique.value}>
              {technique.label}
            </SelectItem>
          ))}
        </Select> */}
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              color="danger"
              variant="light"
              onPress={handleEditModalClose}
              className="font-bold text-md"
            >
              Hủy
            </Button>
            <Button
              color="warning"
              className="text-white font-bold text-md"
              onPress={handleEditSubmit}
            >
              Lưu
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default NurseTable;
