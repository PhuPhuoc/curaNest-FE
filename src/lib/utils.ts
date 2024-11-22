import jwt from "jsonwebtoken";

// export function cn(...inputs: ClassValue[]) {
//   return twMerge(clsx(inputs));
// }

// export const handleErrorApi = ({
//   error,
//   setError,
//   duration,
// }: {
//   error: any;
//   setError?: UseFormSetError<any>;
//   duration?: number;
// }) => {
//   if (error instanceof EntityError && setError) {
//     error.payload.errors.forEach((item) => {
//       setError(item.field, {
//         type: "server",
//         message: item.message,
//       });
//     });
//   } else {
//     toast({
//       title: "Lỗi",
//       description: error?.payload?.message ?? "Lỗi không xác định",
//       variant: "destructive",
//       duration: duration ?? 4000,
//     });
//   }
// };

// /**
//  * Xóa đi ký tự `/` đầu tiên của path
//  */

export const normalizePath = (path: string) => {
  return path.startsWith("/") ? path.slice(1) : path;
};

export const decodeJWT = <Payload = any>(token: string) => {
  return jwt.decode(token) as Payload;
};

export const formatInputDate = (input: string): string => {
  // Extract the date portion after the comma
  const datePart = input.split(",")[1]?.trim();
  if (!datePart) throw new Error("Invalid date format");

  // Split the date into day and month
  const [day, month] = datePart.split("/").map(Number);

  // Create a new Date object
  const now = new Date();
  const year = now.getFullYear(); // Use the current year

  const formattedDate = new Date(year, month - 1, day);

  // Format as YYYY/MM/DD
  return formattedDate.toISOString().split("T")[0].replace(/-/g, "/");
};

export const formatShiftDate = (dateStr: string) => {
  const date = new Date(dateStr.split("/").reverse().join("/"));
  return `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(
    2,
    "0"
  )}/${String(date.getDate()).padStart(2, "0")}`;
};

// export const formatTime = (time: string): string => {
//   const [hour, minute] = time.split(" - ")[0].split(":");
//   return `${hour.padStart(2, "0")}:${minute.padStart(2, "0")}:00`;
// };

// Function to format time as HH:MM
export const formatTime = (time: string): string => {
  const [hours, minutes] = time.split(":");
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
    2,
    "0"
  )}`;
};

export const getEndTime = (time: string): string => {
  const [endHour, endMinute] = time.split(" - ")[1].split(":");
  return `${endHour.padStart(2, "0")}:${endMinute.padStart(2, "0")}:00`;
};

export const generateColor = (id: string) => {
  const hash = Array.from(id).reduce(
    (acc, char) => acc + char.charCodeAt(0),
    0
  );
  const hue = hash % 360;
  return `hsl(${hue}, 70%, 60%)`;
};

// Function to format date as dd-mm-yyyy
export const formatDateVN = (date: string): string => {
  const dateObj = new Date(date);
  const day = String(dateObj.getDate()).padStart(2, "0");
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const year = dateObj.getFullYear();
  return `${day}-${month}-${year}`;
};
