import React from "react";
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
import { Typography } from "antd";
const { Text } = Typography;

const AppointmentModal = ({ isOpen, onOpenChange, selectedSchedule }: any) => {
  if (!selectedSchedule) return null;

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size="4xl"
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

            <ModalBody className="p-6">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex flex-col items-center">
                  <Avatar
                    src="https://thumbs.dreamstime.com/b/cat-gun-pointed-s-face-ai-cat-gun-pointed-s-face-ai-generated-307980031.jpg"
                    className="w-32 h-32 md:w-40 md:h-40 rounded-md shadow-lg"
                  />
                  <Chip className="mt-4 text-lg md:text-xl font-semibold text-white p-4 bg-[#00E5EE]">
                    {selectedSchedule.patientName}
                  </Chip>
                  <Text
                    style={{
                      fontWeight: 700,
                      fontSize: 18,
                      marginTop: 10,
                      textAlign: "center",
                    }}
                  >
                    Dịch vụ
                  </Text>
                  <div className="flex flex-wrap gap-4 mt-4 max-w-full md:max-w-[230px] max-h-[150px] overflow-y-auto">
                    {["Thay băng", "Tiêm thuốc"].map((service, index) => (
                      <Chip
                        key={index}
                        className={`font-semibold text-white p-2 ${
                          service === "Thay băng"
                            ? "bg-[#FF639F]"
                            : "bg-[#FADFA1]"
                        }`}
                        size="sm"
                      >
                        {service}
                      </Chip>
                    ))}
                  </div>
                </div>

                <div className="flex-1 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-sm text-gray-500">Ngày sinh</label>
                      <p className="font-medium">{selectedSchedule.birthdate}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">Số điện thoại</label>
                      <p className="font-medium">{selectedSchedule.phoneNumber}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-sm text-gray-500">Thời gian</label>
                      <p className="font-medium">
                        {selectedSchedule.startTime} - {selectedSchedule.endTime}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">Ngày hẹn</label>
                      <p className="font-medium">{selectedSchedule.date}</p>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm text-gray-500">Địa chỉ</label>
                    <p className="font-medium">{selectedSchedule.address}</p>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg">
                    <label className="text-sm text-gray-500">Mô tả</label>
                    <p className="font-medium">{selectedSchedule.description}</p>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg">
                    <label className="text-sm text-gray-500">Lưu ý</label>
                    <p className="font-medium">{selectedSchedule.notes}</p>
                  </div>
                </div>
              </div>
            </ModalBody>

            <ModalFooter className="border-t">
              <Button color="primary" onPress={onClose}>
                Xác nhận
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default AppointmentModal;
