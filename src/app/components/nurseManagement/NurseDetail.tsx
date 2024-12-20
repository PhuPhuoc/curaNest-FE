"use client";
import nurseApiRequest from "@/apiRequests/nurse/nurse";
import NurseWorkingSchedule from "@/app/components/nurseManagement/NurseWorkingSchedule";
import { DetailNurse } from "@/types/nurse";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  Chip,
  Divider,
  ScrollShadow,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const getMonday = (date: Date) => {
  const day = date.getDay();
  const calculateMonday = date.getDate() - day + (day === 0 ? -6 : 1);
  return new Date(date.setDate(calculateMonday));
};

const formatDate = (date: Date) => {
  const options = {
    weekday: "short",
    day: "2-digit",
    month: "2-digit",
  } as const;
  return date.toLocaleDateString("vi-VN", options);
};

type Schedule = {
  [time: string]: {
    [day: string]: boolean;
  };
};

const NurseDetail = ({ id }: { id: string }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [nurseList, setNurseList] = useState<DetailNurse>();

  async function fetchDetailNurse() {
    setLoading(true);
    try {
      const response = await nurseApiRequest.detailNurse(id, "admin");
      setNurseList(response.payload.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching techniques:", error);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchDetailNurse();
  }, []);

  const [currentWeekStart, setCurrentWeekStart] = useState<Date>(
    getMonday(new Date())
  );

  const times = [
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
    "22:00",
  ];

  const daysOfWeek = Array.from({ length: 7 }, (_, i) => {
    const day = new Date(currentWeekStart);
    day.setDate(currentWeekStart.getDate() + i);
    return formatDate(day);
  });

  const [schedule, setSchedule] = useState<Schedule>(() => {
    const initialSchedule: Schedule = {};
    times.forEach((time) => {
      initialSchedule[time] = {};
      daysOfWeek.forEach((day) => {
        initialSchedule[time][day] = false;
      });
    });
    return initialSchedule;
  });

  const handleToggle = (time: string, day: string) => {
    setSchedule((prev) => ({
      ...prev,
      [time]: {
        ...prev[time],
        [day]: !prev[time][day],
      },
    }));
  };

  const handleSubmit = () => {
    const selectedDates = Object.entries(schedule).flatMap(([time, days]) =>
      Object.entries(days)
        .filter(([day, selected]) => selected)
        .map(([day]) => `${time} - ${day}`)
    );

    if (selectedDates.length > 0) {
      console.log("Selected Dates:", selectedDates);
    } else {
      console.log("No dates selected.");
    }
  };

  const goToNextWeek = () => {
    setCurrentWeekStart((prev) => {
      const nextWeek = new Date(prev);
      nextWeek.setDate(prev.getDate() + 7);
      return getMonday(nextWeek);
    });
  };

  const goToPreviousWeek = () => {
    setCurrentWeekStart((prev) => {
      const prevWeek = new Date(prev);
      prevWeek.setDate(prev.getDate() - 7);
      return getMonday(prevWeek);
    });
  };

  function handleBack() {
    router.back();
  }

  const InfoItem = ({ label, value }: any) => (
    <div className="flex items-center gap-3">
      <div>
        <p className="text-sm text-default-500">{label}</p>
        <p className="font-medium text-default-700">{value}</p>
      </div>
    </div>
  );

  return (
    <div className="bg-white p-10 rounded-2xl">
      <Button className="mb-4" onPress={handleBack}>
        Quay lại
      </Button>

      <Card className="max-w-6xl mx-auto" shadow="lg">
        <CardBody className="p-6">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex flex-col items-center lg:items-start gap-4">
              <Avatar
                src={nurseList?.avatar}
                className="w-40 h-40"
                isBordered
                color="primary"
                size="lg"
              />
              <div className="text-center lg:text-left">
                <h2 className="text-2xl font-bold text-default-900">
                  {nurseList?.full_name}
                </h2>
                <p className="text-default-500 italic mt-1 max-w-[200px]">
                  &quot;{nurseList?.slogan}&quot;
                </p>
              </div>
            </div>

            <Divider className="lg:hidden" />

            <div className="flex-1 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InfoItem label="Email" value={nurseList?.email} />
                <InfoItem label="Mã CCCD" value={nurseList?.citizen_id} />
                <InfoItem
                  label="Số điện thoại"
                  value={nurseList?.phone_number}
                />
                <InfoItem
                  label="Nơi làm việc"
                  value={nurseList?.current_workplace}
                />
                <InfoItem label="Học vấn" value={nurseList?.education_level} />
                <InfoItem
                  label="Kinh nghiệm"
                  value={`${nurseList?.work_experience} năm`}
                />
                <InfoItem
                  label="Kỹ năng chuyên môn"
                  value={nurseList?.expertise}
                />
                <InfoItem label="Chứng chỉ" value={nurseList?.certificate} />
              </div>

              <Divider className="my-4" />

              <div>
                <div className="flex items-center gap-2 mb-4">
                  <p className="text-default-500">Dịch vụ</p>
                </div>
                <ScrollShadow className="max-h-24">
                  <div className="flex flex-wrap gap-2">
                    {nurseList?.techniques.map((skill, index) => (
                      <Chip
                        size="lg"
                        key={index}
                        color="secondary"
                        variant="flat"
                        radius="sm"
                        className="text-lg font-bold"
                      >
                        {skill.name}
                      </Chip>
                    ))}
                  </div>
                </ScrollShadow>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>

      <NurseWorkingSchedule id={id} />
    </div>
  );
};

export default NurseDetail;
