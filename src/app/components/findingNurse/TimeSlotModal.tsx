import React, { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";
import { Modal } from "antd";

interface TimeSlotModalProps {
  isVisible: boolean;
  onClose: () => void;
}

const TimeSlotModal: React.FC<TimeSlotModalProps> = ({
  isVisible,
  onClose,
}) => {
  const timeSlots = [
    "08:00 AM",
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "01:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
    "05:00 PM",
  ];

  const [selectedTime, setSelectedTime] = useState<string[]>([]);
  const [weekDays, setWeekDays] = useState<string[]>([]);

  useEffect(() => {
    const getCurrentWeekDays = () => {
      const today = new Date();
      const dayOfWeek = today.getDay();
      const currentWeekDays: string[] = [];

      for (let i = 1; i <= 6; i++) {
        const currentDay = new Date(today);
        const first = currentDay.getDate() - dayOfWeek + i;
        currentDay.setDate(first);
        const day = currentDay.toLocaleDateString("vi-VN", {
          weekday: "long",
          day: "numeric",
          month: "numeric",
        });
        currentWeekDays.push(day);
      }

      setWeekDays(currentWeekDays);
    };

    getCurrentWeekDays();
  }, []);

  const handleTimeSelect = (time: string) => {
    setSelectedTime((prevSelectedTime) =>
      prevSelectedTime.includes(time)
        ? prevSelectedTime.filter((t) => t !== time)
        : [...prevSelectedTime, time]
    );
  };

  const handleConfirm = () => {
    if (selectedTime.length) {
      alert(`Đặt lịch thành công cho các giờ: ${selectedTime.join(", ")}`);
      onClose();
    } else {
      alert("Vui lòng chọn ít nhất một giờ.");
    }
  };

  useEffect(() => {
    setSelectedTime([]);
  }, [isVisible]);

  return (
    <Modal
      open={isVisible}
      onCancel={onClose}
      footer={[
        <Button className="mr-2" color="danger" key="cancel" onClick={onClose}>
          Hủy
        </Button>,

        <Button
          key="confirm"
          type="submit"
          color="primary"
          onClick={handleConfirm}
          disabled={!selectedTime}
        >
          Xác nhận
        </Button>,
      ]}
    >
      <div className="space-y-6">
        <p className="text-xl font-bold">Chọn khung giờ</p>

        {weekDays.map((day, dayIndex) => (
          <div key={dayIndex} className="mb-4">
            <p className="text-lg font-semibold">{day}</p>

            <div className="grid grid-cols-3 gap-4">
              {timeSlots.map((time, index) => (
                <Button
                  key={index}
                  type="button"
                  className={`w-full ${
                    selectedTime.includes(`${day} - ${time}`)
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200"
                  }`}
                  onClick={() => handleTimeSelect(`${day} - ${time}`)}
                >
                  {time}
                </Button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Modal>
  );
};

export default TimeSlotModal;
