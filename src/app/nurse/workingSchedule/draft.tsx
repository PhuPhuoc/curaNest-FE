"use client";

import nurseApiRequest from "@/apiRequests/nurse/nurse";
import { useAppContext } from "@/app/app-provider";
import { CreateScheduleData } from "@/types/nurse";
import { Button } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

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

const WorkingSchedule = () => {
  const { user } = useAppContext();

  const [currentWeekStart, setCurrentWeekStart] = useState<Date>(
    getMonday(new Date())
  );

  const times = [
    "08:00 - 09:00",
    "09:00 - 10:00",
    "10:00 - 11:00",
    "11:00 - 12:00",
    "13:00 - 14:00",
    "14:00 - 15:00",
    "15:00 - 16:00",
    "16:00 - 17:00",
    "17:00 - 18:00",
    "18:00 - 19:00",
    "19:00 - 20:00",
    "20:00 - 21:00",
    "21:00 - 22:00",
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

  const fetchDetailNurse = async (from: string, to: string) => {
    if (!user?.id) {
      toast.error("User ID is missing.");
      return;
    }

    try {
      const response = await nurseApiRequest.scheduleWork(user.id, from, to);
      console.log(response);
    } catch (error) {
      console.error("Error fetching nurse details:", error);
      toast.error("Failed to fetch nurse details.");
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    try {
      const formatDate = (date: Date): string => {
        return date.toISOString().split("T")[0];
      };

      const formatTime = (time: string): string => {
        const [hour, minute] = time.split(" - ")[0].split(":");
        return `${hour.padStart(2, "0")}:${minute.padStart(2, "0")}:00`;
      };

      const getEndTime = (time: string): string => {
        const [startHour, startMinute] = time.split(" - ")[0].split(":");
        const [endHour, endMinute] = time.split(" - ")[1].split(":");
        return `${endHour.padStart(2, "0")}:${endMinute.padStart(2, "0")}:00`;
      };

      const getDateObjectFromDay = (day: string): Date => {
        const dayIndex = daysOfWeek.findIndex((d) => d === day);
        const actualDate = new Date(currentWeekStart);
        actualDate.setDate(actualDate.getDate() + dayIndex);
        return actualDate;
      };

      const selectedShifts = Object.entries(schedule).flatMap(([time, days]) =>
        Object.entries(days)
          .filter(([day, selected]) => selected)
          .map(([day]) => ({
            shift_date: formatDate(getDateObjectFromDay(day)),
            shift_from: formatTime(time),
            shift_to: getEndTime(time),
          }))
      );

      if (selectedShifts.length > 0) {
        const scheduleData = {
          shifts: selectedShifts,
          week_from: formatDate(currentWeekStart),
          week_to: formatDate(
            new Date(currentWeekStart.getTime() + 6 * 24 * 60 * 60 * 1000)
          ),
        };

        if (user?.id) {
          await nurseApiRequest.createScheduleWork(user.id, scheduleData);
          toast.success("Đăng ký lịch làm việc thành công!");

          localStorage.setItem("schedule", JSON.stringify(schedule));

          const from = formatDate(currentWeekStart);
          const to = formatDate(
            new Date(currentWeekStart.getTime() + 6 * 24 * 60 * 60 * 1000)
          );
          fetchDetailNurse(from, to);
        }
      } else {
        console.log("No dates selected.");
        toast.warn("Vui lòng đăng ký lịch làm việc.");
      }
    } catch (error) {
      console.error("Error registering schedule:", error);
      toast.error("Đăng ký lịch làm việc thất bại. Vui lòng thử lại.");
    }
  };

  useEffect(() => {
    const savedSchedule = localStorage.getItem("schedule");
    if (savedSchedule) {
      setSchedule(JSON.parse(savedSchedule));
    }
  }, []);

  // Move to the next week
  const goToNextWeek = () => {
    setCurrentWeekStart((prev) => {
      const nextWeek = new Date(prev);
      nextWeek.setDate(prev.getDate() + 7);
      return getMonday(nextWeek);
    });
  };

  // Move to the previous week
  const goToPreviousWeek = () => {
    setCurrentWeekStart((prev) => {
      const prevWeek = new Date(prev);
      prevWeek.setDate(prev.getDate() - 7);
      return getMonday(prevWeek);
    });
  };

  return (
    <div className="p-6 w-full mx-auto bg-white rounded-lg shadow-md">
      <h3 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Đăng ký lịch làm việc theo tuần
      </h3>

      {/* Header for year and week navigation */}
      <div className="flex items-center justify-between mb-4">
        <div className="w-[120px]"></div>
        <div className="flex items-center space-x-4">
          <Button onClick={goToPreviousWeek}>{"<<"}</Button>
          <span className="text-xl font-semibold">
            {formatDate(currentWeekStart)} -{" "}
            {formatDate(
              new Date(currentWeekStart.getTime() + 6 * 24 * 60 * 60 * 1000)
            )}
          </span>
          <Button onClick={goToNextWeek}>{">>"}</Button>
        </div>

        {/* Nút Đăng ký */}
        <Button
          onClick={handleSubmit}
          className="  text-xl p-6 bg-blue-500 text-white shadow hover:bg-blue-600 transition"
        >
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
                {/* Hiển thị khung giờ */}
                <td className="border border-gray-300 p-2 font-semibold text-gray-600 text-center">
                  {time}
                </td>

                {/* Hiển thị trạng thái theo ngày */}
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
  );
};

export default WorkingSchedule;
