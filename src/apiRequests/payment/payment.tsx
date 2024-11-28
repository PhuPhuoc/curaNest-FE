import http from "@/lib/http";
import {
  createPayment,
  createPaymentRes,
  WalletTransactionRes,
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
  getWalletTransaction: (id: string) =>
    http.get<WalletTransactionRes>(`/payments/${id}/wallet-transactions
`),
};

export default paymentApiRequest;
