"use client";
import React, { useEffect, useState } from "react";
import nurseApiRequest from "@/apiRequests/nurse/nurse";
import { WorkSchedule } from "@/types/nurse";

interface TimetableProps {
  id: string;
}

const Timetable = ({ id }: TimetableProps) => {
  const [weekDays, setWeekDays] = useState<string[]>([]);
  const [workList, setWorkList] = useState<WorkSchedule[]>([]);
  const [weekRange, setWeekRange] = useState<{
    from: string;
    to: string;
  } | null>(null);

  const formatShiftDate = (dateStr: string) => {
    const date = new Date(dateStr.split("/").reverse().join("/")); // Convert "dd/mm/yyyy" to "yyyy/mm/dd"
    return `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}/${String(date.getDate()).padStart(2, "0")}`;
  };

  useEffect(() => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const currentWeekDays = [];
    const monday = new Date(today);
    monday.setDate(today.getDate() - dayOfWeek + 1);
    const sunday = new Date(today);
    sunday.setDate(today.getDate() - dayOfWeek + 7);

    for (let i = 1; i <= 6; i++) {
      const currentDay = new Date(monday);
      currentDay.setDate(monday.getDate() + i - 1);
      currentWeekDays.push(currentDay.toLocaleDateString("vi-VN"));
    }

    setWeekDays(currentWeekDays);
    setWeekRange({
      from: monday.toLocaleDateString("vi-VN"),
      to: sunday.toLocaleDateString("vi-VN"),
    });
  }, []);

  const hours = [
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

  useEffect(() => {
    if (id && weekRange) {
      (async () => {
        try {
          const response = await nurseApiRequest.scheduleWork(
            id,
            formatShiftDate(weekRange.from),
            formatShiftDate(weekRange.to)
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
  }, [id, weekRange, formatShiftDate]);

  // console.log("🚀 ~ Customer ~ workList:", workList);

  return (
    <div className="border rounded-lg p-3 shadow-md bg-white mb-10">
      <div className="relative mb-4">
        <p className="text-2xl font-bold text-center">Lịch làm việc</p>
      </div>

      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse">
          <thead>
            <tr>
              <th className="border bg-gray-100"></th>
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
                <td className="border border-gray-300 font-semibold text-gray-600 text-center">
                  {hour}
                </td>

                {weekDays.map((day) => {
                  const hasWork = workList.some(
                    ({ shift_date, shift_from, shift_to }) => {
                      const isSameDay = shift_date === formatShiftDate(day); 
                     
                      const [start, end] = hour.split(" - ").map((time) => time.trim());
                      const isSameStart = shift_from.slice(0, 5) === start.slice(0, 5); 
                      const isSameEnd = shift_to.slice(0, 5) === end.slice(0, 5);

                      return isSameDay && isSameStart && isSameEnd;
                    }
                  );

                  return (
                    <td
                      key={`${day}-${hour}`}
                      className={`border border-gray-300 p-1 text-center ${
                        hasWork ? "bg-green-100" : "bg-white"
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
    </div>
  );
};

export default Timetable;
