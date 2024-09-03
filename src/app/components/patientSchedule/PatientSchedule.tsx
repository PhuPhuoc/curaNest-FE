"use client";
import { Card, CardBody, Button } from "@nextui-org/react";
import ArrowRight from "@/app/Icon/ArrowRight";
import ArrowLeft from "@/app/Icon/ArrowLeft";
import { useState } from "react";

interface Appointment {
  id: string;
  title: string;
  time: string;
}

interface DayInfo {
  date: Date;
  appointments: Appointment[];
}

const PatientSchedule: React.FC = () => {
  const [currentWeek, setCurrentWeek] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  // Dummy data for appointments
  const dummyAppointments: DayInfo[] = [
    {
      date: new Date(2024, 8, 1),
      appointments: [{ id: "1", title: "Check-up", time: "09:00 AM" }],
    },
    {
      date: new Date(2024, 8, 2),
      appointments: [
        { id: "2", title: "Dental cleaning", time: "10:00 AM" },
        { id: "3", title: "X-ray", time: "11:30 AM" },
      ],
    },
    {
      date: new Date(2024, 8, 3),
      appointments: [
        { id: "4", title: "Vaccination", time: "02:00 PM" },
        { id: "5", title: "Follow-up", time: "03:30 PM" },
        { id: "6", title: "Blood test", time: "04:45 PM" },
      ],
    },
    {
      date: new Date(2024, 8, 4),
      appointments: [
        { id: "7", title: "Physical therapy", time: "09:00 AM" },
        { id: "8", title: "Consultation", time: "11:00 AM" },
        { id: "9", title: "Eye exam", time: "02:00 PM" },
        { id: "10", title: "Allergy test", time: "04:00 PM" },
      ],
    },
  ];

  const getDaysOfWeek = (date: Date): Date[] => {
    const week: Date[] = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(date);
      day.setDate(date.getDate() - date.getDay() + i);
      week.push(day);
    }
    return week;
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "numeric",
      day: "numeric",
    });
  };

  const navigateWeek = (direction: number): void => {
    const newDate = new Date(currentWeek);
    newDate.setDate(newDate.getDate() + direction * 7);
    setCurrentWeek(newDate);
  };

  const week: Date[] = getDaysOfWeek(currentWeek);

  const getButtonColor = (appointmentCount: number) => {
    if (appointmentCount === 1) return "primary";
    if (appointmentCount === 2) return "secondary";
    if (appointmentCount === 3) return "success";
    if (appointmentCount >= 4) return "danger";
    return "default";
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
  };

  const getAppointmentsForDate = (date: Date): Appointment[] => {
    const dayInfo = dummyAppointments.find(
      (di) => di.date.toDateString() === date.toDateString()
    );
    return dayInfo ? dayInfo.appointments : [];
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <div className="bg-gray-100 p-4 rounded-lg border border-gray-300 mb-4">
        <div className="flex items-center justify-between">
          <div className="flex flex-col items-center">
            <Button isIconOnly variant="light" onClick={() => navigateWeek(-1)}>
              <ArrowLeft />
            </Button>
            <span className="text-xs mt-1 font-semibold">Tuần trước</span>
          </div>
          <div className="flex space-x-2">
            {week.map((day, index) => {
              const appointments = getAppointmentsForDate(day);
              const buttonColor = getButtonColor(appointments.length);
              return (
                <Button
                  key={index}
                  isIconOnly
                  color={buttonColor}
                  variant={
                    day.toDateString() === selectedDate?.toDateString()
                      ? "solid"
                      : "ghost"
                  }
                  onClick={() => handleDateClick(day)}
                  className="w-12 h-12 flex flex-col items-center justify-center p-0"
                >
                  <span className="text-sm font-bold">{day.getDate()}</span>
                  <span className="text-xs">
                    {day.toLocaleDateString("en-US", { weekday: "short" })}
                  </span>
                </Button>
              );
            })}
          </div>
          <div className="flex flex-col items-center">
            <Button isIconOnly variant="light" onClick={() => navigateWeek(1)}>
              <ArrowRight />
            </Button>
            <span className="text-xs mt-1 font-semibold ">Tuần sau</span>
          </div>
        </div>
      </div>
      <div className="space-y-4">
        {selectedDate && (
          <h3 className="text-lg font-semibold mb-2">
            {formatDate(selectedDate)}
          </h3>
        )}
        {selectedDate && getAppointmentsForDate(selectedDate).length > 0 ? (
          getAppointmentsForDate(selectedDate).map((appointment) => (
            <Card key={appointment.id} className="mb-2">
              <CardBody>
                <p className="text-sm">
                  <span className="font-semibold">{appointment.time}</span> -{" "}
                  {appointment.title}
                </p>
              </CardBody>
            </Card>
          ))
        ) : selectedDate ? (
          <Card>
            <CardBody>
              <p className="text-sm text-gray-600">No appointments scheduled</p>
            </CardBody>
          </Card>
        ) : (
          <p className="text-center text-gray-500">
            Select a date to view appointments
          </p>
        )}
      </div>
    </div>
  );
};

export default PatientSchedule;
