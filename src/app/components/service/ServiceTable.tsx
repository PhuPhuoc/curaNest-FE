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
  Input as TimeInput,
  Spinner,
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
          <TableColumn className="text-lg">Hành động</TableColumn>
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
              <TableCell className="text-lg">
                <Button
                  size="md"
                  color="warning"
                  className="text-white font-bold text-lg"
                >
                  Sửa thông tin
                </Button>
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
              <TimeInput
                size="lg"
                type="time"
                label="Thời gian dự kiến"
                placeholder="HH:MM"
                variant="bordered"
                value={createFormData.estimated_time}
                onChange={(e) => handleTimeChange(e.target.value)}
                isInvalid={timeError}
                errorMessage={
                  timeError
                    ? "Vui lòng nhập đúng định dạng thời gian (HH:MM)"
                    : ""
                }
                style={{ fontSize: 20 }}
                classNames={{
                  label: "text-[20px] font-bold mb-4",
                }}
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
      <style jsx global>{`
        input[type="time"]::-webkit-datetime-edit-ampm-field {
          display: none;
        }

        input[type="time"] {
          width: 100%;
        }
        input[type="time"]::-webkit-calendar-picker-indicator {
          background: none;
        }
      `}</style>
    </>
  );
};

export default ServiceTable;
