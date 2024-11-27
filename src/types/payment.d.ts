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

export type WalletTransaction = {
  id: string;
  user_id: string;
  amount: number;
  type: 'deduction' | 'deposit'; 
  related_transaction_id: string | null;
  appointment_id: string | null;
  detail: string;
  created_at: string;  
};

export type WalletTransactionRes = {
  status: number;
  message: string;
  data: WalletTransaction[];
};
