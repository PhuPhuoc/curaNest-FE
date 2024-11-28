"use client";
import nurseApiRequest from "@/apiRequests/nurse/nurse";
import { formatDateVN, generateColor } from "@/lib/utils";
import {
  Card,
  CardHeader,
  CardBody,
  Chip,
  Avatar,
  CircularProgress,
} from "@nextui-org/react";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

const HistoryTransactionNurse: React.FC<{ nurseId: string | undefined }> = ({
  nurseId,
}) => {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchScheduleData = async () => {
      if (!nurseId) return;

      setLoading(true);

      const from = dayjs().startOf("month").format("YYYY-MM-DD");
      const to = dayjs().endOf("month").format("YYYY-MM-DD");

      try {
        const response = await nurseApiRequest.nurseScheduleCard(
          nurseId,
          "nurse",
          from,
          to
        );
        console.log("API Response:", response);
        console.log("Payload Data:", response?.payload?.data);

        setTransactions(response.payload.data); 
      } catch (error) {
        console.error("Error fetching schedule data:", error); 
      } finally {
        setLoading(false);
      }
    };

    fetchScheduleData();
  }, [nurseId]);


  const getChipColor = (status: string) => {
    switch (status) {
      case "completed":
        return "success";
      case "cancel":
        return "warning";
      case "Thất bại":
        return "danger";
      default:
        return "default";
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <CircularProgress size="lg" color="primary" />
      </div>
    );
  }

  return (
    <div>
      {transactions.length > 0 ? (
        transactions.map((transaction) => (
          <Card key={transaction.id} className="mb-4 w-full">
            <CardHeader>
              <div className="flex items-center">
                <Avatar
                  src={transaction.avatar}
                  style={{ width: "80px", height: "80px", marginRight: "10px" }}
                />
                <div>
                  <h4 className="text-lg font-semibold">
                    {transaction.patient_name}
                  </h4>
                </div>
              </div>
            </CardHeader>

            <CardBody>
              <div className="flex flex-wrap gap-6 mb-4">
                <p>
                  <strong>Ngày đặt:</strong>{" "}
                  {formatDateVN(transaction.appointment_date)}
                </p>
                <p>
                  <strong>Thời gian:</strong> {transaction.time_from_to}
                </p>
                <p>
                  <strong>Số điện thoại:</strong> {transaction.patient_phone}
                </p>
              </div>

              <p className="mb-4">
                <strong>Loại dịch vụ: </strong>
                <Chip
                  key={transaction.id}
                  className="text-white font-bold py-2"
                  size="md"
                  style={{ backgroundColor: generateColor(transaction.id) }}
                >
                  {transaction.techniques}
                </Chip>
              </p>

              <p className="mb-4">
                    <strong>Tổng chi phí: </strong>
                    <span className="font-bold text-red-500">
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(transaction.total_fee)}
                    </span>
                  </p>

              <p>
                <strong>Trạng thái giao dịch: </strong>
                <Chip
                  className="text-white"
                  color={getChipColor(transaction.status)}
                >
                  {transaction.status}
                </Chip>
              </p>
            </CardBody>
          </Card>
        ))
      ) : (
        <p className="text-center mt-4">Không có giao dịch nào.</p>
      )}
    </div>
  );
};

export default HistoryTransactionNurse;
