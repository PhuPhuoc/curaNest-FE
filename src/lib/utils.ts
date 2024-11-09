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

