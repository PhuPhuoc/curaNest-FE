'use client';
import React, { useState } from "react";
import { Chip, Breadcrumbs, BreadcrumbItem, Button, DateValue } from "@nextui-org/react";
import { getLocalTimeZone, today } from "@internationalized/date";
import { toast } from 'react-toastify';
import { useRouter } from "next/navigation";
import DateTime from "@/app/components/bookingNurse/DateTime";

function Booking(props: any) {
  const router = useRouter();

  const { params } = props;
  const id = params.id;

  const [selectedChips, setSelectedChips] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<DateValue | null>(today(getLocalTimeZone()));
  const [selectedTime, setSelectedTime] = useState<string[] | null>(null);

  const chipValues: { [key: string]: number } = {
    "Thay băng": 50000,
    "Tiêm thuốc": 75000,
    "Khám bệnh": 100000,
    "Tư vấn": 120000,
  };

  const chips: string[] = Object.keys(chipValues);

  const colors: { [key: string]: string } = {
    "Thay băng": "bg-purple-500 text-white",
    "Tiêm thuốc": "bg-green-500 text-white",
    "Khám bệnh": "bg-sky-500 text-white",
    "Tư vấn": "bg-orange-500 text-white",
  };

  const handleChipClick = (chip: string) => {
    if (selectedChips.includes(chip)) {
      setSelectedChips(selectedChips.filter((item) => item !== chip));
    } else {
      setSelectedChips([...selectedChips, chip]);
    }
  };

  // Handle Date
  const handleDateChange = (date: DateValue | null) => {
    setSelectedDate(date);
  };

  // Handle Time
  const handleTimeChange = (time: string[] | null) => {
    setSelectedTime(time);
  };

  // Total price of selected Chips
  const totalPrice = selectedChips.reduce((total, chip) => total + (chipValues[chip] || 0), 0);

  // Handle Reset
  const handleReset = () => {
    setSelectedChips([]);
    setSelectedDate(today(getLocalTimeZone()));
    setSelectedTime([]);
  };

  // Handle Submit
  const handleSubmit = () => {
    if (!selectedDate || !selectedTime || selectedChips.length === 0) {
      toast.error("Vui lòng chọn đầy đủ thông tin (Ngày, Giờ và Dịch vụ) trước khi đặt lịch.");
      return;
    }

    const bookingData = {
      id,
      services: selectedChips,
      date: selectedDate,
      time: selectedTime,
      total: totalPrice,
    };
    console.log(bookingData);

    toast.success("Đặt lịch thành công!");
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className="p-4">
      <Breadcrumbs className="mb-4">
        <BreadcrumbItem href="/user/patientProfile">Hồ sơ bệnh nhân</BreadcrumbItem>
        <BreadcrumbItem>Đặt lịch</BreadcrumbItem>
      </Breadcrumbs>

      <div className="flex flex-col md:flex-row">
        {/* Left side*/}
        <div className="md:w-2/3 p-4 border border-gray-300 rounded">

          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">Các dịch vụ đã chọn</h3>

            <Button
              className="mr-4"
              onClick={handleReset}
              color="danger"
              size="lg"
            >
              Đặt lại
            </Button>
          </div>
          
          {selectedChips.length > 0 ? (
            <div className="flex flex-wrap gap-1">
              {selectedChips.map((chip, index) => (
                <Chip
                  key={index}
                  className={`m-1 ${colors[chip]}`}
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

          {/* Component Date&Time */}
          <div>
            <DateTime
              selectedDate={selectedDate}
              selectedTime={selectedTime || []}
              onDateChange={handleDateChange}
              onTimeChange={handleTimeChange}
            />
          </div>

          {/*Total Price of Chip */}
          {totalPrice > 0 && (
            <div className="mt-4 p-4 border-t border-gray-300 flex justify-end items-end">
              <div>
                <h4 className="text-xl font-semibold">Tổng phí:</h4>
                <p className="text-2xl">{totalPrice.toLocaleString()} VNĐ</p>
              </div>
            </div>
          )}

          {/* Submit & Back Button */}
          <div className="mt-2 flex justify-end">
            <Button
              className="mr-3"
              onClick={handleGoBack}
              size="lg"
            >
              <svg className="w-4 h-4 text-black dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5H1m0 0 4 4M1 5l4-4" />
              </svg>
              Quay lại
            </Button>

            <Button
              color="primary"
              onClick={handleSubmit}
              size="lg"
              disabled={!selectedDate || !selectedTime || selectedChips.length === 0}
            >
              Đặt lịch
            </Button>
          </div>
        </div>

        <div className="w-1 border-l border-gray-300 mx-4"></div>

        {/* Right Side */}
        <div className="md:w-1/3 p-4 flex flex-col">
          <p className="text-xl font-semibold mb-2">Hãy chọn loại dịch vụ</p>
          <div className="flex flex-wrap">
            {chips
              .filter((chip) => !selectedChips.includes(chip)) 
              .map((chip, index) => (
                <Chip
                  key={index}
                  className={`m-1 p-1 rounded-full border ${colors[chip] || 'bg-gray-200 text-gray-700'}`}
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
  );
}

export default Booking;