/* eslint-disable @typescript-eslint/no-explicit-any */
import { testMachine } from '@bemedev/xunit';
import { assign } from '@xstate/immer';
import { StateMachine } from 'xstate';
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

let machine: StateMachine<any, any, any, any, any, any> =
  paymentMachine.withConfig({
    actions: {
      addVouchers: assign((context: any, resolve: any) => {
        context.paymentVouchers.push(...resolve.data);
      }),
    },
    services: {
      addVouchers: async (context, { data }) => {
        //TODO: create Vouchers service as machine with final
        if (context.vouchers.length === 0) {
          throw new Error('No vouchers');
        }
        if (data.length === 0) {
          throw new Error('No vouchers to add');
        }
        const contains = data.every(v1 =>
          context.vouchers.map(v2 => v2.id).contains(v1),
        );
        if (!contains) {
          throw new Error('Vouchers not found');
        }
        return usersVouchers;
      },
    },
  } as any) as any;

describe('Vouchers', () => {
  describe('No user Vouchers, => error', () => {
    beforeAll(() => {
      machine = machine.withConfig({
        services: {
          addVouchers: (context, event) => {
            return Promise.resolve<Voucher[]>(usersVouchers);
          },
        },
      });
    });
    testMachine({
      machine,
      events: [{ event: 'ADD_VOUCHERS' }],
      async: true,
      history: [
        {
          currentContext: DEFAULT_PAYMENT_CONTEXT,
          currentState: {
            payment: {
              started: 'ready',
            },
          },
        },
        {
          currentContext: DEFAULT_PAYMENT_CONTEXT,
          currentState: 'payment.started.addingVouchers',
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
          started: 'ready',
        },
      },
      initialContext: {
        ...DEFAULT_PAYMENT_CONTEXT,
        vouchers: usersVouchers,
      },
    });
  });
});
