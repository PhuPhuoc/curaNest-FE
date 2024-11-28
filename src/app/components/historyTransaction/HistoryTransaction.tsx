"use client";
import authApi from "@/apiRequests/customer/customer";
import feedbackApiRequest from "@/apiRequests/feedback/feedback";
import nurseApiRequest from "@/apiRequests/nurse/nurse";
import { useAppContext } from "@/app/app-provider";
import StarRating from "@/app/components/historyTransaction/StarRating";
import AppointmentModal from "@/app/components/modal/AppointmentModal";
import ArrowLeft from "@/app/Icon/ArrowLeft";
import ArrowRight from "@/app/Icon/ArrowRight";
import Calendar from "@/app/Icon/Calendar";
import { EyeFilledIcon } from "@/app/Icon/EyeFilledIcon";
import { infoPatient } from "@/types/customer";
import { NurseScheduleCard } from "@/types/nurse";
import {
  Card,
  CardBody,
  Button,
  Badge,
  Avatar,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Textarea,
  useDisclosure,
  ModalContent,
  Chip,
  Tooltip,
} from "@nextui-org/react";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
export interface ModalSubmit {
  content: string;
  patient_name: string | undefined;
  rate: number;
  techniques: string | undefined;
}

const HistoryTransaction = () => {
  const [selectedPatient, setSelectedPatient] = useState<NurseScheduleCard>();
  const [feedback, setFeedback] = useState<string>("");
  const appointmentModal = useDisclosure();
  const [rating, setRating] = useState<number>(0);
  const feedbackModal = useDisclosure();
  const { user } = useAppContext();

  const handleOpenModal = (appointment: NurseScheduleCard) => {
    setSelectedPatient(appointment);
    setRating(0); 
    setFeedback(""); 
    feedbackModal.onOpen();
  };

  const handleSubmitFeedback = async () => {
    const data: ModalSubmit = {
      content: feedback,
      patient_name: user?.user_name,
      rate: rating,
      techniques: selectedPatient?.techniques,
    };

    try {
      if (selectedPatient) {
        const response = await feedbackApiRequest.createReviews(
          selectedPatient?.id,
          data
        );
        toast.success(response.payload.message);
        feedbackModal.onOpenChange();
        setFeedback("");
        setRating(0);
      }
    } catch (error) {
      console.error("Error fetching techniques:", error);
      toast.error("Không thể gửi feedback. Vui lòng thử lại.");
    }
  };

  const [listPatient, setListPatient] = useState<infoPatient[]>([]);
  const [listScheduleCard, setListScheduleCard] = useState<NurseScheduleCard[]>(
    []
  );
  const [filteredSchedule, setFilteredSchedule] = useState<NurseScheduleCard[]>(
    []
  );
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(
    null
  );
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [currentWeekStart, setCurrentWeekStart] = useState<Date>(new Date());
  const [selectedScheduleId, setSelectedScheduleId] = useState<string>();

  async function fetchPatientList(id: string) {
    try {
      const response = await authApi.profilePatientSchedule(id);
      setListPatient(response.payload.data);
    } catch (error) {
      console.error("Error fetching patient list:", error);
    }
  }

  async function fetchWeeklySchedule(from: string, to: string) {
    try {
      if (user && selectedPatientId) {
        const response = await nurseApiRequest.nurseScheduleCard(
          selectedPatientId,
          "patient",
          from,
          to
        );
        setListScheduleCard(response.payload.data);
      }
    } catch (error) {
      console.error("Error fetching weekly schedule:", error);
    }
  }

  const getWeekRange = (date: Date) => {
    const start = new Date(date);
    start.setDate(date.getDate() - date.getDay() + 1);
    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    return { from: formatDateForApi(start), to: formatDateForApi(end) };
  };

  const getDayOfWeek = (day: number) => {
    const days = [
      "Chủ nhật",
      "Thứ hai",
      "Thứ ba",
      "Thứ tư",
      "Thứ năm",
      "Thứ sáu",
      "Thứ bảy",
    ];
    return days[day];
  };

  const formatDate = (date: Date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    return `${day}/${month}`;
  };

  const formatDateForApi = (date: Date) => {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(date.getDate()).padStart(2, "0")}`;
  };

  const filterByDate = (day: string) => {
    if (!selectedPatientId) {
      toast.error("Vui lòng chọn hồ sơ bệnh nhân trước khi chọn ngày");
      return;
    }

    setSelectedDate(day);
    const filtered = listScheduleCard.filter(
      (appointment) => appointment.appointment_date === day
    );
    setFilteredSchedule(filtered);
  };

  const getNextWeek = () => {
    const nextWeek = new Date(currentWeekStart);
    nextWeek.setDate(currentWeekStart.getDate() + 7);
    setCurrentWeekStart(nextWeek);
    resetFilters();
  };

  const getPrevWeek = () => {
    const prevWeek = new Date(currentWeekStart);
    prevWeek.setDate(currentWeekStart.getDate() - 7);
    setCurrentWeekStart(prevWeek);
    resetFilters();
  };

  const resetFilters = () => {
    setSelectedPatientId(null);
    setSelectedDate(null);
    setFilteredSchedule([]);
    setListScheduleCard([]);
  };

  const resetStateOnPatientChange = (patientId: string) => {
    setSelectedPatientId(patientId);
    setSelectedDate(null);
    setFilteredSchedule([]);
    setListScheduleCard([]);
  };

  const isDayHighlighted = (day: string) => {
    return listScheduleCard.some(
      (appointment) => appointment.appointment_date === day
    );
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "confirmed":
        return "secondary";
      case "canceled":
        return "danger";
      case "completed":
        return "success";
      default:
        return "warning";
    }
  };

  const formatStatusText = (status: string) => {
    const statusMap: { [key: string]: string } = {
      confirmed: "Đã xác nhận",
      canceled: "Đã hủy",
      pending: "Chờ xác nhận",
      completed: "Đã hoàn thành",
    };
    return statusMap[status.toLowerCase()] || status;
  };

  useEffect(() => {
    if (user) {
      fetchPatientList(user.id);
    }
  }, [user]);

  useEffect(() => {
    if (selectedPatientId) {
      const { from, to } = getWeekRange(currentWeekStart);
      fetchWeeklySchedule(from, to);
    }
  }, [selectedPatientId, currentWeekStart]);

  const handleViewDetail = (appointmentId: string) => {
    setSelectedScheduleId(appointmentId);
    appointmentModal.onOpen();
  };

  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 py-6 bg-gray-50 ">
      <div className="bg-white rounded-xl p-6 mb-6 shadow-sm">
        <div className="flex items-center space-x-3 mb-6">
          <Calendar />
          <h2 className="text-3xl font-bold text-gray-800">
            Lịch sử giao dịch
          </h2>
        </div>

        <div className="flex flex-wrap gap-2 items-center">
          <p className="text-lg font-bold">Hồ sơ bệnh nhân:</p>
          {listPatient.map((patient) => (
            <Chip
              key={patient.id}
              size="lg"
              variant={selectedPatientId === patient.id ? "solid" : "bordered"}
              avatar={<Avatar name="JW" src={patient.avatar} />}
              classNames={{
                base: `transition-all duration-200 hover:scale-105 cursor-pointer ${
                  selectedPatientId === patient.id
                    ? "bg-indigo-500"
                    : "border border-indigo-500"
                }`,
                content: `px-4 py-2 text-md font-medium ${
                  selectedPatientId === patient.id
                    ? "text-white"
                    : "text-indigo-500"
                }`,
              }}
              onClick={() => resetStateOnPatientChange(patient.id)}
            >
              {patient.full_name}
            </Chip>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 mb-6 shadow-sm">
        <div className="flex items-center justify-between">
          <Button
            isIconOnly
            variant="light"
            onClick={getPrevWeek}
            className="w-12 h-16 hover:bg-gray-100"
          >
            <ArrowLeft />
          </Button>

          <div className="grid grid-cols-7 gap-2 flex-1 mx-4">
            {[...Array(7)].map((_, index) => {
              const today = new Date(currentWeekStart);
              today.setDate(today.getDate() + index - today.getDay() + 1);
              const dayString = formatDateForApi(today);
              const formattedDate = formatDate(today);
              const isHighlighted = isDayHighlighted(dayString);
              const isSelected = selectedDate === dayString;

              return (
                <Button
                  key={index}
                  size="lg"
                  variant={isSelected ? "solid" : "light"}
                  className={`
                    w-30 h-30 flex flex-col items-center p-2 rounded-lg transition-all duration-200
                    ${isHighlighted ? "bg-indigo-100" : ""} /* Màu xanh nhạt */
                    ${
                      isSelected
                        ? "bg-indigo-500 text-white"
                        : "hover:bg-red-300"
                    }
                  `}
                  onClick={() => filterByDate(dayString)}
                >
                  <span className="text-md font-medium">
                    {getDayOfWeek(today.getDay())}
                  </span>
                  <span className="text-lg font-bold">{formattedDate}</span>
                </Button>
              );
            })}
          </div>

          <Button
            isIconOnly
            variant="light"
            onClick={getNextWeek}
            className="w-12 h-16 hover:bg-gray-100"
          >
            <ArrowRight />
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="space-y-4">
          {filteredSchedule.length > 0 ? (
            filteredSchedule.map((appointment) => (
              <Card
                key={appointment.id}
                className="w-full transition-all duration-300 hover:shadow-lg border border-gray-100"
              >
                <CardBody className="p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex flex-col items-center md:items-start space-y-2">
                      <Avatar
                        name={appointment.nurse_name}
                        src={appointment.avatar}
                        className="w-24 h-24 ml-4 text-large rounded-2xl"
                      />
                      <Chip
                        color={getStatusColor(appointment.status)}
                        className="mt-2 px-3 py-1 capitalize text-white"
                      >
                        {formatStatusText(appointment.status)}
                      </Chip>
                    </div>

                    <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-1">
                        <p className="text-sm text-gray-500">Điều dưỡng</p>
                        <p className="font-medium text-gray-900">
                          {appointment.nurse_name}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-gray-500">Số điện thoại</p>
                        <p className="font-medium text-gray-900">
                          {appointment.phone_number}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-gray-500">Dịch vụ</p>
                        <div className="flex flex-wrap gap-2">
                          {appointment.techniques
                            .split("-")
                            .slice(0, 2)
                            .map((technique, index) => {
                              const colors = [
                                "bg-cyan-500",
                                "bg-emerald-500",
                                "bg-rose-500",
                                "bg-amber-500",
                                "bg-indigo-500",
                                "bg-violet-500",
                              ];
                              const randomColor =
                                colors[
                                  Math.floor(Math.random() * colors.length)
                                ];

                              return (
                                <div
                                  key={index}
                                  className={`px-3 py-1 font-medium text-white rounded-full ${randomColor}`}
                                >
                                  {technique.trim()}
                                </div>
                              );
                            })}

                          {appointment.techniques.split("-").length > 2 && (
                            <Tooltip
                              content={
                                <div className="flex flex-col items-center">
                                  <p className="mb-2 text-gray-600 font-medium">
                                    Ấn vào xem chi tiết để xem thêm
                                  </p>
                                </div>
                              }
                              placement="top"
                              className="cursor-pointer"
                            >
                              <div className="px-3 py-1 font-medium text-white bg-indigo-300 rounded-full">
                                ...
                              </div>
                            </Tooltip>
                          )}
                        </div>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-gray-500">Tổng tiền</p>
                        <p className="font-medium text-gray-900">
                          {Number(appointment.total_fee).toLocaleString(
                            "vi-VN"
                          )}{" "}
                          VND
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-gray-500">Ngày hẹn</p>
                        <p className="font-medium text-gray-900">
                          {dayjs(appointment.appointment_date).format(
                            "DD/MM/YYYY"
                          )}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-gray-500">Thời gian</p>
                        <p className="font-medium text-gray-900">
                          {appointment.time_from_to}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-center md:justify-end">
                      <Button
                        size="md"
                        className="bg-indigo-300 text-white hover:bg-indigo-500 transition-colors mr-2"
                        endContent={<EyeFilledIcon className="w-4 h-4" />}
                        onClick={() => handleViewDetail(appointment.id)}
                      >
                        Xem chi tiết
                      </Button>
                      <Button
                        size="md"
                        className=" text-white  transition-colors"
                        onClick={() => handleOpenModal(appointment)}
                      >
                        Feedback
                      </Button>
                    </div>
                  </div>
                </CardBody>
              </Card>
            ))
          ) : (
            <div className="text-center py-12">
              <Calendar />
              <p className="text-gray-600 font-medium">
                {selectedPatientId
                  ? "Không có lịch hẹn nào đã đặt"
                  : "Vui lòng chọn bệnh nhân để xem lịch hẹn"}
              </p>
            </div>
          )}
        </div>
      </div>
      {selectedScheduleId && (
        <AppointmentModal
          isOpen={appointmentModal.isOpen}
          onOpenChange={appointmentModal.onOpenChange}
          selectedScheduleId={selectedScheduleId}
          role="customer"
        />
      )}

<Modal
        isOpen={feedbackModal.isOpen}
        onOpenChange={feedbackModal.onOpenChange}
        classNames={{
          backdrop:
            "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>
                Feedback cho {selectedPatient?.nurse_name}
              </ModalHeader>
              <ModalBody className="space-y-4">
                <div className="flex flex-col items-center space-y-2">
                  <p className="text-gray-600 font-medium">
                    Đánh giá điều dưỡng
                  </p>
                  <StarRating 
                    onRateChange={(rating) => setRating(rating)}
                    initialRating={0}
                  />
                </div>
                <Textarea
                  placeholder="Viết đánh giá của bạn tại đây..."
                  rows={4}
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                />
              </ModalBody>
              <ModalFooter>
                <Button onPress={onClose} color="danger" variant="faded">
                  Hủy
                </Button>
                <Button
                  onPress={handleSubmitFeedback}
                  color="primary"
                  variant="solid"
                  isDisabled={rating === 0 || feedback.trim() === ""}
                >
                  Gửi Feedback
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default HistoryTransaction;
