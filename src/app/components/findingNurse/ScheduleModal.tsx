import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import { Button, Chip } from "@nextui-org/react";
import Profile from "./Profile";
import { toast, ToastContainer } from "react-toastify";

interface ScheduleModalProps {
  visible: boolean;
  onClose: () => void;
  profileServices: string[];
}

const ScheduleModal: React.FC<ScheduleModalProps> = ({
  visible,
  onClose,
  profileServices,
}) => {
  const [selectedTime, setSelectedTime] = useState<string[]>([]);
  const [weekDays, setWeekDays] = useState<string[]>([]);
  const [selectedProfile, setSelectedProfile] = useState<any>(null);
  const [selectedChips, setSelectedChips] = useState<string[]>([]);

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

  const chipValues: { [key: string]: number } = {
    "Thay băng": 50000,
    "Tiêm thuốc": 75000,
    "Khám bệnh": 100000,
    "Tư vấn": 120000,
    "Cho ăn": 75000,
  };

  const colors: { [key: string]: string } = {
    "Thay băng": "bg-blue-500 text-white",
    "Cho ăn": "bg-green-500 text-white",
    "Tiêm thuốc": "bg-red-500 text-white",
    "Khám bệnh": "bg-sky-500 text-white",
    "Tư vấn": "bg-orange-500 text-white",
  };

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

  const resetStates = () => {
    setSelectedTime([]);
    setSelectedChips([]);
    setSelectedProfile(null);
  };

  useEffect(() => {
    if (visible) {
      const initialSelectedChips = profileServices.filter((service) =>
        Object.keys(chipValues).includes(service)
      );
      setSelectedChips(initialSelectedChips);
    }
  }, [visible, profileServices]);

  const isPastDate = (day: string) => {
    const today = new Date();
    const dayOfWeek = new Date(today).getDay();

    const dayIndex = weekDays.indexOf(day);
    if (dayIndex === -1) return false;

    const currentDay = new Date(today);
    currentDay.setDate(currentDay.getDate() - dayOfWeek + dayIndex);

    return currentDay < today;
  };

  const handleTimeSelect = (time: string, day: string) => {
    if (isPastDate(day)) {
      toast.warn("Vui lòng chọn khung giờ của ngày hiện tại hoặc tương lai!");
      return;
    }

    setSelectedTime((prevSelectedTime) =>
      prevSelectedTime.includes(`${day} - ${time}`)
        ? prevSelectedTime.filter((t) => t !== `${day} - ${time}`)
        : [...prevSelectedTime, `${day} - ${time}`]
    );
  };

  const handleConfirm = () => {
    if (selectedTime.length) {
      console.log("Khung giờ đã chọn:", selectedTime.join(", "));
      console.log("Tổng giá:", totalPrice.toLocaleString(), "VNĐ");
      console.log("Các dịch vụ đã chọn:", selectedChips.join(", "));

      toast.success(`Đặt lịch thành công cho các giờ: ${selectedTime.join(", ")}`);
      onClose();
      resetStates();
    } else {
      toast.error("Vui lòng chọn ít nhất một giờ.");
    }
  };

  // const handleChipClick = (chip: string) => {
  //   if (selectedChips.includes(chip)) {
  //     setSelectedChips(selectedChips.filter((item) => item !== chip));
  //   } else {
  //     setSelectedChips([...selectedChips, chip]);
  //   }
  // };

  const handleChipClick = (chip: string) => {
    setSelectedChips((prev) =>
      prev.includes(chip)
        ? prev.filter((item) => item !== chip)
        : [...prev, chip]
    );
  };

  const totalPrice = selectedChips.reduce(
    (total, chip) => total + (chipValues[chip] || 0),
    0
  );

  return (
    <Modal
      open={visible}
      onCancel={() => {
        onClose();
        resetStates();
      }}
      width={950}
      footer={[
        <Button
          className="mr-2"
          color="danger"
          key="cancel"
          onClick={() => {
            onClose();
            resetStates();
          }}
        >
          Hủy
        </Button>,

        <Button
          key="confirm"
          type="submit"
          color="primary"
          onClick={handleConfirm}
          // disabled={!selectedTime.length}
        >
          Xác nhận
        </Button>,
      ]}
    >

      <div className="p-4">
        <div className="flex flex-col md:flex-row">
          {/* Left side*/}
          <div className="md:w-2/3 p-4 border border-gray-300 rounded">
            <h3 className="text-xl font-semibold">Các dịch vụ đã chọn</h3>

            {profileServices.length > 0 ? (
              <div className="flex flex-wrap gap-1">
                {selectedChips.map((chip, index) => (
                  <Chip
                    key={index}
                    className={`m-1 ${
                      colors[chip] || "bg-gray-200 text-gray-700"
                    }`}
                    onClick={() => handleChipClick(chip)}
                    size="lg"
                  >
                    {chip}
                  </Chip>
                ))}
              </div>
            ) : (
              <p className="text-lg">Chưa có dịch vụ nào được chọn.</p>
            )}

            {totalPrice > 0 && (
              <div className="mt-4 p-4 border-t border-gray-300 flex justify-end items-end">
                <div>
                  <h4 className="text-xl font-semibold">Tổng phí:</h4>
                  <p className="text-2xl">{totalPrice.toLocaleString()} VNĐ</p>
                </div>
              </div>
            )}
          </div>

          {/* Đường kẻ ngăn giữa hai phần */}
          <div className="w-1 border-l border-gray-300 mx-4"></div>

          {/* Right Side */}
          <div className="md:w-1/3 p-4 flex flex-col">
            <p className="text-xl font-semibold mb-2">Hãy chọn loại dịch vụ</p>
            <div className="flex flex-wrap">
              {Object.keys(chipValues)
                .filter((chip) => !selectedChips.includes(chip))
                .map((chip, index) => (
                  <Chip
                    key={index}
                    className={`m-1 p-1 rounded-full ${
                      colors[chip] || "bg-gray-200 text-gray-700"
                    }`}
                    onClick={() => handleChipClick(chip)}
                    size="lg"
                  >
                    {chip}
                  </Chip>
                ))}
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <p className="text-xl font-bold">Chọn khung giờ</p>

        {weekDays.map((day, dayIndex) => (
          <div key={dayIndex} className="mb-4">
            <p className="text-lg font-semibold mb-2">{day}</p>

            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
              {timeSlots.map((time, index) => (
                <Button
                  key={index}
                  type="button"
                  className={`w-full ${
                    selectedTime.includes(`${day} - ${time}`)
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200"
                  }`}
                  onClick={() => handleTimeSelect(time, day)}
                  
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

export default ScheduleModal;
