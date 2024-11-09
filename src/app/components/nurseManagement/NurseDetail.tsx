"use client";
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
import { useState } from "react";

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

const NurseDetail = () => {
  const router = useRouter();
  const selectedNurse = {
    id: 1,
    avatar: "https://i.pravatar.cc/150?u=1",
    full_name: "Alice Johnson",
    phone_number: "0123456789",
    citizen_id: "123456789",
    curent_workplace: "Bệnh viện Phạm Ngọc Thạch",
    education_level: "Cử nhân Điều dưỡng - ĐH Y Hà Nội",
    work_experience: 5,
    certificate: "Chứng chỉ Hồi sức cấp cứu, Chứng chỉ Gây mê hồi sức",
    slogan: "Vì sức khỏe người bệnh",
    expertise: ["elderly-care", "emergency-care", "intensive-care"],
  };

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
                src={selectedNurse.avatar}
                className="w-40 h-40"
                isBordered
                color="primary"
                size="lg"
              />
              <div className="text-center lg:text-left">
                <h2 className="text-2xl font-bold text-default-900">
                  {selectedNurse.full_name}
                </h2>
                <p className="text-default-500 italic mt-1">
                  &quot;{selectedNurse.slogan}&quot;
                </p>
              </div>
            </div>

            <Divider className="lg:hidden" />

            <div className="flex-1 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InfoItem label="Mã CCCD" value={selectedNurse.citizen_id} />
                <InfoItem
                  label="Số điện thoại"
                  value={selectedNurse.phone_number}
                />
                <InfoItem
                  label="Nơi làm việc"
                  value={selectedNurse.curent_workplace}
                />
                <InfoItem
                  label="Học vấn"
                  value={selectedNurse.education_level}
                />
                <InfoItem
                  label="Kinh nghiệm"
                  value={`${selectedNurse.work_experience} năm`}
                />
                <InfoItem label="Chứng chỉ" value={selectedNurse.certificate} />
              </div>

              <Divider className="my-4" />

              <div>
                <div className="flex items-center gap-2 mb-4">
                  <p className="text-default-500">Kỹ năng chuyên môn</p>
                </div>
                <ScrollShadow className="max-h-24">
                  <div className="flex flex-wrap gap-2">
                    {selectedNurse.expertise.map((skill, index) => (
                      <Chip
                      size="lg"
                        key={index}
                        color="secondary"
                        variant="flat"
                        radius="sm"
                        className="text-lg font-bold"
                      >
                        {skill}
                      </Chip>
                    ))}
                  </div>
                </ScrollShadow>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>

      <div className="p-6  mx-auto">
        <h3 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Lịch làm việc của điều dưỡng
        </h3>

        <div className="flex items-center justify-between mb-4">
          <Button>Năm {currentWeekStart.getFullYear()}</Button>

          <div className="flex items-center space-x-4">
            <Button onClick={goToPreviousWeek}>{"<<"}</Button>
            <span className="font-semibold">
              {formatDate(currentWeekStart)} -{" "}
              {formatDate(
                new Date(currentWeekStart.getTime() + 6 * 24 * 60 * 60 * 1000)
              )}
            </span>
            <Button onClick={goToNextWeek}>{">>"}</Button>
          </div>

          <Button onClick={handleSubmit} color="primary">
            Đăng ký
          </Button>
        </div>

        {/* Weekly schedule table */}
        <div className="overflow-x-auto bg-gray-50 p-4 rounded-lg shadow-md">
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 p-2"></th>
                {daysOfWeek.map((day) => (
                  <th
                    key={day}
                    className="border border-gray-300 p-2 text-center font-semibold text-gray-600"
                  >
                    {day}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {times.map((time) => (
                <tr key={time}>
                  <td className="border border-gray-300 p-2 font-semibold text-gray-600 text-center">
                    {time}
                  </td>

                  {daysOfWeek.map((day) => (
                    <td
                      key={day}
                      className="border border-gray-300 p-2 text-center cursor-pointer"
                      style={{
                        minHeight: "50px",
                        height: "auto",
                      }}
                    >
                      <div
                        className={`flex items-center justify-center p-4 rounded-lg 
                      ${schedule[time][day] ? "bg-green-200" : "#d1d5db"}`}
                        onClick={() => handleToggle(time, day)}
                        style={{
                          minWidth: "50px",
                          height: "40px",
                        }}
                      >
                        {schedule[time][day] && (
                          <span className="text-green-500 font-bold">✔</span>
                        )}
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default NurseDetail;
