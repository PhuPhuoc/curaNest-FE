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
