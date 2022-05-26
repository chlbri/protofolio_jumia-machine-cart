export type Voucher = {
  id: string;
  value: number;
};

export type PaymentContext = {
  vouchers: Voucher[];
  paymentVouchers: Voucher[];
};
