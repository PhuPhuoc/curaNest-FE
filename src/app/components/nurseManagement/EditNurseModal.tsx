import React, { useRef, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Select,
  SelectItem,
  Avatar,
} from "@nextui-org/react";
import { CreateNurseData } from "@/app/components/nurseManagement/CreateNurseModal";

export interface EditNurseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateNurseData) => void;
  initialData: CreateNurseData;
  skillOptions: Array<{ label: string; value: string }>;
}

const EditNurseModal: React.FC<EditNurseModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  skillOptions,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState<CreateNurseData>(initialData);

  const handleFormChange = (
    field: keyof CreateNurseData,
    value: string | string[] | number
  ) => {
    setFormData((prev) => ({
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
        handleFormChange("avatar", base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalContent>
        <ModalHeader>Chỉnh sửa thông tin điều dưỡng</ModalHeader>
        <ModalBody>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col items-center gap-2">
              <Avatar
                isBordered
                radius="lg"
                color="primary"
                showFallback
                src={formData.avatar || "../../../public/Login.png"}
                className="w-40 h-40 cursor-pointer"
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
              value={formData.name}
              onChange={(e) => handleFormChange("name", e.target.value)}
            />
            <Input
              label="Trình độ học vấn"
              placeholder="Nhập trình độ học vấn"
              variant="bordered"
              value={formData.education}
              onChange={(e) => handleFormChange("education", e.target.value)}
            />
            <Input
              label="Kinh nghiệm làm việc (năm)"
              placeholder="Nhập số năm kinh nghiệm"
              variant="bordered"
              type="number"
              value={formData.experience.toString()}
              endContent={
                <div className="pointer-events-none flex items-center">
                  <span className="text-default-400 text-small">năm</span>
                </div>
              }
              onChange={(e) =>
                handleFormChange("experience", parseFloat(e.target.value))
              }
            />
            <Input
              label="Chứng chỉ"
              placeholder="Nhập các chứng chỉ"
              variant="bordered"
              value={formData.certifications}
              onChange={(e) =>
                handleFormChange("certifications", e.target.value)
              }
            />
            <Select
              label="Kỹ năng"
              placeholder="Chọn kỹ năng"
              selectionMode="multiple"
              className="max-w-full"
              value={formData.skills}
              onChange={(e) =>
                handleFormChange("skills", e.target.value.split(","))
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
          <Button color="danger" variant="light" onPress={onClose}>
            Hủy
          </Button>
          <Button color="primary" onPress={() => onSubmit(formData)}>
            Lưu
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditNurseModal;
