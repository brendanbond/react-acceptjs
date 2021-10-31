import React from 'react';

export type AuthNetEnvironment = 'SANDBOX' | 'PRODUCTION';

export type AcceptJsHookConfig = {
  environment?: AuthNetEnvironment;
  authData: AuthData;
};
export type AuthData = {
  clientKey: string;
  apiLoginID: string;
};
export type CardData = {
  cardNumber: string;
  expMonth: string;
  expYear: string;
  cardCode: string;
};
export type BankData = {
  accountNumber: string;
  routingNumber: string;
  nameOnAccount: string;
  accountType: 'checking' | 'savings' | 'businessChecking';
};
export type PaymentDataWithCard = {
  cardData: CardData;
  bankData?: undefined;
};
export type PaymentDataWithBank = {
  cardData?: undefined;
  bankData: BankData;
};
export type PaymentData = PaymentDataWithCard | PaymentDataWithBank;
export type SecureData = { authData: AuthData } & PaymentData;

export type ErrorMessage = { code: string; text: string };
export type DispatchDataResponse = {
  opaqueData: {
    dataDescriptor: string;
    dataValue: string;
  };
  messages: {
    resultCode: 'Ok' | 'Error';
    message: ErrorMessage[];
  };
};

export type ResponseHandlerFn = (response: DispatchDataResponse) => void;

export type DispatchDataFn = (
  secureData: SecureData,
  responseHandler: ResponseHandlerFn
) => void;

export type HostedFormResponseHandlerFn = (
  response: HostedFormDispatchDataResponse
) => void;

export type HostedFormProps = {
  authData: AuthData;
  onSubmit: HostedFormResponseHandlerFn;
  environment?: AuthNetEnvironment;
  billingAddressOptions?: { show: boolean; required: boolean };
  formButtonText?: string;
  formHeaderText?: string;
  paymentOptions?: { showCreditCard: boolean; showBankAccount: boolean };
  buttonStyle?: React.CSSProperties;
  errorTextStyle?: React.CSSProperties;
};

export type HostedFormDispatchDataResponse = DispatchDataResponse & {
  encryptedCardData: {
    cardNumber: string;
    expDate: string;
    bin: string;
  };
  customerInformation: {
    firstName: string;
    lastName: string;
  };
};
