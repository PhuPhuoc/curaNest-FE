export type createPayment = {
  amount: number;
  user_id: string | null;
};

export type createPaymentRes = {
  status: number;
  message: string;
  data: {
    payment_url: string;
  };
};

export type walletAmountRes = {
  status: number;
  message: string;
  data: {
    wallet_amount: number;
  };
};

export type walletHistoryTransaction = {
  id: string;
  user_id: string;
  amount: number;
  type: string;
  related_transaction_id: string;
  appointment_id: string;
  detail: string;
  created_at: string;
};

export type walletHistoryTransactionRes = {
  status: number;
  message: string;
  data: walletHistoryTransaction[];
};
