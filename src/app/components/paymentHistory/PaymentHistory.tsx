"use client";
import React, { useState } from "react";
import {
  Table,
  Pagination,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip, // Import the Chip component
} from "@nextui-org/react";

interface PaymentData {
  id: number;
  transactionName: string;
  content: string;
  status: string;
}

const PaymentHistory = () => {
  const data: PaymentData[] = [
    {
      id: 1,
      transactionName: "Giao dịch 1",
      content: "Nội dung 1",
      status: "Hoàn thành",
    },
    {
      id: 2,
      transactionName: "Giao dịch 2",
      content: "Nội dung 2",
      status: "Đang xử lý",
    },
    {
      id: 3,
      transactionName: "Giao dịch 3",
      content: "Nội dung 3",
      status: "Hủy",
    },
    {
      id: 4,
      transactionName: "Giao dịch 4",
      content: "Nội dung 4",
      status: "Hoàn thành",
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 14;

  const currentData = data.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Hoàn thành":
        return "success";
      case "Đang xử lý":
        return "warning";
      case "Hủy":
        return "danger"; // Use "danger" instead of "error"
      default:
        return "default";
    }
  };

  return (
    <div>
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
              total={data.length}
              page={currentPage}
              onChange={(page) => setCurrentPage(page)}
            />
          </div>
        }
      >
        <TableHeader>
          <TableColumn className="text-lg">STT</TableColumn>
          <TableColumn className="text-lg">Tên giao dịch</TableColumn>
          <TableColumn className="text-lg max-w-[50%]">Nội dung</TableColumn>
          <TableColumn className="text-lg w-[20%]">Trạng thái</TableColumn> 
        </TableHeader>
        <TableBody emptyContent={"Không có giao dịch hiện tại"}>
          {currentData.map((item, index) => (
            <TableRow key={item.id}>
              <TableCell className="text-lg">
                {(currentPage - 1) * rowsPerPage + index + 1}
              </TableCell>
              <TableCell className="text-lg">{item.transactionName}</TableCell>
              <TableCell className="text-lg w-[30%]">{item.content}</TableCell>
              <TableCell className="text-lg w-[10%]">
                <Chip color={getStatusColor(item.status)} className="text-white" size="lg">
                  {item.status}
                </Chip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PaymentHistory;
