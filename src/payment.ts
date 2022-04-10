import { createMachine } from 'xstate';

export const payment = createMachine({
  id: 'payment',
  initial: 'idle',
  states: {
    idle: {
      on: {
        START: 'checkingEnvironmentVariables',
      },
    },
    checkingEnvironmentVariables: {
      entry: 'checkEnvironmentVariables',
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
            NEXT: [
              {
                cond: 'hasVouchers',
                target: 'vouchers',
              },
              {
                target: 'processing',
              },
            ],
          },
        },
        processing: {
          id: 'processing',
          initial: 'gettingPrefferedPayment',
          on: {
            'PAY.RECEPTION': {
              target: '.atReception',
            },
            'PAY.PAYPAL': {
              target: '.paypal',
            },
            'PAY.VISA': {
              target: '.visa',
            },
            'PAY.MOMO': {
              target: '.momo',
            },
            'PAY.OM': {
              target: '.orangeMoney',
            },
            'PAY.OTHER': {
              target: '.otherPaymentMethod',
            },
          },
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
                  { target: 'atReception' },
                ],
                onError: 'atReception',
              },
              exit: 'inc',
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
                  cond: 'totalIsZero',
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
});
