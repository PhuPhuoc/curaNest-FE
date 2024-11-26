"use client";
import React, { useEffect, useState } from "react";
import nurseApiRequest from "@/apiRequests/nurse/nurse";
import { WorkSchedule } from "@/types/nurse";
import { formatShiftDate } from "@/lib/utils";
import { Button } from "@nextui-org/react";
import { toast } from "react-toastify";

interface TimetableProps {
  id: string;
}

const TimeTableCustomer = ({ id }: TimetableProps) => {
  const [weekDays, setWeekDays] = useState<string[]>([]);
  const [workList, setWorkList] = useState<WorkSchedule[]>([]);
  const [weekRange, setWeekRange] = useState<{
    from: string;
    to: string;
  } | null>(null);

  useEffect(() => {
    const initializeWeek = (baseDate: Date) => {
      const dayOfWeek = baseDate.getDay();
      const monday = new Date(baseDate);
      monday.setDate(baseDate.getDate() - dayOfWeek + 1);
      const sunday = new Date(baseDate);
      sunday.setDate(baseDate.getDate() - dayOfWeek + 7);

      const currentWeekDays = [];
      for (let i = 0; i < 7; i++) {
        const currentDay = new Date(monday);
        currentDay.setDate(monday.getDate() + i);
        currentWeekDays.push(currentDay.toLocaleDateString("vi-VN"));
      }

      setWeekDays(currentWeekDays);
      setWeekRange({
        from: monday.toLocaleDateString("vi-VN"),
        to: sunday.toLocaleDateString("vi-VN"),
      });
    };

    initializeWeek(new Date());
  }, []);

  const parseDate = (dateString: string): Date => {
    const [day, month, year] = dateString.split("/").map(Number);
    return new Date(year, month - 1, day);
  };

  const changeWeek = (direction: "prev" | "next") => {
    if (weekRange) {
      const currentMonday = parseDate(weekRange.from);
      const today = new Date();

      const startOfThisWeek = new Date(today);
      const todayDay = today.getDay() || 7; 
      startOfThisWeek.setDate(today.getDate() - todayDay + 1);
      startOfThisWeek.setHours(0, 0, 0, 0);


      const startOfNextWeek = new Date(startOfThisWeek);
      startOfNextWeek.setDate(startOfThisWeek.getDate() + 7);

      const startOfWeekAfterNext = new Date(startOfNextWeek);
      startOfWeekAfterNext.setDate(startOfNextWeek.getDate() + 7);

      const offset = direction === "prev" ? -7 : 7;
      const newBaseDate = new Date(currentMonday);
      newBaseDate.setDate(currentMonday.getDate() + offset);
      newBaseDate.setHours(0, 0, 0, 0);

      startOfThisWeek.setHours(0, 0, 0, 0);
      startOfNextWeek.setHours(0, 0, 0, 0);
      startOfWeekAfterNext.setHours(0, 0, 0, 0);

      if (direction === "prev") {
        const newTime = newBaseDate.getTime();
        const thisWeekTime = startOfThisWeek.getTime();
        if (newTime < thisWeekTime) {
          toast.warn("Chỉ xem được tuần hiện tại và tuần kế tiếp");
          return;
        }
      } else if (direction === "next") {
        // Không cho phép xem các tuần sau tuần kế tiếp
        const newTime = newBaseDate.getTime();
        const afterNextWeekTime = startOfWeekAfterNext.getTime();
        if (newTime >= afterNextWeekTime) {
          toast.warn("Chỉ xem được tuần hiện tại và tuần kế tiếp");
          return;
        }
      }

      const newWeekDays = [];
      const newMonday = new Date(newBaseDate);
      const newSunday = new Date(newBaseDate);
      newSunday.setDate(newBaseDate.getDate() + 6);

      for (let i = 0; i < 7; i++) {
        const currentDay = new Date(newMonday);
        currentDay.setDate(newMonday.getDate() + i);
        newWeekDays.push(currentDay.toLocaleDateString("vi-VN"));
      }

      setWeekDays(newWeekDays);
      setWeekRange({
        from: newMonday.toLocaleDateString("vi-VN"),
        to: newSunday.toLocaleDateString("vi-VN"),
      });
    }
  };

  const hours = [
    "08:00 - 09:00",
    "09:00 - 10:00",
    "10:00 - 11:00",
    "11:00 - 12:00",
    "12:00 - 13:00",
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

  useEffect(() => {
    if (id && weekRange) {
      console.log(
        "useEffect triggered with id:",
        id,
        "and weekRange:",
        weekRange
      );

      (async () => {
        try {
          const fromDate = formatShiftDate(weekRange.from);
          const toDate = formatShiftDate(weekRange.to);

          const response = await nurseApiRequest.scheduleWork(
            id,
            fromDate,
            toDate
          );

          console.log("API Response:", response);

          const formattedWorkList = response.payload.data.map((work) => ({
            ...work,
            shift_date: formatShiftDate(work.shift_date),
          }));

          console.log("Formatted Work List:", formattedWorkList);

          setWorkList(formattedWorkList);
        } catch (error) {
          console.error("Error fetching schedule:", error);
        }
      })();
    }
  }, [id, weekRange, formatShiftDate]);

  // console.log("🚀 ~ Customer ~ workList:", workList);

  return (
    <div className="border rounded-lg p-3 shadow-md bg-white mb-10">
      <div className="relative">
        <p className="text-2xl font-bold text-center">Lịch làm việc</p>
      </div>

      <div className="flex justify-between items-center mb-4">
        <Button
          color="primary"
          onClick={() => changeWeek("prev")}
          className="px-4 py-2 font-bold rounded-lg shadow-md"
        >
          Tuần trước
        </Button>
        <p className="text-lg font-semibold">
          {weekRange?.from} - {weekRange?.to}
        </p>
        <Button
          color="primary"
          onClick={() => changeWeek("next")}
          className="px-4 py-2 font-bold rounded-lg shadow-md"
        >
          Tuần kế tiếp
        </Button>
      </div>

      <div>
        <table className="table-auto w-full border-collapse">
          <thead>
            <tr>
              <th className="border bg-gray-100"></th>
              {weekDays.map((day, index) => (
                <th key={index} className="border p-3 bg-gray-100 text-center">
                  {index < 6 ? `Thứ ${index + 2}` : "Chủ nhật"}
                  <p className="mt-1">{day}</p>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {hours.map((hour) => (
              <tr key={hour}>
                <td className="border border-gray-300 font-semibold text-gray-600 text-center">
                  {hour}
                </td>

                {weekDays.map((day) => {
                  const hasWork = workList.find(
                    ({ shift_date, shift_from, shift_to }) => {
                      const isSameDay = shift_date === formatShiftDate(day);

                      const [start, end] = hour
                        .split(" - ")
                        .map((time) => time.trim());
                      const isSameStart =
                        shift_from.slice(0, 5) === start.slice(0, 5);
                      const isSameEnd =
                        shift_to.slice(0, 5) === end.slice(0, 5);
                      return isSameDay && isSameStart && isSameEnd;
                    }
                  );

                  // const hasApt = !!hasWork;
                  const isAppointment = hasWork?.appointment_id !== null;

                  return (
                    <td
                      key={`${day}-${hour}`}
                      className={`border border-gray-300 p-1 text-center ${
                        hasWork
                          ? isAppointment
                            ? "bg-yellow-100"
                            : "bg-green-100"
                          : "bg-gray-50"
                      }`}
                      style={{
                        minHeight: "50px",
                        height: "auto",
                      }}
                    >
                      <div
                        className={`flex items-center justify-center p-4 rounded-lg`}
                        style={{
                          minWidth: "50px",
                          height: "40px",
                        }}
                      >
                        {hasWork && (
                          <span className="text-green-500 font-bold">
                            {isAppointment ? "" : "✔"}
                          </span>
                        )}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>

        {/* Chú thích */}
        <div className="mt-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="block w-4 h-4 bg-green-100 border border-gray-300"></span>
              <span className="text-green-700 font-bold text-lg">
                Lịch rảnh
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="block w-4 h-4 bg-gray-300 border border-gray-300"></span>
              <span className="text-gray-700 font-bold text-lg">Lịch bận</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="block w-4 h-4 bg-yellow-100 border border-gray-300"></span>
              <span className="text-yellow-700 font-bold text-lg">
                Có người đặt
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeTableCustomer;
