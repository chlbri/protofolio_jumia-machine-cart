import { PaymentContext, Voucher } from './types';
export declare const paymentMachine: import("xstate").StateMachine<PaymentContext, any, import("xstate").AnyEventObject, {
    value: any;
    context: PaymentContext;
}, import("xstate").BaseActionObject, {
    getUserVouchers: {
        data: Voucher[];
    };
}, import("xstate").ResolveTypegenMeta<import("./machine.typegen").Typegen0, import("xstate").AnyEventObject, import("xstate").BaseActionObject, {
    getUserVouchers: {
        data: Voucher[];
    };
}>>;
export declare type PaymentMachine = typeof paymentMachine;
