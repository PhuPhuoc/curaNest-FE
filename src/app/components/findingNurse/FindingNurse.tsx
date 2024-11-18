"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  Button,
  Avatar,
  ScrollShadow,
  Chip,
  Input,
  Tooltip,
} from "@nextui-org/react";
import NavBarNurse from "@/app/components/findingNurse/NavBarNurse";
import { useRouter } from "next/navigation";
import nurseApiRequest from "@/apiRequests/nurse/nurse";
import { Nurse } from "@/types/nurse";
import Lightning from "@/app/Icon/Lightning";

interface NurseCardProps {
  id: string;
  name: string;
  avatar?: string;
  current_workplace: string;
  techniques: string[];
}

const NurseCard: React.FC<NurseCardProps> = ({
  id,
  name,
  avatar,
  current_workplace,
  techniques,
}) => {
  const router = useRouter();
  return (
    <Card className="flex flex-col sm:flex-row items-center p-4 mb-4 transition-shadow cursor-pointer hover:shadow-xl hover:bg-white bg-gradient-to-r from-slate-300/50 to-white/50">
      <div className="flex flex-col sm:flex-row items-center justify-between w-full">
        <div className="w-full flex flex-col sm:flex-row items-center mb-4 sm:mb-0">
          <Avatar
            src={avatar}
            name={name}
            className="w-24 h-24 text-large mb-2"
            color="danger"
            isBordered
          />
          <div className="w-full flex flex-row justify-between items-center sm:text-left ml-4">
            <div className="flex flex-col items-left gap-4">
              <span className="font-bold text-[22px] text-indigo-700">
                {name}
              </span>
              <span className="font-bold text-gray-500">
                {current_workplace}
              </span>
            </div>
            <div className="items-center">
              <ScrollShadow className="max-h-24">
                <div className="flex flex-wrap gap-2">
                  {techniques.slice(0, 2).map((skill, index) => (
                    <Chip
                      size="lg"
                      key={index}
                      color="secondary"
                      variant="flat"
                      radius="md"
                      className="text-lg font-bold"
                    >
                      {skill}
                    </Chip>
                  ))}
                  {techniques.length > 2 && (
                    <Tooltip
                      content={
                        <div className="px-1 py-1">
                          <div className="text-small font-bold">
                            Nhấn xem chi tiết để coi thêm
                          </div>
                        </div>
                      }
                      color="secondary"
                      offset={15}
                    >
                      <Chip
                        size="lg"
                        key="more"
                        color="secondary"
                        variant="flat"
                        radius="md"
                        className="text-lg font-bold"
                        title={techniques.slice(3).join(", ")}
                      >
                        ...
                      </Chip>
                    </Tooltip>
                  )}
                </div>
              </ScrollShadow>
            </div>
          </div>
        </div>

        <Button
          onClick={() => router.push(`/user/findingNurse/${id}`)}
          className="ml-4 bg-indigo-400 hover:bg-indigo-700/50 text-white"
        >
          Xem chi tiết
        </Button>
      </div>
    </Card>
  );
};

const FindingNurse = () => {
  const [nurseList, setNurseList] = useState<Nurse[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

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

  const handleSearch = async () => {
    try {
      const response = await nurseApiRequest.listNurse(searchTerm);
      setNurseList(response.payload.data);
    } catch (error) {
      console.error("Error fetching NurseList:", error);
    }
  };

  const handleClear = async () => {
    await fetchNurseList();
    setSearchTerm("");
  };
  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="w-full md:w-1/4 lg:w-1/5 bg-gray-100 p-4 overflow-y-auto">
        <NavBarNurse />
      </div>

      <div className="w-full md:w-3/4 lg:w-4/5 p-4 overflow-y-auto">
        <div className="flex items-center gap-2 mb-4">
          <Input
            placeholder="Tìm kiếm theo tên"
            className="w-1/4"
            variant="bordered"
            size="lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button
            onClick={handleSearch}
            size="lg"
            startContent={<Lightning />}
            className="bg-yellow-400 hover:bg-yellow-700/50 text-white text-lg"
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
            }}
          >
            Xóa tìm kiếm
          </Button>
        </div>

        {nurseList.map((nurse, index) => (
          <NurseCard
            key={index}
            id={nurse.user_id}
            name={nurse.full_name}
            current_workplace={nurse.current_workplace}
            techniques={nurse.techniques}
            avatar={nurse.avatar}
          />
        ))}
      </div>
    </div>
  );
};

export default FindingNurse;
