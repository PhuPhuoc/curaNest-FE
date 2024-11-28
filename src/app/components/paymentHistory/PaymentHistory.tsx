"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  Pagination,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  ChipProps,
} from "@nextui-org/react";
import { walletHistoryTransaction } from "@/types/payment";
import paymentApiRequest from "@/apiRequests/payment/payment";

const PaymentHistory = () => {
  const [loading, setLoading] = useState(false);
  const [historyList, setHistoryList] = useState<walletHistoryTransaction[]>(
    []
  );

  async function fetchHistoryTransactionList() {
    setLoading(true);
    try {
      const response = await paymentApiRequest.getAddlWalletTransaction();
      setHistoryList(response.payload.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchHistoryTransactionList();
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 14;

  const currentData = historyList.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const getStatusLabel = (
    type: string
  ): { label: string; color: ChipProps["color"] } => {
    switch (type) {
      case "deposit":
        return { label: "Nạp tiền", color: "success" };
      case "deduction":
        return { label: "Phí giao dịch", color: "warning" };
      default:
        return { label: "Không xác định", color: "default" };
    }
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  return (
    <div>
      {loading ? (
        <div>Đang tải...</div>
      ) : (
        <Table
          aria-label="Payment History Table"
          bottomContent={
            <div className="flex w-full justify-center">
              <Pagination
                isCompact
                showControls
                showShadow
                size="lg"
                color="secondary"
                total={Math.ceil(historyList.length / rowsPerPage)}
                page={currentPage}
                onChange={(page) => setCurrentPage(page)}
              />
            </div>
          }
        >
          <TableHeader>
            <TableColumn className="text-lg">STT</TableColumn>
            <TableColumn className="text-lg">Loại giao dịch</TableColumn>
            <TableColumn className="text-lg max-w-[50%]">Nội dung</TableColumn>
            <TableColumn className="text-lg">Số tiền (VND)</TableColumn>
            <TableColumn className="text-lg w-[20%]">Thời gian</TableColumn>
            <TableColumn className="text-lg w-[20%]">Trạng thái</TableColumn>
          </TableHeader>
          <TableBody emptyContent={"Không có giao dịch hiện tại"}>
            {currentData.map((item, index) => {
              const status = getStatusLabel(item.type);
              return (
                <TableRow key={item.id}>
                  <TableCell className="text-lg">
                    {(currentPage - 1) * rowsPerPage + index + 1}
                  </TableCell>
                  <TableCell className="text-lg">{status.label}</TableCell>
                  <TableCell className="text-lg">{item.detail}</TableCell>
                  <TableCell className="text-lg">
                    {item.amount.toLocaleString("vi-VN")}
                  </TableCell>
                  <TableCell className="text-lg">
                    {formatDate(item.created_at)}
                  </TableCell>
                  <TableCell className="text-lg w-[10%]">
                    <Chip color={status.color} className="text-white" size="lg">
                      {status.label}
                    </Chip>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default PaymentHistory;
