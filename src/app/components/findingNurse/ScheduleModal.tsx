import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import { Button, Chip } from "@nextui-org/react";
import { toast } from "react-toastify";
import nurseApiRequest from "@/apiRequests/nurse/nurse";
import techniqueApiRequest from "@/apiRequests/technique/technique";
import { Technique } from "@/types/technique";
import { formatDateVN, formatTime, generateColor } from "@/lib/utils";
import { CreateAppointmentData } from "@/types/appointment";
import authApi from "@/apiRequests/customer/customer";
import { useRouter } from "next/navigation";

interface ScheduleModalProps {
  id: string;
  visible: boolean;
  selectedProfile: string | null;
  onClose: () => void;
  profileServices: string[];
}

const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const ScheduleModal: React.FC<ScheduleModalProps> = ({
  id,
  visible,
  onClose,
  profileServices,
  selectedProfile,
}) => {
  const router = useRouter();
  const [weekDays, setWeekDays] = useState<string[]>([]);
  const [selectedChips, setSelectedChips] = useState<string[]>([]);
  const [techniques, setTechniques] = useState<Technique[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [selectedTime, setSelectedTime] = useState<{
    appointment_date: string;
    time_from: string;
    time_to: string;
  } | null>(null);

  const [suggestedTimeFrames, setSuggestedTimeFrames] = useState<
    {
      appointment_date: string;
      time_from: string;
      time_to: string;
      nurse_schedule_ids: string[];
    }[]
  >([]);

  const colors = [
    "text-white bg-blue-500",
    "text-white bg-green-500",
    "text-white bg-red-500",
    "text-white bg-yellow-500",
  ];

  const getCurrentWeekRange = () => {
    const today = new Date();
    const dayOfWeek = today.getDay();

    const monday = new Date(today);
    monday.setDate(today.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1));

    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);

    const weekDays = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(monday);
      day.setDate(monday.getDate() + i);
      const formattedDate = formatDate(day);
      weekDays.push(formattedDate);
    }

    return {
      from: formatDate(monday),
      to: formatDate(sunday),
      weekDays,
    };
  };

  async function fetchTechniques() {
    try {
      const response = await techniqueApiRequest.getTechnique();
      const convertedTechniques = response.payload.data.map(
        (technique: Technique) => {
          const timeParts = technique.estimated_time.split(":");
          const hours = parseInt(timeParts[0], 10);
          const minutes = parseInt(timeParts[1], 10);
          const totalMinutes = hours * 60 + minutes;

          return {
            ...technique,
            estimated_time: totalMinutes.toString(),
          };
        }
      );
      setTechniques(convertedTechniques);
    } catch (error) {
      console.error("Error fetching techniques:", error);
    }
  }

  const fetchAvailableScheduleWork = async () => {
    try {
      const { from, to } = getCurrentWeekRange();
      const totalMinutes = calculateTotalMinutes();
      const response = await nurseApiRequest.availableScheduleWork(
        id,
        from,
        to,
        totalMinutes.toString()
      );

      const transformedData = response.payload.data.map((item: any) => ({
        appointment_date: item.appoinment_date,
        time_from: item.from,
        time_to: item.to,
        nurse_schedule_ids: item.nurse_schedule_ids || [],
      }));

      setSuggestedTimeFrames(transformedData);
      console.log("transformedData: ", transformedData);
    } catch (error) {
      toast.error("Đã xảy ra lỗi khi lấy khung giờ đề xuất.");
    }
  };

  // console.log("suggestedTimeFrames: ", suggestedTimeFrames)

  const calculateTotalPrice = () => {
    const selectedTechniques = techniques.filter((technique) =>
      selectedChips.includes(technique.name)
    );
    const total = selectedTechniques.reduce((sum, technique) => {
      return sum + technique.fee;
    }, 0);
    setTotalPrice(total);
  };

  const calculateTotalMinutes = (): number => {
    const selectedTechniques = techniques.filter((technique) =>
      selectedChips.includes(technique.name)
    );
    return selectedTechniques.reduce((total, technique) => {
      const totalMinutes = parseInt(technique.estimated_time, 10);
      return total + totalMinutes;
    }, 0);
  };

  //   console.log("selectedChips:", selectedChips);
  // console.log("Total minutes:", calculateTotalMinutes());
  // console.log("Khung giờ gợi ý:", suggestedTimeFrames);
  // console.log("Weekdays:", weekDays);

  useEffect(() => {
    const { weekDays } = getCurrentWeekRange();
    setWeekDays(weekDays);
    calculateTotalPrice();
    fetchAvailableScheduleWork();
    fetchTechniques();
  }, [selectedChips]);

  const resetStates = () => {
    setSelectedChips([]);
    setSelectedTime(null);
    setTotalPrice(0);
    setSuggestedTimeFrames([]);
  };

  const handleConfirm = async () => {
    if (!selectedChips.length) {
      toast.error("Vui lòng chọn ít nhất một dịch vụ.");
      return;
    }

    if (!selectedTime) {
      toast.error("Vui lòng chọn khung giờ.");
      return;
    }

    try {
      const body: CreateAppointmentData = {
        appointment_date: selectedTime.appointment_date,
        listNurseWorkSchedules: suggestedTimeFrames
          .filter(
            (time) =>
              time.appointment_date === selectedTime.appointment_date &&
              time.time_from === selectedTime.time_from &&
              time.time_to === selectedTime.time_to
          )
          .flatMap((time) => time.nurse_schedule_ids),
        nurse_id: id,
        patient_id: selectedProfile,
        techniques: selectedChips.join(" - "),
        time_from_to: `${selectedTime.time_from} - ${selectedTime.time_to}`,
        total_fee: totalPrice,
      };

      // const response = await authApi.createAppointment(body);

      const response = fetch(
        "https://api.curanest.com.vn/api/v1/appointments",
        {
          mode: "no-cors",
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );

      toast.success("Đặt lịch thành công!");
      router.push("/user/upcomingSchedule");

      console.log("Appointment created: ", response);

      // Reset and close modal
      resetStates();
      onClose();
    } catch (error) {
      console.error("Failed to create appointment:", error);
      toast.error("Đặt lịch thất bại. Vui lòng thử lại.");
    }
  };

  const handleChipClick = (chip: string) => {
    setSelectedChips((prev) => {
      const updatedChips = prev.includes(chip)
        ? prev.filter((item) => item !== chip)
        : [...prev, chip];

      calculateTotalPrice();
      calculateTotalMinutes();
      return updatedChips;
    });
  };

  const handleSelectTime = (time: {
    appointment_date: string;
    time_from: string;
    time_to: string;
  }) => {
    setSelectedTime((prev) => {
      if (
        prev &&
        prev.appointment_date === time.appointment_date &&
        prev.time_from === time.time_from &&
        prev.time_to === time.time_to
      ) {
        return null;
      }
      return time;
    });
  };
  // console.log("selectedTime: ", selectedTime);

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

            {selectedChips.length > 0 ? (
              <div className="flex flex-wrap gap-1">
                {selectedChips.map((chip, index) => (
                  <Chip
                    key={index}
                    className={`m-1 ${colors[index % colors.length]} `}
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
              {techniques.map((technique) => (
                <Chip
                  key={technique.id}
                  className={`m-1 p-1 rounded-full ${
                    selectedChips.includes(technique.name)
                      ? "text-white"
                      : "text-black"
                  }`}
                  style={{
                    color: "white",
                    backgroundColor: selectedChips.includes(technique.name)
                      ? "lightgrey"
                      : generateColor(technique.id),
                  }}
                  onClick={() => handleChipClick(technique.name)}
                  size="lg"
                >
                  {technique.name}
                </Chip>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <p className="text-xl font-bold">Khung giờ phù hợp cho dịch vụ trên</p>

        {weekDays.map((day, dayIndex) => {
          const formattedDay = formatDateVN(day);

          const matchingTimes = suggestedTimeFrames.filter(
            (time) => time.appointment_date === day
          );

          return (
            <div key={dayIndex} className="mb-4">
              <p className="text-lg font-semibold mb-2">
                {dayIndex < 6 ? `Thứ ${dayIndex + 2}` : "Chủ nhật"},
                <span> {formattedDay}</span>
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
                {matchingTimes.map((time, index) => {
                  const formattedTimeFrom = formatTime(time.time_from);
                  const formattedTimeTo = formatTime(time.time_to);

                  const isSelected =
                    selectedTime &&
                    selectedTime.appointment_date === time.appointment_date &&
                    selectedTime.time_from === time.time_from &&
                    selectedTime.time_to === time.time_to;
                  return (
                    <Button
                      key={index}
                      type="button"
                      size="md"
                      className={`${
                        isSelected
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200 text-black"
                      }`}
                      onClick={() => handleSelectTime(time)}
                    >
                      {formattedTimeFrom} - {formattedTimeTo}
                    </Button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </Modal>
  );
};

export default ScheduleModal;
