/* eslint-disable @typescript-eslint/no-explicit-any */
import { testMachine } from '@bemedev/xunit';
import { assign } from '@xstate/immer';
import { DEFAULT_PAYMENT_CONTEXT } from '../context';
import { paymentMachine } from '../machine';
import { Voucher } from '../types';

const usersVouchers = [
  {
    id: '1',
    value: 100,
  },
  {
    id: '2',
    value: 200,
  },
];

const machine = paymentMachine.withConfig({
  services: {
    getUserVouchers: () => Promise.resolve<Voucher[]>(usersVouchers),
  },
  actions: {
    assignVouchers: assign((context: any, resolve: any) => {
      context.vouchers.push(...resolve.data);
    }),
  },
} as any);

describe('Vouchers', () => {
  describe('Assign the vouchers', () => {
    testMachine({
      machine,
      events: [{ event: 'START' }],
      async: true,
      history: [
        {
          currentContext: DEFAULT_PAYMENT_CONTEXT,
          currentState: {
            payment: {
              started: 'idle',
            },
          },
        },
        {
          currentContext: DEFAULT_PAYMENT_CONTEXT,
          currentState: 'payment.started.gettingUserVouchers',
        },
        {
          currentContext: {
            ...DEFAULT_PAYMENT_CONTEXT,
            vouchers: usersVouchers,
          },
          currentState: 'payment.started.ready',
        },
      ],
      initialState: {
        payment: {
          started: 'idle',
        },
      },
    });
  });
});
