"use client";
import React from "react";
import { Card, Button, Avatar } from "@nextui-org/react";
import NavBarNurse from "@/app/components/findingNurse/NavBarNurse";
import { useRouter } from "next/navigation";

interface Nurse {
  id: string;
  name: string;
  role: string;
  shift: string;
  note: string;
  avatar?: string; // Optional avatar URL
}

interface NurseCardProps {
  id: string;
  name: string;
  role: string;
  shift: string;
  note: string;
  avatar?: string;
}

const NurseCard: React.FC<NurseCardProps> = ({
  id,
  name,
  role,
  shift,
  note,
  avatar,
}) => {
  const router = useRouter();

  return (
    <Card className="flex flex-col sm:flex-row items-center p-4 mb-4">
      <div className="flex flex-col sm:flex-row items-center justify-between w-full">
        <div className="flex flex-col sm:flex-row items-center mb-4 sm:mb-0">
          <Avatar
            src={avatar}
            name={name}
            className="w-16 h-16 text-large mb-2 sm:mb-0 sm:mr-4"
            color="danger"
            isBordered
          />
          <div className="flex flex-col text-center sm:text-left">
            <span className="font-bold">{name}</span>
            <span>{role}</span>
            <span>Shift: {shift}</span>
            <span>{note}</span>
          </div>
        </div>

        <Button
          onClick={() => router.push(`/user/findingNurse/${id}`)}
          className="ml-4"
        >
          Xem chi tiết
        </Button>
      </div>
    </Card>
  );
};

const FindingNurse = () => {
  const nurses: Nurse[] = [
    {
      id: "1",
      name: "Jane Doe",
      role: "Nurse",
      shift: "6-3",
      note: "Not doing this shift",
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    },
    {
      id: "2",
      name: "John Smith",
      role: "Nurse",
      shift: "6-3",
      note: "Available",
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    },
    {
      id: "3",
      name: "Alice Johnson",
      role: "Nurse",
      shift: "6-3",
      note: "On leave",
      avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d",
    },
  ];

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="w-full md:w-1/4 lg:w-1/5 bg-gray-100 p-4 overflow-y-auto">
        <NavBarNurse />
      </div>

      <div className="w-full md:w-3/4 lg:w-4/5 p-4 overflow-y-auto">
        {nurses.map((nurse, index) => (
          <NurseCard
            key={index}
            id={nurse.id}
            name={nurse.name}
            role={nurse.role}
            shift={nurse.shift}
            note={nurse.note}
            avatar={nurse.avatar}
          />
        ))}
      </div>
    </div>
  );
};

export default FindingNurse;
