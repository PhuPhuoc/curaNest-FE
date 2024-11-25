export type createPayment = {
  value: number;
  info: string;
};

export type createPaymentRes = {
  status: number;
  message: string;
  data: createPayment;
};


