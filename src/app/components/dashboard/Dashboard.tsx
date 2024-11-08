"use client";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Typography } from "antd";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  Chip,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ScrollShadow,
  useDisclosure,
} from "@nextui-org/react";
import { useState } from "react";
import AppointmentModal from "@/app/components/modal/AppointmentModal";
const { Text } = Typography;

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

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

const Dashboard = () => {
  const [selectedSchedule, setSelectedSchedule] = useState<Appointment | null>(
    null
  );
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleOpenModal = (appointment: Appointment) => {
    setSelectedSchedule(appointment);
    onOpen();
  };

  const totalReceivedData = {
    labels: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5"],
    datasets: [
      {
        label: "Tổng số tiền đã nhận",
        data: [1000, 1500, 2000, 2500, 3000],
        borderColor: "#4CAF50",
        backgroundColor: "rgba(76, 175, 80, 0.2)",
        tension: 0.4,
      },
    ],
  };

  const totalWalletData = {
    labels: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5"],
    datasets: [
      {
        label: "Tổng số tiền trong ví",
        data: [500, 1000, 1500, 2000, 2500],
        borderColor: "#FF5722",
        backgroundColor: "rgba(255, 87, 34, 0.2)",
        tension: 0.4,
      },
    ],
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

  return (
    <div>
      <div className="flex flex-col mb-8 gap-2 md:flex-row mt-4 md:mt-0">
        <Card className="w-full max-w-[600px] mt-5 p-2 text-base items-center ">
          <Text className="text-lg font-semibold text-gray-400">
            Doanh thu tháng 11
          </Text>
          <Text className="text-3xl font-bold">200,000 VND</Text>
        </Card>
        <Card className="w-full max-w-[600px] mt-5 p-2 text-base  items-center">
          <Text className="text-lg font-semibold text-gray-400">
            Tổng số còn lại trong ví
          </Text>
          <Text className="text-3xl font-bold">100,000 VND</Text>
        </Card>
      </div>

      <div className="flex flex-col justify-between gap-8 items-center md:flex-row w-full mx-0 md:mx-4">
        <div
          className="shadow-2xl shadow-[#D9D9D9] scale-105 w-[95%] md:w-[60%] p-[10px]"
          style={{
            height: "500px",
            background: "#FFF",
            borderRadius: 20,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: 700,
              color: "#ccc",
            }}
          >
            Lịch hẹn ngày hôm nay {new Date().toISOString().split("T")[0]}
          </Text>
          <ScrollShadow className="w-full h-[450px] p-4">
            {appointments.map((appointment) => (
              <Card
                key={appointment.id}
                style={{
                  marginTop: 10,
                  borderWidth: 2,
                  borderColor: "#000",
                }}
                className="shadow-xl hover:scale-105"
              >
                <CardBody
                  style={{
                    background: "#fff",
                    padding: 10,
                    cursor: "pointer",
                  }}
                  onClick={() => handleOpenModal(appointment)}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "start",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      <Avatar
                        src="https://thumbs.dreamstime.com/b/cat-gun-pointed-s-face-ai-cat-gun-pointed-s-face-ai-generated-307980031.jpg"
                        className="w-10 h-10 rounded-full shadow-lg mr-4"
                      />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <Text style={{ fontWeight: 700, fontSize: 20 }}>
                        {appointment.startTime} - {appointment.endTime}
                      </Text>
                      <Text style={{ fontWeight: 600 }}>
                        {appointment.patientName}
                      </Text>
                    </div>
                  </div>
                </CardBody>
              </Card>
            ))}
          </ScrollShadow>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginRight:26
          }}
        >
          <Card
            style={{
              marginBottom: "20px",
              width: "400px",
              maxWidth: "700px",
              padding: 10,
            }}
          >
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>
              Thống kê số tiền đã nhận theo tháng
            </Text>
            <Line data={totalReceivedData} />
          </Card>
          <Card
            style={{
              width: "400px",
              maxWidth: "600px",
              padding: 10,
              fontWeight: "bold",
              fontSize: 16,
            }}
          >
            <Text>Thống kê số tiền trong ví theo tháng</Text>
            <Line data={totalWalletData} />
          </Card>
        </div>
        <AppointmentModal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          selectedSchedule={selectedSchedule}
        />
      </div>
    </div>
  );
};

export default Dashboard;
