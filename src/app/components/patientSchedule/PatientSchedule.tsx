"use client";

import nurseApiRequest from "@/apiRequests/nurse/nurse";
import { useAppContext } from "@/app/app-provider";
import AppointmentModal from "@/app/components/modal/AppointmentModal";
import { WorkSchedule } from "@/types/nurse";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  useDisclosure,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

//   id: number;
//   date: string;
//   startTime: string;
//   endTime: string;
//   description: string;
//   patientName: string;
//   address: string;
//   birthdate: string;
//   phoneNumber: string;
//   notes: string;
//   avatar: string;
// };

const formatDate = (date: Date) => {
  return date.toISOString().split("T")[0];
};

const getMonday = (date: Date) => {
  const day = date.getDay();
  const diff = date.getDate() - day + (day === 0 ? -6 : 1);
  return new Date(date.setDate(diff));
};

const PatientSchedule = () => {
  const [currentWeekStart, setCurrentWeekStart] = useState<Date>(
    getMonday(new Date())
  );

  const { user } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [workList, setWorkList] = useState<WorkSchedule[]>([]);

  async function fetchDetailNurse(from: string, to: string) {
    setLoading(true);
    try {
      if (user) {
        const response = await nurseApiRequest.scheduleWork(user.id, from, to);
        setWorkList(response.payload.data);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching techniques:", error);
      setLoading(false);
    }
  }

  useEffect(() => {
    if (user?.id) {
      const from = formatDate(currentWeekStart);
      const to = formatDate(
        new Date(currentWeekStart.getTime() + 6 * 24 * 60 * 60 * 1000)
      );
      fetchDetailNurse(from, to);
    }
  }, [user?.id, currentWeekStart]);

  const [selectedScheduleId, setSelectedScheduleId] = useState<string>();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleOpenModal = (id: string, status: string) => {
    if (status !== "available") {
      setSelectedScheduleId(id);
      onOpen();
    } else {
      toast.error("Chưa có lịch hen được đăng kí");
    }
  };

  function handleFetch(){
    if (user?.id) {
      const from = formatDate(currentWeekStart);
      const to = formatDate(
        new Date(currentWeekStart.getTime() + 6 * 24 * 60 * 60 * 1000)
      );
      fetchDetailNurse(from, to);
    }
  }

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
    return {
      label: day.toLocaleDateString("vi-VN", {
        weekday: "long",
        day: "2-digit",
        month: "2-digit",
      }),
      date: formatDate(day),
    };
  });

  const calculateSpan = (startTime: string, endTime: string) => {
    const start = new Date(`1970-01-01T${startTime}:00`);
    const end = new Date(`1970-01-01T${endTime}:00`);
    const spanInMinutes = (end.getTime() - start.getTime()) / (1000 * 60);
    return Math.floor(spanInMinutes / 60);
  };

  const shouldRenderCell = (day: string, time: string) => {
    const workSchedule = workList?.find(
      (schedule) =>
        schedule.shift_date === day &&
        schedule.shift_from.slice(0, 5) <= time &&
        schedule.shift_to.slice(0, 5) > time
    );

    if (!workSchedule) return true;

    return workSchedule.shift_from.slice(0, 5) === time;
  };

  const mergeWorkSchedules = (schedules: WorkSchedule[]) => {
    const groupedSchedules: Record<string, WorkSchedule[]> = {};
    schedules.forEach((schedule) => {
      if (
        schedule.status === "pending" ||
        schedule.status === "not-available"
      ) {
        const key = `${schedule.appointment_id}-${schedule.shift_date}`;
        if (!groupedSchedules[key]) {
          groupedSchedules[key] = [];
        }
        groupedSchedules[key].push(schedule);
      }
    });

    const mergedSchedules: WorkSchedule[] = [];
    Object.values(groupedSchedules).forEach((group) => {
      group.sort(
        (a, b) =>
          new Date(`1970-01-01T${a.shift_from}`).getTime() -
          new Date(`1970-01-01T${b.shift_from}`).getTime()
      );

      let merged = group[0];
      for (let i = 1; i < group.length; i++) {
        const current = group[i];
        if (merged.shift_to === current.shift_from) {
          merged = {
            ...merged,
            shift_to: current.shift_to,
          };
        } else {
          mergedSchedules.push(merged);
          merged = current;
        }
      }
      mergedSchedules.push(merged);
    });

    // Thêm các lịch khác (không thuộc pending hoặc not-available)
    const nonMergedSchedules = schedules.filter(
      (schedule) =>
        schedule.status !== "pending" && schedule.status !== "not-available"
    );

    return [...nonMergedSchedules, ...mergedSchedules];
  };

  const mergedWorkList = mergeWorkSchedules(workList);

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

  return (
    <div className="p-6 w-full mx-auto bg-white rounded-lg shadow-md">
      <h3 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Lịch hẹn của bệnh nhân
      </h3>

      <div className="flex justify-between mb-4">
        <Button
          onClick={goToPreviousWeek}
          className="  text-xl p-6 bg-blue-500 text-white shadow hover:bg-blue-600 transition"
        >
          Tuần trước
        </Button>
        <div className="flex flex-col items-center">
          <span className="text-xl font-semibold">
            Ngày hiện tại: {formatDate(new Date())}
          </span>
          <span className="text-lg text-gray-600">
            {daysOfWeek[0].label} - {daysOfWeek[6].label}
          </span>
        </div>
        <Button
          onClick={goToNextWeek}
          className="  text-xl p-6 bg-blue-500 text-white shadow hover:bg-blue-600 transition"
        >
          Tuần sau
        </Button>
      </div>

      <div className=" bg-gray-50 p-4 rounded-lg shadow-lg">
        <div className="hidden md:block">
          <table className="w-full border border-gray-300 border-collapse rounded-2xl bg-white">
            <thead>
              <tr className="bg-[#1a3b5d] text-white text-xl">
                <th className="w-[200px]  p-3 text-center font-semibold  border border-gray-300 rounded-tl-2xl">
                  Giờ
                </th>
                {daysOfWeek.map((day) => (
                  <th
                    key={day.date}
                    className="w-[200px] border border-gray-300"
                  >
                    <div className="flex flex-row items-center justify-center">
                      <span className="text-center font-semibold ">
                        {day.label.split(",")[0]} ,
                      </span>
                      <span className="text-center  ml-1">
                        {day.label.split(",")[1]}
                      </span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {times.map((time) => (
                <tr
                  key={time}
                  className="bg-white transition "
                  style={{ height: 150 }}
                >
                  <td className="text-xl p-8 font-semibold text-gray-600 text-center border-t border-b border-gray-300">
                    {time}
                  </td>
                  {daysOfWeek.map((day) => {
                    if (!shouldRenderCell(day.date, time)) {
                      return null;
                    }

                    const workSchedule = mergedWorkList.find(
                      (schedule) =>
                        schedule.shift_date === day.date &&
                        schedule.shift_from.slice(0, 5) === time
                    );

                    if (workSchedule) {
                      const span = calculateSpan(
                        workSchedule.shift_from.slice(0, 5),
                        workSchedule.shift_to.slice(0, 5)
                      );

                      return (
                        <td
                          key={`${day.date}-${time}`}
                          rowSpan={span}
                          className="border-t border-b border-gray-300 relative p-2"
                          style={{ height: `${span * 150}px` }}
                          onClick={() =>
                            handleOpenModal(
                              workSchedule.appointment_id,
                              workSchedule.status
                            )
                          }
                        >
                          <Card
                            style={{
                              width: "auto",
                              height: "100%",
                              borderRadius: "0.75rem",
                              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.15)",
                              cursor: "pointer",
                              backgroundColor:
                                workSchedule.status === "not-available"
                                  ? "#00ff9dbd"
                                  : workSchedule.status === "pending"
                                  ? "#FFA500"
                                  : workSchedule.status === "available"
                                  ? "#1a3c5dbe"
                                  : "#bab6b6",
                            }}
                            className="mx-auto"
                          >
                            <CardBody
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                textAlign: "center",
                                color: "white",
                                fontWeight: "bold",
                                gap: 10,
                              }}
                            >
                              <p
                                style={{
                                  marginBottom: "0.25rem",
                                  fontSize: "1.2rem",
                                }}
                              >
                                {workSchedule.shift_from.slice(0, 5)} -{" "}
                                {workSchedule.shift_to.slice(0, 5)}
                              </p>
                              {workSchedule.status === "pending" && (
                                <strong
                                  style={{ fontSize: "1.2rem", margin: "0" }}
                                >
                                  Vui lòng xác nhận lịch
                                </strong>
                              )}
                              {workSchedule.status === "available" && (
                                <strong
                                  style={{ fontSize: "1.2rem", margin: "0" }}
                                >
                                  Chưa có lịch hẹn
                                </strong>
                              )}
                              {workSchedule.status === "not-available" && (
                                <strong
                                  style={{ fontSize: "1.2rem", margin: "0" }}
                                >
                                  Lịch hẹn sắp tới
                                </strong>
                              )}
                            </CardBody>
                          </Card>
                        </td>
                      );
                    }
                    return (
                      <td
                        key={`${day.date}-${time}`}
                        className="p-3 rounded-lg border-t border-b border-gray-300"
                      ></td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="md:hidden">
          {daysOfWeek.map((day) => {
            const schedulesForDay = workList?.filter(
              (schedule) => schedule.shift_date === day.date
            );

            if (schedulesForDay?.length > 0) {
              return (
                <div key={day.date} className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">
                    {day.label}
                  </h4>

                  <div className="flex flex-col space-y-4">
                    {schedulesForDay.map((schedule) => (
                      <Card
                        key={schedule.id}
                        style={{
                          width: "100%",
                          marginBottom: "1rem",
                          cursor: "pointer",
                          backgroundColor:
                            schedule.status === "not-available"
                              ? "#e6f3ff"
                              : "#f0f0f0",
                        }}
                      >
                        <CardBody
                          // onClick={() => handleOpenModal(appointment)}
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            textAlign: "center",
                            width: "100%",
                            color: "#1a3b5d",
                            fontWeight: "bold",
                          }}
                        >
                          <p
                            style={{
                              marginBottom: "0.25rem",
                              fontSize: "0.9rem",
                            }}
                          >
                            {schedule.shift_from.slice(0, 5)} -{" "}
                            {schedule.shift_to.slice(0, 5)}
                          </p>
                          <strong style={{ fontSize: "0.8rem", margin: "0" }}>
                            {schedule.status}
                          </strong>
                        </CardBody>
                      </Card>
                    ))}
                  </div>
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>

      {selectedScheduleId && (
        <AppointmentModal
          isOpen={isOpen}
          onCloseModal={handleFetch}
          onOpenChange={onOpenChange}
          selectedScheduleId={selectedScheduleId}
          role="nurse"
        />
      )}
    </div>
  );
};

export default PatientSchedule;
