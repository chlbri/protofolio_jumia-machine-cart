// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  '@@xstate/typegen': true;
  eventsCausingActions: {
    assignVouchers: 'done.invoke.payment.started.gettingUserVouchers:invocation[0]';
    addVouchers: 'done.invoke.addVouchers';
    addError_AddingVouchers: 'error.platform.addVouchers';
    setVouchersValues: 'done.invoke.payment.started.vouchers.gettingVouchersValue:invocation[0]';
    assignVouchersErrors: 'error.platform.payment.started.vouchers.gettingVouchersValue:invocation[0]';
    updateParent:
      | 'error.platform.payment.started.vouchers.gettingVouchersValue:invocation[0]'
      | 'error.platform.confirmation:invocation[0]';
    assignVouchersUpdateErrors: 'error.platform.confirmation:invocation[0]';
    inc: 'xstate.init';
    calculateNewTotalWithVouchers: 'PAY.VOUCHER';
    computeVouchers: '';
    calculateRemainVouchers:
      | 'done.invoke.payment.started.processing.paypal:invocation[0]'
      | 'done.invoke.payment.started.processing.visa:invocation[0]'
      | 'NEXT'
      | 'done.invoke.payment.started.processing.orangeMoney:invocation[0]'
      | 'done.invoke.payment.started.processing.momo:invocation[0]'
      | 'done.invoke.payment.started.processing.otherPaymentMethod:invocation[0]'
      | '';
  };
  internalEvents: {
    'done.invoke.payment.started.gettingUserVouchers:invocation[0]': {
      type: 'done.invoke.payment.started.gettingUserVouchers:invocation[0]';
      data: unknown;
      __tip: 'See the XState TS docs to learn how to strongly type this.';
    };
    'done.invoke.addVouchers': {
      type: 'done.invoke.addVouchers';
      data: unknown;
      __tip: 'See the XState TS docs to learn how to strongly type this.';
    };
    'error.platform.addVouchers': {
      type: 'error.platform.addVouchers';
      data: unknown;
    };
    'done.invoke.payment.started.vouchers.gettingVouchersValue:invocation[0]': {
      type: 'done.invoke.payment.started.vouchers.gettingVouchersValue:invocation[0]';
      data: unknown;
      __tip: 'See the XState TS docs to learn how to strongly type this.';
    };
    'error.platform.payment.started.vouchers.gettingVouchersValue:invocation[0]': {
      type: 'error.platform.payment.started.vouchers.gettingVouchersValue:invocation[0]';
      data: unknown;
    };
    'error.platform.confirmation:invocation[0]': {
      type: 'error.platform.confirmation:invocation[0]';
      data: unknown;
    };
    '': { type: '' };
    'done.invoke.payment.started.processing.paypal:invocation[0]': {
      type: 'done.invoke.payment.started.processing.paypal:invocation[0]';
      data: unknown;
      __tip: 'See the XState TS docs to learn how to strongly type this.';
    };
    'done.invoke.payment.started.processing.visa:invocation[0]': {
      type: 'done.invoke.payment.started.processing.visa:invocation[0]';
      data: unknown;
      __tip: 'See the XState TS docs to learn how to strongly type this.';
    };
    'done.invoke.payment.started.processing.orangeMoney:invocation[0]': {
      type: 'done.invoke.payment.started.processing.orangeMoney:invocation[0]';
      data: unknown;
      __tip: 'See the XState TS docs to learn how to strongly type this.';
    };
    'done.invoke.payment.started.processing.momo:invocation[0]': {
      type: 'done.invoke.payment.started.processing.momo:invocation[0]';
      data: unknown;
      __tip: 'See the XState TS docs to learn how to strongly type this.';
    };
    'done.invoke.payment.started.processing.otherPaymentMethod:invocation[0]': {
      type: 'done.invoke.payment.started.processing.otherPaymentMethod:invocation[0]';
      data: unknown;
      __tip: 'See the XState TS docs to learn how to strongly type this.';
    };
    'done.invoke.payment.started.processing.gettingPrefferedPayment:invocation[0]': {
      type: 'done.invoke.payment.started.processing.gettingPrefferedPayment:invocation[0]';
      data: unknown;
      __tip: 'See the XState TS docs to learn how to strongly type this.';
    };
    'xstate.init': { type: 'xstate.init' };
  };
  invokeSrcNameMap: {
    getUserVouchers: 'done.invoke.payment.started.gettingUserVouchers:invocation[0]';
    addVouchers: 'done.invoke.addVouchers';
    getPrefferedPayment: 'done.invoke.payment.started.processing.gettingPrefferedPayment:invocation[0]';
    paypal: 'done.invoke.payment.started.processing.paypal:invocation[0]';
    visa: 'done.invoke.payment.started.processing.visa:invocation[0]';
    orangemoney: 'done.invoke.payment.started.processing.orangeMoney:invocation[0]';
    mtn: 'done.invoke.payment.started.processing.momo:invocation[0]';
    otherPaymentMethod: 'done.invoke.payment.started.processing.otherPaymentMethod:invocation[0]';
    getVouchersValue: 'done.invoke.payment.started.vouchers.gettingVouchersValue:invocation[0]';
    updateVouchers: 'done.invoke.confirmation:invocation[0]';
  };
  missingImplementations: {
    actions:
      | 'assignVouchers'
      | 'addVouchers'
      | 'addError_AddingVouchers'
      | 'setVouchersValues'
      | 'assignVouchersErrors'
      | 'updateParent'
      | 'assignVouchersUpdateErrors'
      | 'inc'
      | 'calculateNewTotalWithVouchers'
      | 'computeVouchers'
      | 'calculateRemainVouchers';
    services:
      | 'getUserVouchers'
      | 'addVouchers'
      | 'getPrefferedPayment'
      | 'orangemoney'
      | 'visa'
      | 'paypal'
      | 'mtn'
      | 'otherPaymentMethod'
      | 'updateVouchers'
      | 'getVouchersValue';
    guards:
      | 'hasVouchers'
      | 'isAtReception'
      | 'isOrangeMoney'
      | 'isVisa'
      | 'isPaypal'
      | 'isMomo'
      | 'isOther'
      | 'payZero';
    delays: never;
  };
  eventsCausingServices: {
    getUserVouchers: 'START';
    addVouchers: 'ADD_VOUCHERS';
    getPrefferedPayment: 'xstate.init';
    orangemoney:
      | 'done.invoke.payment.started.processing.gettingPrefferedPayment:invocation[0]'
      | 'PAY.OM';
    visa:
      | 'done.invoke.payment.started.processing.gettingPrefferedPayment:invocation[0]'
      | 'PAY.VISA';
    paypal:
      | 'done.invoke.payment.started.processing.gettingPrefferedPayment:invocation[0]'
      | 'PAY.PAYPAL';
    mtn:
      | 'done.invoke.payment.started.processing.gettingPrefferedPayment:invocation[0]'
      | 'PAY.MOMO';
    otherPaymentMethod:
      | 'done.invoke.payment.started.processing.gettingPrefferedPayment:invocation[0]'
      | 'PAY.OTHER';
    updateVouchers:
      | 'done.invoke.payment.started.processing.paypal:invocation[0]'
      | 'done.invoke.payment.started.processing.visa:invocation[0]'
      | 'NEXT'
      | 'done.invoke.payment.started.processing.orangeMoney:invocation[0]'
      | 'done.invoke.payment.started.processing.momo:invocation[0]'
      | 'done.invoke.payment.started.processing.otherPaymentMethod:invocation[0]'
      | '';
    getVouchersValue: 'xstate.init';
  };
  eventsCausingGuards: {
    allEnvironmentVariablesAreSet: '';
    hasVouchers: 'NEXT';
    isAtReception: 'done.invoke.payment.started.processing.gettingPrefferedPayment:invocation[0]';
    isOrangeMoney: 'done.invoke.payment.started.processing.gettingPrefferedPayment:invocation[0]';
    isVisa: 'done.invoke.payment.started.processing.gettingPrefferedPayment:invocation[0]';
    isPaypal: 'done.invoke.payment.started.processing.gettingPrefferedPayment:invocation[0]';
    isMomo: 'done.invoke.payment.started.processing.gettingPrefferedPayment:invocation[0]';
    isOther: 'done.invoke.payment.started.processing.gettingPrefferedPayment:invocation[0]';
    payZero: '';
  };
  eventsCausingDelays: {};
  matchesStates:
    | 'idle'
    | 'checkingEnvironmentVariables'
    | 'started'
    | 'started.idle'
    | 'started.gettingUserVouchers'
    | 'started.ready'
    | 'started.addingVouchers'
    | 'started.processing'
    | 'started.processing.gettingPrefferedPayment'
    | 'started.processing.unknownPreferences'
    | 'started.processing.paypal'
    | 'started.processing.visa'
    | 'started.processing.atReception'
    | 'started.processing.orangeMoney'
    | 'started.processing.momo'
    | 'started.processing.otherPaymentMethod'
    | 'started.vouchers'
    | 'started.vouchers.gettingVouchersValue'
    | 'started.vouchers.payment'
    | 'started.vouchers.calculatingNewTotalWithVoucher'
    | 'started.vouchers.checkingTotal'
    | 'started.vouchers.vouchers'
    | 'started.confimation'
    | 'started.final'
    | {
        started?:
          | 'idle'
          | 'gettingUserVouchers'
          | 'ready'
          | 'addingVouchers'
          | 'processing'
          | 'vouchers'
          | 'confimation'
          | 'final'
          | {
              processing?:
                | 'gettingPrefferedPayment'
                | 'unknownPreferences'
                | 'paypal'
                | 'visa'
                | 'atReception'
                | 'orangeMoney'
                | 'momo'
                | 'otherPaymentMethod';
              vouchers?:
                | 'gettingVouchersValue'
                | 'payment'
                | 'calculatingNewTotalWithVoucher'
                | 'checkingTotal'
                | 'vouchers';
            };
      };
  tags: never;
}
