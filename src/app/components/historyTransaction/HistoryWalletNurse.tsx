"use client";
import paymentApiRequest from "@/apiRequests/payment/payment";
import { WalletTransaction } from "@/types/payment";
import { Card, CardBody, CircularProgress } from "@nextui-org/react";
import { useEffect, useState } from "react";

const HistoryWalletNurse: React.FC<{ nurseId: string | undefined }> = ({
  nurseId,
}) => {
  const [transactions, setTransactions] = useState<WalletTransaction[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!nurseId) {
        return;
      }
      setLoading(true);

      try {
        const response = await paymentApiRequest.getWalletTransaction(nurseId);
        setTransactions(response.payload.data);
      } catch (error) {
        console.error("Error fetching wallet transactions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [nurseId]);

  const filterTransactions = (type: "deposit" | "deduction") => {
    return transactions.filter((transaction) => transaction.type === type);
  };

  return (
    <div>
      {/* Section for Deposits */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-2">Lịch sử Nạp Tiền</h3>
        {loading ? (
          <div className="flex justify-center">
            <CircularProgress size="lg" color="primary" />
          </div>
        ) : (
          filterTransactions("deposit").map((transaction) => (
            <Card key={transaction.id} className="mb-4">
              <CardBody>
                <div className="mt-2">
                  <p className="mb-4">
                    <strong>Thời gian giao dịch: </strong>
                    {new Date(transaction.created_at).toLocaleString("vi-VN", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                  <p className="mb-4">
                    <strong>Chi tiết:</strong> {transaction.detail}
                  </p>
                  <p className="mb-2">
                    <strong>Số tiền nạp vào:</strong>{" "}
                    <span className="font-bold text-red-500">
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(transaction.amount)}
                    </span>
                  </p>
                </div>
              </CardBody>
            </Card>
          ))
        )}
      </div>

      {/* Section for Deductions */}
      <div>
        <h3 className="text-xl font-semibold mb-2">Lịch sử Trừ Tiền</h3>
        {loading ? (
          <div className="flex justify-center">
            <CircularProgress size="lg" color="primary" />
          </div>
        ) : (
          filterTransactions("deduction").map((transaction) => (
            <Card key={transaction.id} className="mb-4">
              <CardBody>
                <div className="mt-2">
                  <p className="mb-4">
                    <strong>Thời gian giao dịch: </strong>
                    {new Date(transaction.created_at).toLocaleString("vi-VN", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                  <p className="mb-4">
                    <strong>Chi tiết:</strong> {transaction.detail}
                  </p>

                  <p className="mb-2">
                    <strong>Số tiền bị trừ đi:</strong>{" "}
                    <span className="font-bold text-red-500">
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(transaction.amount)}
                    </span>
                  </p>
                </div>
              </CardBody>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default HistoryWalletNurse;
