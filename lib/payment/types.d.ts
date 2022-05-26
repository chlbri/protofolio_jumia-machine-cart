export declare type Voucher = {
    id: string;
    value: number;
};
export declare type PaymentContext = {
    vouchers: Voucher[];
    paymentVouchers: Voucher[];
};
