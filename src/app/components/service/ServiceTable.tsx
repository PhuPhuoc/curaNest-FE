"use client";
import techniqueApiRequest from "@/apiRequests/technique/technique";
import Plus from "@/app/Icon/Plus";
import { FormData, Technique } from "@/types/technique";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableColumn,
  Button,
  Pagination,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Spinner,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

const formatNumber = (value: number) => {
  return value.toLocaleString("vi-VN");
};

const validateTime = (time: string): boolean => {
  const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
  return timeRegex.test(time);
};

const TimeSelectInput = ({ value, onChange, isInvalid, errorMessage }: any) => {
  const hours = Array.from({ length: 24 }, (_, i) =>
    i < 10 ? `0${i}` : i.toString()
  ).filter((hour) => hour !== "00");
  const minutes = ["00", "15", "30", "45"];

  const handleHourChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const updatedTime = `${e.target.value}:${value.split(":")[1]}`;
    onChange(updatedTime);
  };

  const handleMinuteChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const updatedTime = `${value.split(":")[0]}:${e.target.value}`;
    onChange(updatedTime);
  };

  return (
    <div className="flex flex-col gap-4 mx-2">
      <div className="text-xl font-bold">Chọn số giờ</div>
      <div className="flex gap-4 items-center">
        <div className="flex flex-col w-1/2">
          <Select
            variant="underlined"
            label="Giờ"
            value={value.split(":")[0]}
            onChange={handleHourChange}
            aria-label="Select Hour"
            defaultSelectedKeys={["01"]}
            style={{ fontSize: 20 }}
          >
            {hours.map((hour) => (
              <SelectItem key={hour} value={hour}>
                {hour}
              </SelectItem>
            ))}
          </Select>
        </div>
        <span className="text-2xl">:</span>
        <div className="flex flex-col w-1/2">
          <Select
            label="Phút"
            variant="underlined"
            value={value.split(":")[1]}
            onChange={handleMinuteChange}
            aria-label="Select Minute"
            defaultSelectedKeys={["00"]}
            style={{ fontSize: 20 }}
          >
            {minutes.map((minute) => (
              <SelectItem key={minute} value={minute}>
                {minute}
              </SelectItem>
            ))}
          </Select>
        </div>
      </div>
      {isInvalid && (
        <div className="text-red-500 text-sm mt-1">{errorMessage}</div>
      )}
    </div>
  );
};

