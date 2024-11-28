import http from "@/lib/http";
import {
  createPayment,
  createPaymentRes,
  walletAmountRes,
  walletHistoryTransactionRes,
} from "@/types/payment";

const paymentApiRequest = {
  createPayment: (body: createPayment) =>
    http.post<createPaymentRes>(`/payments`, body),
  getWallet: (id: string) =>
    http.get<walletAmountRes>(`/payments/current-wallet-amount/${id}`),
  getAddlWalletTransaction: () =>
    http.get<walletHistoryTransactionRes>(`/payments/admin/wallet-transactions`),
};

export default paymentApiRequest;
