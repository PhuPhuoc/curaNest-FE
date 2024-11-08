// components/ProfileDrawer.tsx
import React, { useState } from "react";
import { Avatar, Col, Divider, Drawer, List, Row } from "antd";
import Link from "next/link";
import { Button, Chip } from "@nextui-org/react";

interface DescriptionItemProps {
  title: string;
  content: React.ReactNode;
}

const DescriptionItem = ({ title, content }: DescriptionItemProps) => (
  <div className="site-description-item-profile-wrapper">
    <p className="site-description-item-profile-p-label mb-4 mr-2 font-bold text-base">
      {title}: <span className="font-normal">{content}</span>
    </p>
  </div>
);

interface ProfileDrawerProps {
  open: boolean;
  onClose: () => void;
}

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

const ProfileNurse: React.FC<ProfileDrawerProps> = ({ open, onClose }) => {
  return (
    <>
      <Drawer
        width={620}
        placement="right"
        closable={false}
        onClose={onClose}
        open={open}
      >
        {/* <p className="text-xl font-bold mb-4">Thông tin điều dưỡng</p> */}

        {/* Centered Avatar */}
        <div className="flex justify-center mb-2">
          <Avatar
            src="https://i.pravatar.cc/150?u=a04258114e29026708c"
            className="w-28 h-28"
          />
        </div>

        <div className="flex justify-center mb-8">
          <p className="text-xl font-bold">Nguyễn Thị A</p>
        </div>

        <Row>
          <Col span={12}>
            <DescriptionItem title="Số điện thoại" content="0974832634" />
          </Col>
          <Col span={12}>
            <DescriptionItem
              title="Tài khoản"
              content="nguyenthia@example.com"
            />
          </Col>
        </Row>

        <Row>
          <Col span={12}>
            <DescriptionItem title="Căn cước công dân" content="079303000288" />
          </Col>
          <Col span={12}>
            <DescriptionItem title="Ngày sinh" content="25/02/1990" />
          </Col>
        </Row>

        <Row>
          <Col span={24}>
            <DescriptionItem
              title="Châm ngôn sống"
              content="Tận tâm và chuyên nghiệp trong việc chăm sóc bệnh nhân, luôn đặt lợi ích của bệnh nhân lên hàng đầu."
            />
          </Col>
        </Row>

        <Divider />

        <p className="site-description-item-profile-p font-bold text-lg mb-4">
          Trình độ làm việc
        </p>
        <Row>
          <Col span={24}>
            <DescriptionItem
              title="Học vấn"
              content="Cử nhân Điều dưỡng - Đại học Y Hà Nội"
            />
          </Col>
        </Row>

        <Row>
          <Col span={24}>
            <DescriptionItem
              title="Kinh nghiệm làm việc"
              content="5 năm kinh nghiệm tại Bệnh viện Bạch Mai"
            />
          </Col>
        </Row>

        <Row>
          <Col span={24}>
            <DescriptionItem
              title="Chứng chỉ"
              content="Điều dưỡng viên (2018), Sơ cấp cứu (2018)"
            />
          </Col>
        </Row>

        <div className="flex gap-2 flex-wrap">
          <DescriptionItem
            title="Kỹ năng đăng ký làm việc ở curanest"
            content=""
          />
          {services.map((service, index) => (
            <Chip
              key={index}
              className={`${service.color} ${service.textColor}`}
            >
              {service.name}
            </Chip>
          ))}
        </div>

        <div className="flex justify-center mt-5">
          <Button href="/login" color="danger" size="md" className="font-bold">
            Đăng xuất
          </Button>
        </div>
      </Drawer>
    </>
  );
};

export default ProfileNurse;
