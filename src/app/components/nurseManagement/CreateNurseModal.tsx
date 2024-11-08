"use client";
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

export interface CreateNurseData {
  avatar: string | null;
  name: string;
  education: string;
  experience: number;
  certifications: string;
  skills: string[];
}

export interface CreateNurseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateNurseData) => void;
  skillOptions: Array<{ label: string; value: string }>;
}

const CreateNurseModal: React.FC<CreateNurseModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  skillOptions,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewAvatar, setPreviewAvatar] = useState<string | null>(null);
  const [formData, setFormData] = useState<CreateNurseData>({
    avatar: null,
    name: "",
    education: "",
    experience: 1,
    certifications: "",
    skills: [],
  });

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
        setPreviewAvatar(base64String);
        handleFormChange("avatar", base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClose = () => {
    setFormData({
      avatar: null,
      name: "",
      education: "",
      experience: 1,
      certifications: "",
      skills: [],
    });
    setPreviewAvatar(null);
    onClose();
  };

  const handleSubmit = () => {
    onSubmit(formData);
    handleClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="2xl">
      <ModalContent>
        <ModalHeader>Tạo điều dưỡng mới</ModalHeader>
        <ModalBody>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col items-center gap-2">
              <Avatar
                isBordered
                radius="lg"
                color="primary"
                showFallback
                src={previewAvatar || "../../../public/Login.png"}
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
          <Button color="danger" variant="light" onPress={handleClose}>
            Hủy
          </Button>
          <Button color="primary" onPress={handleSubmit}>
            Tạo mới
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateNurseModal;