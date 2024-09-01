"use client";
import NavBarNurse from "@/app/components/findingNurse/NavBarNurse";
import { Card, Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";

interface Nurse {
  id: string;
  name: string;
  role: string;
  shift: string;
  note: string;
}

interface NurseCardProps {
  id: string;
  name: string;
  role: string;
  shift: string;
  note: string;
}

const NurseCard: React.FC<NurseCardProps> = ({ id, name, role, shift, note }) => {
  const router = useRouter();

  return (
    <Card className="flex items-center p-4 mb-4">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center">
          <div className="w-16 h-16 rounded-full bg-gray-200 mr-4"></div>
          <div className="flex flex-col">
            <span className="font-bold">{name}</span>
            <span>{role}</span>
            <span>Shift: {shift}</span>
            <span>{note}</span>
          </div>
        </div>

        <Button
          onClick={() => router.push(`/user/findingNurse/${id}`)}
          className="ml-4"
        >Xem chi tiết
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
    },
    { id: "2", name: "John Smith", role: "Nurse", shift: "6-3", note: "Available" },
    { id: "3", name: "Alice Johnson", role: "Nurse", shift: "6-3", note: "On leave" },
  ];

  return (
    <div className="flex h-screen">
      <div className="flex-[20%] bg-gray-100 p-4">
        <NavBarNurse />
      </div>

      <div className="flex-[80%] p-4 overflow-y-auto">
        {nurses.map((nurse, index) => (
          <NurseCard
            key={index}
            id={nurse.id}
            name={nurse.name}
            role={nurse.role}
            shift={nurse.shift}
            note={nurse.note}
          />
        ))}
      </div>
    </div>
  );
};

export default FindingNurse;