"use client";
import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Avatar,
  Chip,
} from "@nextui-org/react";
import { Divider, Typography } from "antd";
import { DetailSchedule } from "@/types/nurse";
import nurseApiRequest from "@/apiRequests/nurse/nurse";
import dayjs from "dayjs";
import Check from "@/app/Icon/Check";
import Clock from "@/app/Icon/Clock";
import Cancel from "@/app/Icon/Cancel";
import { toast } from "react-toastify";
const { Text } = Typography;
function calculateAge(dob: string): number {
  const birthDate = new Date(dob);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();
  const dayDifference = today.getDate() - birthDate.getDate();

  if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
    age--;
  }

  return age;
}

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function formatCurrencyVND(value: number): string {
  return value.toLocaleString("vi-VN") + " VND";
}

const AppointmentModal = ({
  isOpen,
  onCloseModal,
  onOpenChange,
  selectedScheduleId,
  role,
}: any) => {
  const [detailList, setDetailList] = useState<DetailSchedule>();
  console.log("🚀 ~ detailList:", detailList);

  async function fetchDetailSchedule(id: string) {
    try {
      if (id) {
        const response = await nurseApiRequest.detailScheduleWork(id);
        setDetailList(response.payload.data);
      }
    } catch (error) {
      console.error("Error fetching techniques:", error);
    }
  }

  useEffect(() => {
    if (selectedScheduleId) {
      fetchDetailSchedule(selectedScheduleId);
    }
  }, [selectedScheduleId]);

  async function handleConfirmOrCancel(confirm: string) {
    try {
      if (confirm) {
        const response = await nurseApiRequest.confirmOrCancelSchedule(
          selectedScheduleId,
          confirm
        );
        toast.success(response.payload.message);
        fetchDetailSchedule(selectedScheduleId);
      }
    } catch (error) {
      console.error("Error fetching techniques:", error);
    }
  }

  async function handleConfirmFinish() {
    try {
      if (selectedScheduleId) {
        const response = await nurseApiRequest.confirmFinishSchedule(
          selectedScheduleId
        );
        toast.success(response.payload.message);
        fetchDetailSchedule(selectedScheduleId);
      }
    } catch (error) {
      console.error("Error fetching techniques:", error);
    }
  }

  function handleClose(close: () => void) {
    close();
    if (role === "nurse") {
      onCloseModal();
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      style={{ width: "100%", maxWidth: "84vw" }}
      className="bg-white sm:top-40 md:top-0"
      classNames={{
        backdrop:
          "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="border-b">
              <h2 className="text-xl font-bold">Chi tiết lịch hẹn</h2>
            </ModalHeader>

            <ModalBody className="p-6 flex flex-row w-full">
              <div className="flex flex-col w-[70%] gap-20">
                <Text className="text-2xl">Thông tin bệnh nhân</Text>
                <div className="flex flex-col md:flex-row gap-8 w-full items-center">
                  <div className="flex flex-col items-center">
                    <Avatar
                      src={detailList?.patient_infomation.avatar}
                      className="w-32 h-32 md:w-40 md:h-40 rounded-md shadow-lg"
                    />
                    <Chip className="mt-4 text-lg md:text-xl font-semibold text-white p-4 bg-[#00E5EE]">
                      {detailList?.patient_infomation.full_name}
                    </Chip>
                  </div>

                  <div className="flex-1 space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="text-xl text-gray-500">
                          Ngày sinh
                        </label>
                        <p className="font-medium">
                          {dayjs(detailList?.patient_infomation.dob).format(
                            "DD/MM/YYYY"
                          )}
                        </p>
                      </div>
                      <div>
                        <label className="text-xl text-gray-500">
                          Số điện thoại
                        </label>
                        <p className="font-medium">
                          {detailList?.patient_infomation.phone_number}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="text-xl text-gray-500">Tuổi</label>
                        <p className="font-medium">
                          {detailList?.patient_infomation.dob
                            ? calculateAge(detailList?.patient_infomation.dob)
                            : 0}
                        </p>
                      </div>
                      <div>
                        <label className="text-xl text-gray-500">
                          Ngày hẹn
                        </label>
                        <p className="font-medium">
                          {dayjs(
                            detailList?.appointment_information.appointment_date
                          ).format("DD/MM/YYYY")}
                        </p>
                      </div>
                    </div>

                    <div>
                      <label className="text-xl text-gray-500">Địa chỉ</label>
                      <p className="font-medium">
                        {detailList?.patient_infomation.address}
                        {detailList?.patient_infomation.ward
                          ? `, phường ${detailList?.patient_infomation.ward}`
                          : ""}
                        {detailList?.patient_infomation.district
                          ? `, quận ${detailList?.patient_infomation.district}`
                          : ""}
                        {detailList?.patient_infomation.city
                          ? `, ${detailList?.patient_infomation.city}`
                          : ""}
                      </p>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-lg">
                      <label className="text-xl text-gray-500 ">Mô tả</label>
                      <p className="font-medium mt-2">
                        {detailList?.patient_infomation.medical_description}
                      </p>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-lg">
                      <label className="text-xl text-gray-500">Lưu ý</label>
                      <p className="font-medium mt-2">
                        {detailList?.patient_infomation.note_for_nurses}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <Divider type="vertical" className="bg-gray-400 h-auto" />
              <div className="flex flex-col w-[30%] gap-20">
                <Text className="text-2xl">
                  Thông tin điều dưỡng và lịch hẹn
                </Text>

                <div className="flex flex-col gap-8 w-full">
                  <div className="flex flex-col items-center">
                    <Avatar
                      src={detailList?.nurse_information.avatar}
                      className="w-32 h-32 md:w-40 md:h-40 rounded-md shadow-lg"
                    />
                    <Chip className="mt-4 text-lg md:text-xl font-semibold text-white p-4 bg-emerald-400 mb-2">
                      {detailList?.nurse_information.nurse_name}
                    </Chip>
                    <div>
                      <p className="font-medium text-lg">
                        {detailList?.nurse_information.phone_number}
                      </p>
                    </div>
                  </div>
                  <div className="flex-1 space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                      <div className="flex items-center">
                        <label className="text-lg text-gray-500">
                          Lịch hẹn ngày:
                        </label>
                        <p className="font-medium text-lg ml-2">
                          {dayjs(
                            detailList?.appointment_information.appointment_date
                          ).format("DD/MM/YYYY")}
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 gap-6">
                      <div className="flex items-center">
                        <label className="text-lg text-gray-500">
                          Thời gian:
                        </label>
                        <p className="font-medium text-lg ml-2">
                          {detailList?.appointment_information.time_from_to}
                        </p>
                      </div>
                      <div className="flex items-center">
                        <label className="text-lg text-gray-500">
                          Trạng thái:
                        </label>
                        <p
                          className={`font-medium text-lg ml-2 flex items-center gap-2`}
                        >
                          {detailList?.appointment_information.status ===
                          "pending" ? (
                            <>
                              <Clock />
                              <span className="text-amber-500">
                                Chờ xác nhận
                              </span>
                            </>
                          ) : detailList?.appointment_information.status ===
                            "completed" ? (
                            <>
                              <Check />
                              <span className="text-emerald-500">
                                Đã hoàn thành lịch hẹn
                              </span>
                            </>
                          ) : (
                            <>
                              <Check />
                              <span className="text-emerald-500">
                                Đã xác nhận
                              </span>
                            </>
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="items-center">
                      <label className="text-lg text-gray-500">
                        Dịch vụ đã đăng kí:
                      </label>
                      <div className="flex flex-wrap gap-4 mt-4 max-w-full md:max-w-[400px]">
                        {detailList?.appointment_information.techniques
                          ?.split("-")
                          .map((service, index) => (
                            <Chip
                              key={index}
                              className={`font-bold text-[#fff] p-2`}
                              style={{
                                backgroundColor: getRandomColor(),
                              }}
                              size="lg"
                            >
                              {service.trim()}
                            </Chip>
                          ))}
                      </div>
                    </div>
                    <div className="flex flex-col justify-end items-end">
                      <label className="text-lg text-gray-500">
                        Tổng số tiền
                      </label>
                      <p className="font-medium text-lg mt-1">
                        {detailList?.appointment_information.total_fee
                          ? formatCurrencyVND(
                              detailList?.appointment_information.total_fee
                            )
                          : "0 VND"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </ModalBody>

            <ModalFooter className="border-t">
              {role === "nurse" &&
                detailList?.appointment_information.status !== "confirmed" &&
                detailList?.appointment_information.status !== "completed" &&
                detailList?.appointment_information.status !== "cancel" && (
                  <>
                    <Button
                      size="lg"
                      color="success"
                      className="text-white"
                      onClick={() => handleConfirmOrCancel("confirmed")}
                      startContent={
                        <div className="text-white bg-white rounded-lg">
                          <Check />
                        </div>
                      }
                    >
                      Xác nhận lịch hẹn
                    </Button>
                    <Button
                      size="lg"
                      color="danger"
                      onClick={() => handleConfirmOrCancel("cancel")}
                      startContent={
                        <div className="text-white bg-white rounded-lg">
                          <Cancel />
                        </div>
                      }
                    >
                      Hủy bỏ lịch hẹn
                    </Button>
                  </>
                )}
              {role === "nurse" &&
                detailList?.appointment_information.status === "confirmed" && (
                  <>
                    <Button
                      size="lg"
                      color="success"
                      className="text-white"
                      onClick={() => handleConfirmFinish()}
                      startContent={
                        <div className="text-white bg-white rounded-lg">
                          <Check />
                        </div>
                      }
                    >
                      Xác nhận hoàn thành
                    </Button>
                  </>
                )}

              <Button
                size="lg"
                color="primary"
                onPress={() => handleClose(onClose)}
              >
                Thoát
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default AppointmentModal;
