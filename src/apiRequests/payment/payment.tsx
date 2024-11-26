import http from "@/lib/http";
import { createPayment, createPaymentRes } from "@/types/payment";

const paymentApiRequest = {
  createPayment: ( body: createPayment) =>
    http.post<createPaymentRes>(
      `/payments`,
      body
    ),
};

export default paymentApiRequest;