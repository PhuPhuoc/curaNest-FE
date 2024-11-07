"use client";

import AppointmentModal from "@/app/components/modal/AppointmentModal";
import { Card, CardBody, useDisclosure } from "@nextui-org/react";
import { useState } from "react";

type Appointment = {
  id: number;
  date: string;
  startTime: string;
  endTime: string;
  description: string;
  patientName: string;
  address: string;
  birthdate: string;
  phoneNumber: string;
  notes: string;
  avatar: string;
};

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

  const [selectedSchedule, setSelectedSchedule] = useState<Appointment | null>(
    null
  );
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleOpenModal = (appointment: Appointment) => {
    setSelectedSchedule(appointment);
    onOpen();
  };

  const appointments: Appointment[] = [
    {
      id: 1,
      date: new Date().toISOString().split("T")[0], // Today's date in YYYY-MM-DD format
      startTime: "08:00",
      endTime: "09:00",
      description: "Khám định kỳ",
      patientName: "Nguyen Van A",
      address: "123 Le Loi, Hanoi",
      birthdate: "1990-01-01",
      phoneNumber: "0123456789",
      notes: "Patient has a history of high blood pressure.",
      avatar: "https://example.com/avatar1.jpg",
    },
    {
      id: 2,
      date: new Date().toISOString().split("T")[0], // Today's date
      startTime: "09:00",
      endTime: "10:00",
      description: "Khám tổng quát",
      patientName: "Nguyen Van B",
      address: "456 Hai Ba Trung, Hanoi",
      birthdate: "1990-01-01",
      phoneNumber: "0123456789",
      notes: "Patient has a history of high blood pressure.",
      avatar: "https://example.com/avatar1.jpg",
    },
    {
      id: 3,
      date: new Date().toISOString().split("T")[0],
      startTime: "10:00",
      endTime: "11:00",
      description: "Khám sức khỏe",
      patientName: "Nguyen Van C",
      address: "789 Pham Ngoc Thach, Hanoi",
      birthdate: "1990-01-01",
      phoneNumber: "0123456789",
      notes: "Patient has a history of high blood pressure.",
      avatar: "https://example.com/avatar1.jpg",
    },
    {
      id: 4,
      date: new Date().toISOString().split("T")[0], // Today's date
      startTime: "11:00",
      endTime: "12:00",
      description: "Khám mắt",
      patientName: "Nguyen Van D",
      address: "101 Tran Hung Dao, Hanoi",
      birthdate: "1990-01-01",
      phoneNumber: "0123456789",
      notes: "Patient has a history of high blood pressure.",
      avatar: "https://example.com/avatar1.jpg",
    },
    {
      id: 5,
      date: new Date().toISOString().split("T")[0], // Today's date
      startTime: "13:00",
      endTime: "14:00",
      description: "Khám tai mũi họng",
      patientName: "Nguyen Van E",
      address: "202 Nguyen Du, Hanoi",
      birthdate: "1990-01-01",
      phoneNumber: "0123456789",
      notes: "Patient has a history of high blood pressure.",
      avatar: "https://example.com/avatar1.jpg",
    },
    {
      id: 6,
      date: new Date().toISOString().split("T")[0], // Today's date
      startTime: "14:00",
      endTime: "15:00",
      description: "Khám răng miệng",
      patientName: "Nguyen Van F",
      address: "303 Le Duan, Hanoi",
      birthdate: "1990-01-01",
      phoneNumber: "0123456789",
      notes: "Patient has a history of high blood pressure.",
      avatar: "https://example.com/avatar1.jpg",
    },
    {
      id: 7,
      date: new Date().toISOString().split("T")[0], // Today's date
      startTime: "15:00",
      endTime: "16:00",
      description: "Khám xương khớp",
      patientName: "Nguyen Van G",
      address: "404 Ba Trieu, Hanoi",
      birthdate: "1990-01-01",
      phoneNumber: "0123456789",
      notes: "Patient has a history of high blood pressure.",
      avatar: "https://example.com/avatar1.jpg",
    },
    {
      id: 8,
      date: new Date().toISOString().split("T")[0], // Today's date
      startTime: "16:00",
      endTime: "17:00",
      description: "Khám phụ khoa",
      patientName: "Nguyen Van H",
      address: "505 Hoang Hoa Tham, Hanoi",
      birthdate: "1990-01-01",
      phoneNumber: "0123456789",
      notes: "Patient has a history of high blood pressure.",
      avatar: "https://example.com/avatar1.jpg",
    },
  ];


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
    return (end.getTime() - start.getTime()) / (1000 * 60 * 60);
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

  return (
    <div className="p-6 max-w-9xl mx-auto bg-white rounded-lg shadow-md">
      <h3 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Lịch hẹn của bệnh nhân
      </h3>

      <div className="flex justify-between mb-4">
        <button
          onClick={goToPreviousWeek}
          className="p-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600 transition"
        >
          Tuần trước
        </button>
        <div className="flex flex-col items-center">
          <span className="text-xl font-semibold">
            {formatDate(currentWeekStart)}
          </span>
          <span className="text-lg text-gray-600">
            {daysOfWeek[0].label} - {daysOfWeek[6].label}
          </span>
        </div>
        <button
          onClick={goToNextWeek}
          className="p-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600 transition"
        >
          Tuần tiếp
        </button>
      </div>

      <div className="overflow-x-auto bg-gray-50 p-4 rounded-lg shadow-lg">
        <table className="table-auto w-full border border-gray-300 border-collapse rounded-lg">
          <thead>
            <tr className="bg-blue-100">
              <th className="p-3 text-center font-semibold text-gray-600 border border-gray-300 rounded-tl-lg">
                Giờ
              </th>
              {daysOfWeek.map((day) => (
                <th
                  key={day.date}
                  className="border border-gray-300"
                  style={{ width: "150px" }}
                >
                  <div className="flex flex-col items-center">
                    <span className="text-center font-semibold text-gray-600">
                      {day.label.split(",")[0]}
                    </span>
                    <span className="text-center text-gray-500">
                      {day.label.split(",")[1]}
                    </span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {times.map((time) => (
              <tr key={time} className="bg-white transition">
                <td className="p-8 font-semibold text-gray-600 text-center border-t border-b border-gray-300">
                  {time}
                </td>
                {daysOfWeek.map((day) => {
                  const appointment = appointments.find(
                    (appt) => appt.date === day.date && appt.startTime === time
                  );

                  if (appointment) {
                    const span = calculateSpan(
                      appointment.startTime,
                      appointment.endTime
                    );
                    return (
                      <td
                        key={day.date}
                        rowSpan={span}
                        className="border-t border-b border-gray-300 relative p-2"
                        style={{ height: `${span * 48}px` }}
                      >
                        <Card
                          style={{
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexDirection: "column",
                            borderRadius: "0.75rem",
                            backgroundColor: "#f0f4ff",
                            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.15)",
                            cursor: "pointer",
                          }}
                        >
                          <CardBody
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
                            onClick={() => handleOpenModal(appointment)}
                          >
                            <p
                              style={{
                                marginBottom: "0.25rem",
                                fontSize: "0.9rem",
                              }}
                            >
                              {appointment.startTime} - {appointment.endTime}
                            </p>
                            <strong style={{ fontSize: "1rem", margin: "0" }}>
                              {appointment.description}
                            </strong>
                          </CardBody>
                        </Card>
                      </td>
                    );
                  }
                  if (
                    appointments.some(
                      (appt) =>
                        appt.date === day.date &&
                        new Date(`1970-01-01T${time}:00`) >=
                          new Date(`1970-01-01T${appt.startTime}:00`) &&
                        new Date(`1970-01-01T${time}:00`) <
                          new Date(`1970-01-01T${appt.endTime}:00`)
                    )
                  ) {
                    return null;
                  }

                  return (
                    <td
                      key={day.date}
                      className="p-3 rounded-lg border-t border-b border-gray-300"
                    ></td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <AppointmentModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        selectedSchedule={selectedSchedule}
      />
    </div>
  );
};

export default PatientSchedule;
