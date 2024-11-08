"use client";

import Review from "@/app/components/findingNurse/Review";
import Timetable from "@/app/components/findingNurse/TimeTable";
import Lightning from "@/app/Icon/Lightning";
import Plus from "@/app/Icon/Plus";
import {
  Accordion,
  Button,
  Input,
  Table,
  Avatar,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  AccordionItem,
  Pagination,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Select,
  SelectItem,
  ModalFooter,
  Tooltip,
} from "@nextui-org/react";
import { FloatButton } from "antd";
import { useMemo, useRef, useState } from "react";
interface FormData {
  name: string;
  citizenID: string;
}

interface NurseData {
  id: number;
  avatar: string;
  name: string;
  citizenID: string;
  education: string;
  experience: number;
  certifications: string;
  skills: string[];
}

interface CreateNurseData {
  avatar: string | null;
  name: string;
  education: string;
  experience: number;
  certifications: string;
  skills: string[];
}

const NurseTable: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewAvatar, setPreviewAvatar] = useState<string | null>(null);
  const [selectedNurse, setSelectedNurse] = useState<NurseData | null>(null);
  const [infoModalOpen, setInfoModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    citizenID: "",
  });

  const [createModalOpen, setCreateModalOpen] = useState(false);

  const [createFormData, setCreateFormData] = useState<CreateNurseData>({
    avatar: null,
    name: "",
    education: "",
    experience: 1,
    certifications: "",
    skills: [],
  });

  const [editFormData, setEditFormData] = useState<CreateNurseData>({
    avatar: null,
    name: "",
    education: "",
    experience: 1,
    certifications: "",
    skills: [],
  });

  const handleEditModalOpen = (nurse: NurseData) => {
    setEditFormData({
      avatar: nurse.avatar,
      name: nurse.name,
      education: nurse.education,
      experience: nurse.experience,
      certifications: nurse.certifications,
      skills: nurse.skills,
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
      [field]:
        typeof value === "string" && field === "experience"
          ? parseFloat(value)
          : value,
    }));
  };

  const handleTimetableSubmit = (selectedSlots: string[]) => {
    console.log("Selected time slots:", selectedSlots);
  };
  
  const handleRowDoubleClick = (nurse: NurseData) => {
    const additionalInfo = {
      education: "Bachelor of Nursing",
      experience: 3,
      certifications: "CPR, BLS",
      skills: ["elderly-care", "emergency-care"],
    };

    setSelectedNurse({ ...nurse, ...additionalInfo });
    setInfoModalOpen(true);
  };

  const closeInfoModal = () => {
    setInfoModalOpen(false);
    setSelectedNurse(null);
  };

  const skillOptions = [
    { label: "Chăm sóc người già", value: "elderly-care" },
    { label: "Chăm sóc trẻ em", value: "pediatric-care" },
    { label: "Phục hồi chức năng", value: "rehabilitation" },
    { label: "Cấp cứu", value: "emergency-care" },
    { label: "Chăm sóc đặc biệt", value: "intensive-care" },
    { label: "Tiêm truyền", value: "injection-infusion" },
  ];

  const dummyData: NurseData[] = useMemo(
    () => [
      {
        id: 1,
        avatar: "https://i.pravatar.cc/150?u=1",
        name: "Alice Johnson",
        citizenID: "123456789",
        education: "Cử nhân Điều dưỡng - ĐH Y Hà Nội",
        experience: 5,
        certifications: "Chứng chỉ Hồi sức cấp cứu, Chứng chỉ Gây mê hồi sức",
        skills: ["elderly-care", "emergency-care", "intensive-care"],
      },
      {
        id: 2,
        avatar: "https://i.pravatar.cc/150?u=2",
        name: "Bob Smith",
        citizenID: "987654321",
        education: "Thạc sĩ Điều dưỡng - ĐH Y Dược TP.HCM",
        experience: 8,
        certifications:
          "Chứng chỉ Chăm sóc đặc biệt, Chứng chỉ Phục hồi chức năng",
        skills: ["pediatric-care", "rehabilitation", "injection-infusion"],
      },
      {
        id: 3,
        avatar: "https://i.pravatar.cc/150?u=3",
        name: "Charlie Brown",
        citizenID: "456789123",
        education: "Cử nhân Điều dưỡng - ĐH Y Dược Huế",
        experience: 3,
        certifications: "Chứng chỉ Chăm sóc người già, Chứng chỉ Tiêm truyền",
        skills: ["elderly-care", "injection-infusion"],
      },
      {
        id: 4,
        avatar: "https://i.pravatar.cc/150?u=4",
        name: "Diana Prince",
        citizenID: "321654987",
        education: "Cao đẳng Điều dưỡng - CĐ Y Hà Nội",
        experience: 2,
        certifications: "Chứng chỉ Chăm sóc trẻ em",
        skills: ["pediatric-care", "injection-infusion"],
      },
      {
        id: 5,
        avatar: "https://i.pravatar.cc/150?u=5",
        name: "Ethan Hunt",
        citizenID: "789123456",
        education: "Thạc sĩ Điều dưỡng - ĐH Y Hà Nội",
        experience: 10,
        certifications:
          "Chứng chỉ Hồi sức cấp cứu, Chứng chỉ Chăm sóc đặc biệt",
        skills: ["emergency-care", "intensive-care", "injection-infusion"],
      },
      {
        id: 6,
        avatar: "https://i.pravatar.cc/150?u=6",
        name: "Fiona Glenanne",
        citizenID: "654321987",
        education: "Cử nhân Điều dưỡng - ĐH Y Dược Cần Thơ",
        experience: 4,
        certifications: "Chứng chỉ Phục hồi chức năng",
        skills: ["rehabilitation", "elderly-care"],
      },
      {
        id: 7,
        avatar: "https://i.pravatar.cc/150?u=7",
        name: "George Mason",
        citizenID: "987123654",
        education: "Cao đẳng Điều dưỡng - CĐ Y Đà Nẵng",
        experience: 3,
        certifications: "Chứng chỉ Tiêm truyền, Chứng chỉ Chăm sóc người già",
        skills: ["elderly-care", "injection-infusion"],
      },
      {
        id: 8,
        avatar: "https://i.pravatar.cc/150?u=8",
        name: "Hannah Baker",
        citizenID: "123987654",
        education: "Cử nhân Điều dưỡng - ĐH Y Thái Bình",
        experience: 6,
        certifications: "Chứng chỉ Chăm sóc trẻ em, Chứng chỉ Hồi sức cấp cứu",
        skills: ["pediatric-care", "emergency-care"],
      },
      {
        id: 9,
        avatar: "https://i.pravatar.cc/150?u=9",
        name: "Ivan Drago",
        citizenID: "456123789",
        education: "Thạc sĩ Điều dưỡng - ĐH Y Dược TP.HCM",
        experience: 12,
        certifications: "Chứng chỉ Chăm sóc đặc biệt, Chứng chỉ Gây mê hồi sức",
        skills: ["intensive-care", "emergency-care", "injection-infusion"],
      },
      {
        id: 10,
        avatar: "https://i.pravatar.cc/150?u=10",
        name: "Julia Meade",
        citizenID: "789456123",
        education: "Cử nhân Điều dưỡng - ĐH Y Dược Huế",
        experience: 7,
        certifications:
          "Chứng chỉ Phục hồi chức năng, Chứng chỉ Chăm sóc người già",
        skills: ["rehabilitation", "elderly-care"],
      },
      {
        id: 11,
        avatar: "https://i.pravatar.cc/150?u=11",
        name: "Kevin Malone",
        citizenID: "321987654",
        education: "Cao đẳng Điều dưỡng - CĐ Y Hà Nội",
        experience: 2,
        certifications: "Chứng chỉ Tiêm truyền",
        skills: ["injection-infusion"],
      },
      {
        id: 12,
        avatar: "https://i.pravatar.cc/150?u=12",
        name: "Laura Palmer",
        citizenID: "654789321",
        education: "Cử nhân Điều dưỡng - ĐH Y Hà Nội",
        experience: 5,
        certifications: "Chứng chỉ Chăm sóc trẻ em, Chứng chỉ Tiêm truyền",
        skills: ["pediatric-care", "injection-infusion"],
      },
      {
        id: 13,
        avatar: "https://i.pravatar.cc/150?u=13",
        name: "Michael Scott",
        citizenID: "789321654",
        education: "Thạc sĩ Điều dưỡng - ĐH Y Dược TP.HCM",
        experience: 15,
        certifications:
          "Chứng chỉ Hồi sức cấp cứu, Chứng chỉ Chăm sóc đặc biệt",
        skills: ["emergency-care", "intensive-care"],
      },
      {
        id: 14,
        avatar: "https://i.pravatar.cc/150?u=14",
        name: "Nina Myers",
        citizenID: "321456987",
        education: "Cử nhân Điều dưỡng - ĐH Y Dược Cần Thơ",
        experience: 4,
        certifications: "Chứng chỉ Phục hồi chức năng, Chứng chỉ Tiêm truyền",
        skills: ["rehabilitation", "injection-infusion"],
      },
    ],
    []
  );

  const [page, setPage] = useState(1);
  const rowsPerPage = 6;

  const pages = Math.ceil(dummyData.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return dummyData.slice(start, end);
  }, [page, dummyData]);

  const handleCreateModalOpen = () => {
    setCreateModalOpen(true);
  };

  const handleCreateModalClose = () => {
    setCreateModalOpen(false);
    setCreateFormData({
      avatar: null,
      name: "",
      education: "",
      experience: 1,
      certifications: "",
      skills: [],
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
      [field]:
        typeof value === "string" && field === "experience"
          ? parseFloat(value)
          : value,
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
      <FloatButton
        tooltip={<div>Tạo điều dưỡng</div>}
        type="primary"
        icon={<Plus />}
        style={{ fontSize: 50 }}
        onClick={handleCreateModalOpen}
      />

      <Accordion
        defaultExpandedKeys={"1"}
        variant="shadow"
        style={{ background: "#FFF", borderRadius: 25, marginBottom: 10 }}
      >
        <AccordionItem key="1" title="Tìm kiếm" style={{ padding: 6 }}>
          <div style={{ display: "flex", gap: 10 }}>
            <Input
              label="Tên"
              placeholder="Vui lòng nhập tên"
              fullWidth
              variant="bordered"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            <Input
              label="Mã căn cước công dân"
              placeholder="Vui lòng nhập mã căn cước công dân"
              fullWidth
              variant="bordered"
              name="citizenID"
              value={formData.citizenID}
              onChange={handleChange}
            />
            <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
              <Button
                onPress={handleConfirm}
                startContent={<Lightning />}
                style={{ color: "#FFF", background: "gold" }}
              >
                Tìm kiếm
              </Button>
              <Button color="danger" onPress={handleClear}>
                Xóa tìm kiếm
              </Button>
            </div>
          </div>
        </AccordionItem>
      </Accordion>

      <Table
        aria-label="Table"
        bottomContent={
          <div className="flex w-full justify-center">
            <Pagination
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
          wrapper: "min-h-[222px]",
        }}
      >
        <TableHeader>
          <TableColumn>ID</TableColumn>
          <TableColumn>Ảnh điều dưỡng</TableColumn>
          <TableColumn>Tên điều dưỡng</TableColumn>
          <TableColumn>Mã căn cước công dân</TableColumn>
          <TableColumn>Hành động</TableColumn>
        </TableHeader>
        <TableBody emptyContent={"Không có thông tin điều dưỡng"}>
          {items.map((item) => (
            <TableRow
              key={item.id}
              onDoubleClick={() => handleRowDoubleClick(item)}
            >
              <TableCell>{item.id}</TableCell>
              <TableCell>
                <Avatar src={item.avatar} />
              </TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.citizenID}</TableCell>
              <TableCell>
                <Button
                  color="warning"
                  style={{ color: "#FFF" }}
                  onClick={() => handleEditModalOpen(item)}
                >
                  Sửa thông tin
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Modal
        isOpen={createModalOpen}
        onClose={handleCreateModalClose}
        size="2xl"
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            Tạo điều dưỡng mới
          </ModalHeader>
          <ModalBody>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col items-center gap-2">
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
                <Button size="sm" variant="light" onClick={handleAvatarClick}>
                  Chọn ảnh đại diện
                </Button>
              </div>
              <Input
                label="Họ và tên điều dưỡng"
                placeholder="Vui lòng nhập tên điều dưỡng"
                variant="bordered"
                value={createFormData.name}
                onChange={(e) => handleCreateFormChange("name", e.target.value)}
              />
              <Input
                label="Trình độ học vấn"
                placeholder="Nhập trình độ học vấn"
                variant="bordered"
                value={createFormData.education}
                onChange={(e) =>
                  handleCreateFormChange("education", e.target.value)
                }
              />
              <Input
                label="Kinh nghiệm làm việc (năm)"
                placeholder="Nhập số năm kinh nghiệm"
                variant="bordered"
                type="number"
                value={createFormData.experience.toString()}
                endContent={
                  <div className="pointer-events-none flex items-center">
                    <span className="text-default-400 text-small">năm</span>
                  </div>
                }
                onChange={(e) =>
                  handleCreateFormChange(
                    "experience",
                    parseFloat(e.target.value)
                  )
                }
              />

              <Input
                label="Chứng chỉ"
                placeholder="Nhập các chứng chỉ"
                variant="bordered"
                value={createFormData.certifications}
                onChange={(e) =>
                  handleCreateFormChange("certifications", e.target.value)
                }
              />
              <Select
                label="Kỹ năng"
                placeholder="Chọn kỹ năng"
                selectionMode="multiple"
                className="max-w-full"
                value={createFormData.skills}
                onChange={(e) =>
                  handleCreateFormChange("skills", e.target.value.split(","))
                }
              >
                {skillOptions.map((skill) => (
                  <SelectItem key={skill.value} value={skill.value}>
                    {skill.label}
                  </SelectItem>
                ))}
              </Select>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              color="danger"
              variant="light"
              onPress={handleCreateModalClose}
            >
              Hủy
            </Button>
            <Button color="primary" onPress={handleCreateSubmit}>
              Tạo mới
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {selectedNurse && (
        <Modal
          isOpen={infoModalOpen}
          onClose={closeInfoModal}
          size="5xl"
          className="top-72"
        >
          <ModalContent>
            <ModalHeader>{selectedNurse.name}</ModalHeader>
            <ModalBody>
              <div className="flex flex-row items-center justify-evenly mb-6">
                <div>
                  <Avatar
                    src={selectedNurse.avatar}
                    className="w-72 h-72"
                    radius="md"
                  />
                </div>
                <div className=" flex flex-col" style={{ gap: 40 }}>
                  <p>
                    <strong>Họ và tên:</strong> {selectedNurse.name}
                  </p>
                  <p>
                    <strong>Mã CCCD:</strong> {selectedNurse.citizenID}
                  </p>
                  <p>
                    <strong>Học vẫn:</strong> {selectedNurse.education}
                  </p>
                  <p>
                    <strong>Kinh nghiệm:</strong> {selectedNurse.experience} năm
                  </p>
                  <p>
                    <strong>Chứng chỉ:</strong> {selectedNurse.certifications}
                  </p>
                  <p>
                    <strong>Kĩ năng:</strong> {selectedNurse.skills.join(", ")}
                  </p>
                </div>
              </div>
              <Timetable onSubmit={handleTimetableSubmit} />
              <Review />
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onPress={closeInfoModal}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}

      <Modal isOpen={editModalOpen} onClose={handleEditModalClose} size="2xl">
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            Chỉnh sửa thông tin điều dưỡng
          </ModalHeader>
          <ModalBody>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col items-center gap-2">
                <Avatar
                  isBordered
                  radius="lg"
                  color="primary"
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
                <Button size="sm" variant="light" onClick={handleAvatarClick}>
                  Chọn ảnh đại diện
                </Button>
              </div>
              <Input
                label="Họ và tên điều dưỡng"
                placeholder="Vui lòng nhập tên điều dưỡng"
                variant="bordered"
                value={editFormData.name}
                onChange={(e) => handleEditFormChange("name", e.target.value)}
              />
              <Input
                label="Trình độ học vấn"
                placeholder="Nhập trình độ học vấn"
                variant="bordered"
                value={editFormData.education}
                onChange={(e) =>
                  handleEditFormChange("education", e.target.value)
                }
              />
              <Input
                label="Kinh nghiệm làm việc (năm)"
                placeholder="Nhập số năm kinh nghiệm"
                variant="bordered"
                type="number"
                value={editFormData.experience.toString()}
                endContent={
                  <div className="pointer-events-none flex items-center">
                    <span className="text-default-400 text-small">năm</span>
                  </div>
                }
                onChange={(e) =>
                  handleEditFormChange("experience", parseFloat(e.target.value))
                }
              />
              <Input
                label="Chứng chỉ"
                placeholder="Nhập các chứng chỉ"
                variant="bordered"
                value={editFormData.certifications}
                onChange={(e) =>
                  handleEditFormChange("certifications", e.target.value)
                }
              />
              <Select
                label="Kỹ năng"
                placeholder="Chọn kỹ năng"
                selectionMode="multiple"
                className="max-w-full"
                value={editFormData.skills}
                onChange={(e) =>
                  handleEditFormChange("skills", e.target.value.split(","))
                }
              >
                {skillOptions.map((skill) => (
                  <SelectItem key={skill.value} value={skill.value}>
                    {skill.label}
                  </SelectItem>
                ))}
              </Select>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              color="danger"
              variant="light"
              onPress={handleEditModalClose}
            >
              Hủy
            </Button>
            <Button color="primary" onPress={handleEditSubmit}>
              Lưu
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default NurseTable;
