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
import Timetable from "@/app/components/findingNurse/TimeTable";
import Review from "@/app/components/findingNurse/Review";

export interface NurseData {
  id: number;
  avatar: string;
  name: string;
  citizenID: string;
  education: string;
  experience: number;
  certifications: string;
  skills: string[];
}

interface NurseDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  nurse: NurseData;
  onTimetableSubmit: (slots: string[]) => void;
}

const NurseDetailModal: React.FC<NurseDetailModalProps> = ({
  isOpen,
  onClose,
  nurse,
  onTimetableSubmit,
}) => {
  if (!nurse) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="5xl" className="top-72">
      <ModalContent>
        <ModalHeader>{nurse.name}</ModalHeader>
        <ModalBody>
          <div className="flex flex-row items-center justify-evenly mb-6">
            <div>
              <Avatar src={nurse.avatar} className="w-72 h-72" radius="md" />
            </div>
            <div className="flex flex-col" style={{ gap: 40 }}>
              <p>
                <strong>Họ và tên:</strong> {nurse.name}
              </p>
              <p>
                <strong>Mã CCCD:</strong> {nurse.citizenID}
              </p>
              <p>
                <strong>Học vấn:</strong> {nurse.education}
              </p>
              <p>
                <strong>Kinh nghiệm:</strong> {nurse.experience} năm
              </p>
              <p>
                <strong>Chứng chỉ:</strong> {nurse.certifications}
              </p>
              <p>
                <strong>Kĩ năng:</strong> {nurse.skills.join(", ")}
              </p>
            </div>
          </div>
          <Timetable onSubmit={onTimetableSubmit} />
          <Review />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onPress={onClose}>
            Đóng
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default NurseDetailModal;
