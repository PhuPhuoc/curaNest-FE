"use client";

import nurseApiRequest from "@/apiRequests/nurse/nurse";
import { useAppContext } from "@/app/app-provider";
import {
  formatInputDate,
  formatShiftDate,
  formatTime,
  getEndTime,
} from "@/lib/utils";
import { CreateScheduleData, WorkSchedule } from "@/types/nurse";
import { Button } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const formatDate = (date: Date): string => {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${yyyy}/${mm}/${dd}`;
};

const getMonday = (date: Date) => {
  const day = date.getDay();
  const diff = date.getDate() - day + (day === 0 ? -6 : 1);
  return new Date(date.setDate(diff));
};

interface Schedule {
  [time: string]: {
    [day: string]: boolean;
  };
}

const WorkingSchedule = () => {
  const { user } = useAppContext();
  const [workList, setWorkList] = useState<WorkSchedule[]>([]);
  const [weekDays, setWeekDays] = useState<string[]>([]);
  const [weekRange, setWeekRange] = useState<{
    from: string;
    to: string;
  } | null>(null);
  const [schedule, setSchedule] = useState<Schedule>({});

  useEffect(() => {
    const today = new Date();
    const monday = getMonday(today);
    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);

    const currentWeekDays = [];
    for (let i = 0; i < 7; i++) {
      const currentDay = new Date(monday);
      currentDay.setDate(monday.getDate() + i);
      currentWeekDays.push(formatDate(currentDay));
    }

    setWeekDays(currentWeekDays);
    setWeekRange({
      from: formatDate(monday),
      to: formatDate(sunday),
    });
  }, []);

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

  const handleToggle = (time: string, day: string) => {
    setSchedule((prevSchedule: Schedule) => {
      const updatedSchedule = { ...prevSchedule };

      if (!updatedSchedule[time]) {
        updatedSchedule[time] = {};
      }
      if (!updatedSchedule[time][day]) {
        updatedSchedule[time][day] = false;
      }
      // Toggle the state
      updatedSchedule[time][day] = !updatedSchedule[time][day];

      return updatedSchedule;
    });
  };

  const goToPreviousWeek = () => {
    if (weekRange) {
      const currentStartDate = new Date(weekRange.from);
      const previousStartDate = new Date(currentStartDate);
      previousStartDate.setDate(currentStartDate.getDate() - 7);
      const previousEndDate = new Date(previousStartDate);
      previousEndDate.setDate(previousStartDate.getDate() + 6);

      setWeekRange({
        from: formatDate(previousStartDate),
        to: formatDate(previousEndDate),
      });

      const previousWeekDays = [];
      for (let i = 0; i < 7; i++) {
        const currentDay = new Date(previousStartDate);
        currentDay.setDate(previousStartDate.getDate() + i);
        previousWeekDays.push(formatDate(currentDay));
      }
      setWeekDays(previousWeekDays);
    }
  };

  const goToNextWeek = () => {
    if (weekRange) {
      const currentStartDate = new Date(weekRange.from);
      const nextStartDate = new Date(currentStartDate);
      nextStartDate.setDate(currentStartDate.getDate() + 7);
      const nextEndDate = new Date(nextStartDate);
      nextEndDate.setDate(nextStartDate.getDate() + 6);

      setWeekRange({
        from: formatDate(nextStartDate),
        to: formatDate(nextEndDate),
      });

      const nextWeekDays = [];
      for (let i = 0; i < 7; i++) {
        const currentDay = new Date(nextStartDate);
        currentDay.setDate(nextStartDate.getDate() + i);
        nextWeekDays.push(formatDate(currentDay));
      }
      setWeekDays(nextWeekDays);
    }
  };

  useEffect(() => {
    if (user?.id && weekRange) {
      console.log("User ID:", user.id);
      console.log("Week Range:", weekRange);
      (async () => {
        try {
          const response = await nurseApiRequest.scheduleWork(
            user.id,
            weekRange.from,
            weekRange.to
          );
          const formattedWorkList = response.payload.data.map((work) => ({
            ...work,
            shift_date: formatShiftDate(work.shift_date),
          }));
          setWorkList(formattedWorkList);
        } catch (error) {
          console.error("Error fetching schedule:", error);
        }
      })();
    }
  }, [user?.id, weekRange]);

  // Handle form submission
  const handleSubmit = async () => {
    try {
      const getDateObjectFromDay = (day: string): Date => {
        const dayIndex = weekDays.findIndex((d) => d === day);
        const actualDate = new Date(weekRange?.from || "");
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
          week_from: weekRange?.from || "",
          week_to: weekRange?.to || "",
        };

        console.log("scheduleData: ", scheduleData);

        if (user?.id) {
          await nurseApiRequest.createScheduleWork(user.id, scheduleData);
          toast.success("Đăng ký lịch làm việc thành công!");

          // localStorage.setItem("schedule", JSON.stringify(schedule));
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
            {weekRange?.from} - {weekRange?.to}
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
              {weekDays.map((day) => (
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
                {weekDays.map((day) => {
                  const hasWork = workList.some(
                    ({ shift_date, shift_from, shift_to }) => {
                      const formattedDay = day;
                      const isSameDay = shift_date === formattedDay;
                      const [start, end] = time
                        .split(" - ")
                        .map((t) => t.trim());

                      const isSameStart = shift_from.slice(0, 5) === start;
                      const isSameEnd = shift_to.slice(0, 5) === end;

                      return isSameDay && isSameStart && isSameEnd;
                    }
                  );

                  const isSelected = schedule[time]?.[day];
                  const cellBgColor = hasWork
                    ? "bg-green-100"
                    : isSelected
                    ? "bg-green-200"
                    : "bg-white";

                  return (
                    <td
                      key={`${day}-${time}`}
                      className={`border border-gray-300 p-2 text-center cursor-pointer ${cellBgColor}`}
                      onClick={() => handleToggle(time, day)} 
                      style={{
                        minHeight: "50px",
                        height: "auto",
                      }}
                    >
                      <div
                        className="flex items-center justify-center p-4 rounded-lg"
                        onClick={() => handleToggle(time, day)}
                        style={{
                          minWidth: "50px",
                          height: "40px",
                        }}
                      >
                        {/* Display checkmark if work exists */}
                        {hasWork && (
                          <span className="text-green-500 font-bold">✔</span>
                        )}
                        {/* Display another checkmark for user-selected cells */}
                        {isSelected && !hasWork && (
                          <span className="text-blue-500 font-bold">✔</span>
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
    </div>
  );
};

export default WorkingSchedule;
