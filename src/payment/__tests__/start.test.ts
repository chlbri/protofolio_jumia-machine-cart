import { testMachine } from '@bemedev/xunit';
import { DEFAULT_PAYMENT_CONTEXT } from '../context';
import { paymentMachine } from '../machine';

describe('START', () => {
  describe('PAYMENT_SECRET is not defined', () => {
    beforeAll(() => {
      process.env.PAYMENT_SECRET = '';
    });
    testMachine({
      machine: paymentMachine,
      events: ['START'],
      history: [
        {
          currentContext: DEFAULT_PAYMENT_CONTEXT,
          currentState: 'payment.idle',
        },
        {
          currentContext: DEFAULT_PAYMENT_CONTEXT,
          currentState: 'payment.checkingEnvironmentVariables',
        },
      ],
    });
  });

  describe('PAYMENT_SECRET is defined', () => {
    beforeAll(() => {
      process.env.PAYMENT_SECRET = process.env.PAYMENT_SECRET || 'secret';
    });
    testMachine({
      machine: paymentMachine,
      events: ['START'],
      history: [
        {
          currentContext: DEFAULT_PAYMENT_CONTEXT,
          currentState: 'payment.idle',
        },
        {
          currentContext: DEFAULT_PAYMENT_CONTEXT,
          currentState: 'payment.checkingEnvironmentVariables',
        },
        {
          currentContext: DEFAULT_PAYMENT_CONTEXT,
          currentState: 'idle',
        },
      ],
    });
  });
});
