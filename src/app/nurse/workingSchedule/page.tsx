"use client";

import nurseApiRequest from "@/apiRequests/nurse/nurse";
import { useAppContext } from "@/app/app-provider";
import {
  formatDateVN,
  formatShiftDate,
  getEndTime,
  getStartTime,
} from "@/lib/utils";
import { WorkSchedule } from "@/types/nurse";
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

  const findWorkListItem = (day: string, time: string) => {
    return workList.find(({ shift_date, shift_from, shift_to }) => {
      const formattedDay = day;
      const isSameDay = shift_date === formattedDay;
      const [start, end] = time.split(" - ").map((t) => t.trim());
      const isSameStart = shift_from.slice(0, 5) === start;
      const isSameEnd = shift_to.slice(0, 5) === end;
      return isSameDay && isSameStart && isSameEnd;
    });
  };

  const handleToggle = (time: string, day: string) => {
    const workItem = findWorkListItem(day, time);
    if (workItem?.status && workItem.status !== "available") {
      return;
    }

    setSchedule((prevSchedule) => {
      const updatedSchedule = JSON.parse(JSON.stringify(prevSchedule));

      if (!updatedSchedule[time]) {
        updatedSchedule[time] = {};
      }

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
      setSchedule({}); // Reset schedule when changing week
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
      setSchedule({});
    }
  };

  useEffect(() => {
    if (user?.id && weekRange) {
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

          // Khởi tạo schedule state từ workList - chỉ với các status available
          const initialSchedule: Schedule = {};
          formattedWorkList.forEach((work) => {
            // Chỉ thêm vào schedule nếu status là available
            if (!work.status || work.status === "available") {
              const time = `${work.shift_from.slice(
                0,
                5
              )} - ${work.shift_to.slice(0, 5)}`;
              if (!initialSchedule[time]) {
                initialSchedule[time] = {};
              }
              initialSchedule[time][work.shift_date] = true;
            }
          });
          setSchedule(initialSchedule);
        } catch (error) {
          console.error("Error fetching schedule:", error);
        }
      })();
    }
  }, [user?.id, weekRange]);

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
            shift_from: getStartTime(time),
            shift_to: getEndTime(time),
          }))
      );

      console.log("selectedShifts: ", selectedShifts);

      if (selectedShifts.length > 0) {
        const scheduleData = {
          shifts: selectedShifts,
          week_from: weekRange?.from || "",
          week_to: weekRange?.to || "",
        };
        console.log("🚀 ~ handleSubmit ~ scheduleData:", scheduleData);

        if (user?.id) {
          await nurseApiRequest.createScheduleWork(user.id, scheduleData);
          toast.success("Đăng ký lịch làm việc thành công!");
        }
      } else {
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

      <div className="flex items-center justify-between mb-4">
        <div className="w-[120px]"></div>
        <div className="flex items-center space-x-4">
          <Button onClick={goToPreviousWeek}>{"<<"}</Button>
          <span className="text-xl font-semibold">
            {weekRange?.from && weekRange?.to
              ? `${formatDateVN(weekRange.from)} - ${formatDateVN(
                  weekRange.to
                )}`
              : ""}
          </span>
          <Button onClick={goToNextWeek}>{">>"}</Button>
        </div>

        <Button
          onClick={handleSubmit}
          className="text-xl p-6 bg-blue-500 text-white shadow hover:bg-blue-600 transition"
        >
          Đăng ký
        </Button>
      </div>

      <div className="mt-4 mb-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="block w-4 h-4 bg-green-100 border border-gray-300"></span>
              <span className="text-green-700 font-bold text-lg">
                Được thay đổi lịch
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="block w-4 h-4 bg-white border border-gray-300"></span>
              <span className="text-gray-700 font-bold text-lg">Lịch trống</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="block w-4 h-4 bg-yellow-100 border border-gray-300"></span>
              <span className="text-yellow-700 font-bold text-lg">
                Không được thay đổi
              </span>
            </div>
          </div>
        </div>

      <div className="overflow-x-auto rounded-lg shadow-md">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr>
            <th className="border bg-gray-100"></th>
            {weekDays.map((day, index) => (
                <th key={index} className="border p-3 bg-gray-100 text-center">
                  {index < 6 ? `Thứ ${index + 2}` : "Chủ nhật"}
                  <p className="mt-1">{formatDateVN(day)}</p>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {times.map((time) => (
              <tr key={time}>
                <td className="border border-gray-300 font-semibold text-gray-600 text-center">
                  {time}
                </td>

                {weekDays.map((day) => {
                  const workItem = findWorkListItem(day, time);
                  const isDisabled =
                    workItem?.status && workItem.status !== "available";
                  const isSelected = schedule[time]?.[day];

                  let cellBgColor = "bg-white";
                  if (isDisabled) {
                    cellBgColor = "bg-yellow-100";
                  } else if (isSelected) {
                    cellBgColor = "bg-green-200";
                  }

                  return (
                    <td
                      key={`${day}-${time}`}
                      className={`border border-gray-300 p-2 text-center ${
                        isDisabled ? "cursor-not-allowed" : "cursor-pointer"
                      } ${cellBgColor}`}
                      onClick={() => !isDisabled && handleToggle(time, day)}
                      style={{
                        minHeight: "50px",
                        height: "auto",
                      }}
                    >
                      <div
                        className="flex items-center justify-center p-4 rounded-lg"
                        style={{
                          minWidth: "50px",
                          height: "40px",
                        }}
                      >
                        {isSelected && !isDisabled && (
                          <span className="text-green-500 font-bold">✔</span>
                        )}
                        {/* {isDisabled && (
                          <span className="text-gray-500 font-bold">✖</span>
                        )} */}
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