const ServiceTable = () => {
  const [techniques, setTechniques] = useState<Technique[]>([]);
  const [page, setPage] = useState(1);
  const rowsPerPage = 14;
  const pages = Math.ceil(techniques?.length / rowsPerPage);
  const [loading, setLoading] = useState(false);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return techniques?.slice(start, end);
  }, [page, techniques]);

  // Fetch techniques from API
  async function fetchTechniques() {
    setLoading(true);
    try {
      const response = await techniqueApiRequest.getTechnique();
      setTechniques(response.payload.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching techniques:", error);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchTechniques();
  }, []);

  // Form data and validation states
  const [feeError, setFeeError] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [createFormData, setCreateFormData] = useState<FormData>({
    name: "",
    fee: "",
    estimated_time: "01:00",
  });

  const [timeError, setTimeError] = useState(false);

  const handleCreateModalOpen = () => {
    setCreateModalOpen(true);
  };

  const handleCreateModalClose = () => {
    setCreateModalOpen(false);
    setCreateFormData({ name: "", fee: "", estimated_time: "01:00" });
    setTimeError(false);
    setFeeError(false);
    fetchTechniques();
  };

  const handleCreateSubmit = async () => {
    if (!validateTime(createFormData.estimated_time)) {
      setTimeError(true);
      return;
    }

    const feeNumeric = createFormData.fee.replace(/\D/g, "");
    if (feeNumeric.length < 4) {
      setFeeError(true);
      return;
    }

    const feeAsNumber = parseInt(feeNumeric, 10);
    const finalData = {
      ...createFormData,
      fee: feeAsNumber,
    };
    try {
      const result = await techniqueApiRequest.createTechnique(finalData);
      toast.success(result.payload.message);
      handleCreateModalClose();
    } catch (error: any) {
      console.log("🚀 ~ handleCreateSubmit ~ error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFeeInputChange = (value: string) => {
    const numericValue = value.replace(/[^\d]/g, "");
    const formattedValue = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    if (numericValue.length < 4) {
      setFeeError(true);
    } else {
      setFeeError(false);
    }

    setCreateFormData((prev) => ({
      ...prev,
      fee: formattedValue,
    }));
  };

  const handleTimeChange = (value: string) => {
    setTimeError(false);
    setCreateFormData((prev) => ({
      ...prev,
      estimated_time: value,
    }));
  };

  return (
    <>
      <Table
        aria-label="Service Table"
        style={{
          width: "100%",
          height: "auto",
          minWidth: "100%",
          fontSize: "2rem",
        }}
        topContent={
          <div className="flex w-full justify-start">
            <Button
              onClick={handleCreateModalOpen}
              className="bg-indigo-700 text-white font-bold mr-4 text-lg p-6"
              startContent={<Plus />}
            >
              Thêm mới dịch vụ
            </Button>
          </div>
        }
        bottomContent={
          <div className="flex w-full justify-center">
            <Pagination
              size="lg"
              isCompact
              showControls
              showShadow
              initialPage={1}
              color="secondary"
              page={page}
              total={pages}
              onChange={(page) => setPage(page)}
            />
          </div>
        }
      >
        <TableHeader>
          <TableColumn className="text-lg">ID</TableColumn>
          <TableColumn className="text-lg">Tên dịch vụ</TableColumn>
          <TableColumn className="text-lg">Giá (VND)</TableColumn>
          <TableColumn className="text-lg">Số giờ</TableColumn>
        </TableHeader>
        <TableBody
          emptyContent={"Không có dịch vụ hiện tại"}
          isLoading={loading}
          loadingContent={<Spinner size="lg" label="Loading..." />}
        >
          {items.map((service, index) => (
            <TableRow key={index}>
              <TableCell className="text-lg">{index + 1}</TableCell>
              <TableCell className="text-lg">{service.name}</TableCell>
              <TableCell className="text-lg">
                {formatNumber(service.fee)}
              </TableCell>
              <TableCell className="text-lg">
                {service.estimated_time}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Modal
        isOpen={createModalOpen}
        onClose={handleCreateModalClose}
        size="xl"
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1 text-xl">
            Tạo dịch vụ mới
          </ModalHeader>
          <ModalBody>
            <div className="flex flex-col gap-4">
              <Input
                size="lg"
                label="Tên dịch vụ"
                placeholder="Nhập tên dịch vụ"
                variant="bordered"
                value={createFormData.name}
                onChange={(e) =>
                  setCreateFormData((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
                style={{ fontSize: 20 }}
                classNames={{ label: "text-[20px] font-bold mb-2" }}
              />
              <Input
                size="lg"
                label="Giá dịch vụ"
                placeholder="Nhập giá dịch vụ"
                variant="bordered"
                value={createFormData.fee}
                onChange={(e) => handleFeeInputChange(e.target.value)}
                endContent={<div className="text-default-400">VND</div>}
                isInvalid={feeError}
                errorMessage={
                  feeError ? "Giá tiền phải ít nhất 4 kí tự bao gồm số 0" : ""
                }
                style={{ fontSize: 20 }}
                classNames={{ label: "text-[20px] font-bold mb-2" }}
              />
              <TimeSelectInput
                value={createFormData.estimated_time}
                onChange={handleTimeChange}
                isInvalid={timeError}
                errorMessage={
                  timeError ? "Vui lòng chọn thời gian đúng định dạng" : ""
                }
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              size="lg"
              color="danger"
              variant="light"
              onPress={handleCreateModalClose}
              className="text-lg font-bold"
            >
              Hủy
            </Button>
            <Button
              isLoading={loading}
              size="lg"
              className="bg-indigo-700 text-white text-lg font-bold"
              onPress={handleCreateSubmit}
            >
              Tạo dịch vụ
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ServiceTable;
