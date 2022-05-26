// import 'dotenv/config';
import { createMachine } from 'xstate';
import { DEFAULT_PAYMENT_CONTEXT as context } from './context';
import { PaymentContext, Voucher } from './types';

const voidAsync = () => Promise.resolve({} as never);

export const paymentMachine = createMachine(
  {
    id: 'payment',
    initial: 'idle',
    context,
    schema: {
      context: {} as PaymentContext,
      services: {
        getUserVouchers: {
          data: {} as Voucher[],
        },
      },
    },
    tsTypes: {} as import('./machine.typegen').Typegen0,
    states: {
      idle: {
        on: {
          START: 'checkingEnvironmentVariables',
        },
      },
      checkingEnvironmentVariables: {
        always: {
          cond: 'allEnvironmentVariablesAreSet',
          target: 'started',
        },
      },
      started: {
        initial: 'idle',
        states: {
          idle: {
            id: 'idle',
            on: {
              START: 'gettingUserVouchers',
            },
          },
          gettingUserVouchers: {
            invoke: {
              src: 'getUserVouchers',
              onDone: {
                target: 'ready',
                actions: 'assignVouchers',
              },
              onError: 'ready',
            },
          },
          ready: {
            on: {
              ADD_VOUCHERS: 'addingVouchers',
              NEXT: [
                {
                  cond: 'hasVouchers',
                  target: 'vouchers',
                },
                'processing',
              ],
            },
          },
          addingVouchers: {
            invoke: {
              src: 'addVouchers',
              id: 'addVouchers',
              onDone: { target: 'ready', actions: 'addVouchers' },
              onError: {
                target: 'ready',
                actions: 'addError_AddingVouchers',
              },
            },
          },
          processing: {
            id: 'processing',
            initial: 'gettingPrefferedPayment',

            states: {
              gettingPrefferedPayment: {
                invoke: {
                  src: 'getPrefferedPayment',
                  onDone: [
                    { cond: 'isAtReception', target: 'atReception' },
                    { cond: 'isOrangeMoney', target: 'orangeMoney' },
                    { cond: 'isVisa', target: 'visa' },
                    { cond: 'isPaypal', target: 'paypal' },
                    { cond: 'isMomo', target: 'momo' },
                    { cond: 'isOther', target: 'otherPaymentMethod' },
                    { target: 'unknownPreferences' },
                  ],
                  onError: 'unknownPreferences',
                },
                exit: 'inc',
              },
              unknownPreferences: {
                on: {
                  'PAY.RECEPTION': {
                    target: 'atReception',
                  },
                  'PAY.PAYPAL': {
                    target: 'paypal',
                  },
                  'PAY.VISA': {
                    target: 'visa',
                  },
                  'PAY.MOMO': {
                    target: 'momo',
                  },
                  'PAY.OM': {
                    target: 'orangeMoney',
                  },
                  'PAY.OTHER': {
                    target: 'otherPaymentMethod',
                  },
                },
              },
              paypal: {
                invoke: {
                  src: 'paypal',
                  onDone: '#confirmation',
                },
                exit: 'inc',
              },
              visa: {
                invoke: {
                  src: 'visa',
                  onDone: '#confirmation',
                },
                exit: 'inc',
              },
              atReception: {
                on: {
                  NEXT: '#confirmation',
                },
                exit: 'inc',
              },
              orangeMoney: {
                invoke: {
                  src: 'orangemoney',
                  onDone: '#confirmation',
                },
                exit: 'inc',
              },
              momo: {
                exit: 'inc',
                invoke: {
                  src: 'mtn',
                  onDone: '#confirmation',
                },
              },
              otherPaymentMethod: {
                exit: 'inc',
                invoke: {
                  src: 'otherPaymentMethod',
                  onDone: '#confirmation',
                },
              },
            },
          },
          vouchers: {
            initial: 'gettingVouchersValue',
            states: {
              gettingVouchersValue: {
                invoke: {
                  src: 'getVouchersValue',
                  onDone: {
                    target: 'payment',
                    actions: 'setVouchersValues',
                  },
                  onError: {
                    actions: ['assignVouchersErrors', 'updateParent'],
                    target: '#idle',
                  },
                },
                exit: 'inc',
              },
              payment: {
                on: {
                  'PAY.VOUCHER': 'calculatingNewTotalWithVoucher',
                },
                exit: 'inc',
              },

              calculatingNewTotalWithVoucher: {
                entry: 'calculateNewTotalWithVouchers',
                always: {
                  target: 'vouchers',
                },
                exit: 'inc',
              },
              checkingTotal: {
                always: [
                  {
                    cond: 'payZero',
                    target: '#confirmation',
                  },
                  '#processing',
                ],
                exit: 'inc',
              },
              vouchers: {
                entry: 'computeVouchers',
                always: {
                  target: 'checkingTotal',
                },
                exit: 'inc',
              },
            },
          },
          confimation: {
            id: 'confirmation',
            entry: 'calculateRemainVouchers',
            invoke: {
              src: 'updateVouchers',
              onDone: '#final',
              onError: {
                actions: ['assignVouchersUpdateErrors', 'updateParent'],
                target: '#final',
              },
            },
          },
          final: {
            id: 'final',
            data: () => ({}),
            type: 'final',
          },
        },
      },
    },
  },
  {
    services: {},
    guards: {
      allEnvironmentVariablesAreSet: () => {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        require('dotenv').config();
        return process.env.PAYMENT_SECRET?.trim() !== '';
      },
    },
  },
);

export type PaymentMachine = typeof paymentMachine;
