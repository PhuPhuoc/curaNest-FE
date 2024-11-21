// components/ProfileDrawer.tsx
import React, { useEffect, useState } from "react";
import { Avatar, Col, Divider, Drawer, List, Row } from "antd";
import Link from "next/link";
import { Button, Chip } from "@nextui-org/react";
import { useAppContext } from "@/app/app-provider";
import { useRouter } from "next/navigation";
import techniqueApiRequest from "@/apiRequests/technique/technique";
import { Technique } from "@/types/technique";
import { DetailNurse } from "@/types/nurse";
import nurseApiRequest from "@/apiRequests/nurse/nurse";

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

const colors = ["bg-blue-500", "bg-green-500", "bg-red-500", "bg-yellow-500"];

const ProfileNurse: React.FC<ProfileDrawerProps> = ({ open, onClose }) => {
  const { setUser, setAccount, user } = useAppContext();
  const router = useRouter();
  const [techniques, setTechniques] = useState<Technique[]>([]);
  const [nurseList, setNurseList] = useState<DetailNurse>();

  useEffect(() => {
    if (user?.id) {
      const fetchDetailNurse = async () => {
        try {
          const response = await nurseApiRequest.detailNurse(user?.id, "admin");
          setNurseList(response.payload.data);
        } catch (error) {
          console.error("Failed to fetch nurses:", error);
        }
      };
      fetchDetailNurse();
    }
  }, [user]);
  
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

  function handleLogout() {
    setUser(null);
    setAccount(null);
    localStorage.removeItem("user");
    document.cookie =
      "userRole=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    router.push("/login");
  }

  return (
    <>
      <Drawer
        width={620}
        placement="right"
        closable={false}
        onClose={onClose}
        open={open}
      >
        {/* Centered Avatar */}
        <div className="flex justify-center mb-2">
          <Avatar src={nurseList?.avatar} className="w-28 h-28" />
        </div>

        <div className="flex justify-center mb-8">
          <p className="text-xl font-bold">{nurseList?.full_name}</p>
        </div>

        <Row>
          <Col span={12}>
            <DescriptionItem
              title="Số điện thoại"
              content={nurseList?.phone_number}
            />
          </Col>
          <Col span={12}>
            <DescriptionItem title="Tài khoản" content={nurseList?.email} />
          </Col>
        </Row>

        <Row>
          <Col span={12}>
            <DescriptionItem
              title="Căn cước công dân"
              content={nurseList?.citizen_id}
            />
          </Col>
          <Col span={12}>
            <DescriptionItem title="Ngày sinh" content="25/02/1990" />
          </Col>
        </Row>

        <Row>
          <Col span={24}>
            <DescriptionItem
              title="Nơi làm việc hiện tại"
              content={nurseList?.current_workplace}
            />
          </Col>
        </Row>

        <Row>
          <Col span={24}>
            <DescriptionItem
              title="Châm ngôn sống"
              content={nurseList?.slogan}
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
              title="Chuyên ngành"
              content={nurseList?.expertise}
            />
          </Col>
        </Row>

        <Row>
          <Col span={24}>
            <DescriptionItem
              title="Học vấn"
              content={nurseList?.education_level}
            />
          </Col>
        </Row>

        <Row>
          <Col span={24}>
            <DescriptionItem
              title="Kinh nghiệm làm việc"
              content={nurseList?.work_experience}
            />
          </Col>
        </Row>

        <Row>
          <Col span={24}>
            <DescriptionItem
              title="Chứng chỉ"
              content={nurseList?.certificate}
            />
          </Col>
        </Row>

        <div className="flex gap-2 flex-wrap">
          <DescriptionItem
            title="Kỹ năng đăng ký làm việc ở curanest"
            content=""
          />
          {techniques.map(({ id, name }, index) => (
            <Chip
              key={id}
              className={`text-white font-bold ${
                colors[index % colors.length]
              } px-4 py-2`}
            >
              {name}
            </Chip>
          ))}
        </div>

        <div className="flex justify-center mt-5">
          <Button
            onClick={handleLogout}
            color="danger"
            size="md"
            className="font-bold"
          >
            Đăng xuất
          </Button>
        </div>
      </Drawer>
    </>
  );
};

export default ProfileNurse;
