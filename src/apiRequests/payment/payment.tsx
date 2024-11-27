import http from "@/lib/http";
import {
  createPayment,
  createPaymentRes,
  WalletTransactionRes,
} from "@/types/payment";

const paymentApiRequest = {
  createPayment: (body: createPayment) =>
    http.post<createPaymentRes>(`/payments`, body),

  getWalletTransaction: (id: string) =>
    http.get<WalletTransactionRes>(`/payments/${id}/wallet-transactions
`),
};

export default paymentApiRequest;
