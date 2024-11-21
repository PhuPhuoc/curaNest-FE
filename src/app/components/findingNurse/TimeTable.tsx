"use client";
import { Button } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import ScheduleModal from "./ScheduleModal";

interface TimetableProps {}

const Timetable: React.FC<TimetableProps> = () => {
  const [weekDays, setWeekDays] = useState<string[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const getCurrentWeekDays = () => {
      const today = new Date();
      const dayOfWeek = today.getDay();
      const currentWeekDays: string[] = [];

      for (let i = 1; i <= 6; i++) {
        const currentDay = new Date(today);
        const first = currentDay.getDate() - dayOfWeek + i;
        currentDay.setDate(first);
        const day = currentDay.toLocaleDateString("vi-VN");
        currentWeekDays.push(day);
      }

      setWeekDays(currentWeekDays);
    };

    getCurrentWeekDays();
  }, []);

  const hours = [
    "07:00",
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

  const availabilitySchedule: { [key: number]: string[] } = {
    1: ["12:00", "13:00", "14:00", "15:00", "16:00"], // Monday
    2: [
      "08:00",
      "09:00",
      "10:00",
      "11:00",
      "12:00",
      "13:00",
      "14:00",
      "15:00",
      "16:00",
    ], // Tuesday
    3: [
      "08:00",
      "09:00",
      "10:00",
      "11:00",
      "12:00",
      "13:00",
      "14:00",
      "15:00",
      "16:00",
    ], // Wednesday
    4: [
      "07:00",
      "08:00",
      "09:00",
      "10:00",
      "11:00",
      "12:00",
      "13:00",
      "14:00",
      "15:00",
      "16:00",
    ], // Thursday
    5: [
      "07:00",
      "08:00",
      "09:00",
      "10:00",
      "11:00",
      "12:00",
      "13:00",
      "14:00",
      "15:00",
      "16:00",
    ], // Friday
  };

  const handleScheduleClick = () => {
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="border rounded-lg p-3 shadow-md bg-white mb-10">
      <div className="relative mb-4">
        <p className="text-2xl font-bold text-center">Lịch làm việc</p>
        {/* <Button
          className="absolute right-0 top-0 text-base font-bold"
          color="danger"
          onClick={handleScheduleClick}
        >
          Đặt lịch
        </Button> */}
      </div>

      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse">
          <thead>
            <tr>
              <th className="border p-3 bg-gray-100"></th>
              {weekDays.map((day, index) => (
                <th key={index} className="border p-3 bg-gray-100 text-center">
                  {`Thứ ${index + 2}`}
                  <p className="mt-1">{day}</p>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {hours.map((hour) => (
              <tr key={hour}>
                <td className="border border-gray-300 p-2 font-semibold text-gray-600 text-center">
                  {hour}
                </td>

                {weekDays.map((day, index) => {
                  const isAvailable =
                    availabilitySchedule[index + 1]?.includes(hour);
                  return (
                    <td
                      key={`${day}-${hour}`}
                      className="border border-gray-300 p-2 text-center"
                      style={{
                        minHeight: "50px",
                        height: "auto",
                      }}
                    >
                      <div
                        className={`flex items-center justify-center p-4 rounded-lg ${
                          isAvailable ? "bg-green-100" : "#d1d5db"
                        }`}
                        style={{
                          minWidth: "50px",
                          height: "40px",
                        }}
                      >
                        {isAvailable && (
                          <span className="text-green-500 font-bold">✔</span>
                        )}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Render the Ant Design Modal */}
      {/* <ScheduleModal visible={isModalVisible} onClose={handleModalClose} /> */}
    </div>
  );
};

export default Timetable;
