import http from "@/lib/http";
import { createPayment, createPaymentRes } from "@/types/payment";

const paymentApiRequest = {
  createPayment: (id: string, body: createPayment) =>
    http.post<createPaymentRes>(
      `/nurses/${id}/register-weekly-work-schedule`,
      body
    ),
};

export default paymentApiRequest;
