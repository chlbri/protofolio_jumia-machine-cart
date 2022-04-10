import { createMachine } from 'xstate';

export const machine = createMachine({
  initial: 'idle',
  states: {
    idle: {
      on: {
        START: {
          target: 'checkingEnvironmentVariables',
        },
      },
    },
    checkingEnvironmentVariables: {
      id: 'checkingEnvironmentVariables',
      after: {
        '10': {
          cond: 'allEnvironmentVariablesAreSet',
          target: 'starting',
        },
      },
    },
    starting: {
      after: {
        '10': {
          target: 'started',
        },
      },
    },
    started: {
      initial: 'provisionning',
      states: {
        delivery: {
          id: 'delivery',
          initial: 'idle',
          states: {
            shippingEstimation: {
              invoke: {
                src: 'shipEstimation',
                id: 'shipEstimation',
                onDone: [
                  {
                    actions: 'assignShipCost',
                    target: 'readyForNext',
                  },
                ],
              },
            },
            readyForNext: {
              on: {
                NEXT: {
                  target: '#cart.started.payment',
                },
              },
            },
            validatingAddress: {
              invoke: {
                src: 'validateShippingAddress',
                onDone: [
                  {
                    target: 'shippingEstimation',
                  },
                ],
                onError: [
                  {
                    actions: 'assignErrorNotValidAddress',
                    target: '#cart.started.provisionning.provisionned',
                  },
                ],
              },
            },
            idle: {
              on: {
                ASSIGN_ADRESS: {
                  target: 'validatingAddress',
                },
              },
            },
          },
        },
        payment: {
          entry: 'startPaymentMachine',
          invoke: {
            src: 'payment',
            id: 'payment',
            onDone: 'confirmation',
          },
          initial: 'busy',
          states: {
            busy: {
              after: {
                200: 'notBusy',
              },
            },
            notBusy: {},
            processingVouchers: {
              after: {
                100: 'notBusy',
              },
            },
          },
          on: {
            'PAYMENT.NEXT': {
              actions: 'sendNextToPaymentMachine',
            },
            'PAYMENT.PAY.RECEPTION': {
              actions: 'sendVouchersToPaymentMachine',
              target: '.busy',
            },
            'PAYMENT.PAY.PAYPAL': {
              actions: 'sendPaypalToPaymentMachine',
              target: '.busy',
            },
            'PAYMENT.PAY.VISA': {
              actions: 'sendVisaToPaymentMachine',
              target: '.busy',
            },
            'PAYMENT.PAY.MOMO': {
              actions: 'sendMomoToPaymentMachine',
            },
            'PAYMENT.PAY.OM': {
              actions: 'sendOMToPaymentMachine',
            },
            'PAYMENT.PAY.OTHER': {
              actions: 'sendOtherToPaymentMachine',
            },
            'PAYMENT.PAY.VOUCHER': {
              actions: 'sendVoucherPayToPaymentMachine',
            },
            ABORT: {
              target: '#delivery',
              actions: 'abortPayment',
            },
          },
        },
        provisionning: {
          initial: 'notProvisionned',
          states: {
            notProvisionned: {
              on: {
                ADD_ARTICLES: {
                  actions: 'addArticles',
                  target: 'provisionning',
                },
              },
            },
            provisionning: {
              after: {
                '20': {
                  target: 'provisionned',
                },
              },
            },
            provisionned: {
              on: {
                NEXT: {
                  cond: 'cardIsNotEmpty',
                  target: '#cart.started.delivery',
                },
                ADD_ARTICLES: {
                  actions: 'addArticles',
                  target: 'provisionning',
                },
              },
            },
          },
        },
        confirmation: {
          id: 'confirmation',
          initial: 'articles',
          states: {
            articles: {
              entry: 'sendArticlesToShipping',
              exit: 'inc',
              always: {
                target: 'command',
              },
            },
            command: {
              entry: 'registerCommand',
              exit: 'inc',
              always: {
                target: '#final',
              },
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
  id: 'cart',
});
