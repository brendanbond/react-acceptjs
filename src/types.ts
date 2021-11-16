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
  cardCode?: string;
  zip?: string;
  fullName?: string;
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
  children: React.ReactNode;
  authData: AuthData;
  onSubmit: HostedFormResponseHandlerFn;
  environment?: AuthNetEnvironment;
  billingAddressOptions?: { show: boolean; required: boolean };
  buttonText?: string;
  formButtonText?: string;
  formHeaderText?: string;
  paymentOptions?: { showCreditCard: boolean; showBankAccount: boolean };
  buttonStyle?: React.CSSProperties;
  errorTextStyle?: React.CSSProperties;
  containerStyle?: React.CSSProperties;
  disabled?: boolean;
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

type AcceptHostedIFrameCallbackProps = {
  onTransactionResponse: (response: AcceptHostedTransactionResponse) => void;
  onCancel?: () => void;
  onSuccessfulSave?: () => void;
  onResize?: (width: number, height: number) => void;
};

type AcceptHostedCommonProps = {
  formToken: string;
  environment?: AuthNetEnvironment;
};

type AcceptHostedRedirectProps = AcceptHostedCommonProps & {
  integration: 'redirect';
  buttonText?: string;
};
type AcceptHostedIFrameProps = AcceptHostedCommonProps &
  AcceptHostedIFrameCallbackProps & {
    integration: 'iframe';
  };
export type AcceptHostedProps =
  | AcceptHostedRedirectProps
  | AcceptHostedIFrameProps;

type AcceptHostedCommonIntegrationProps = {
  formToken: string;
  postUrl: string;
};

export type AcceptHostedRedirectIntegrationProps =
  AcceptHostedCommonIntegrationProps & {
    buttonText: string;
  };

export type AcceptHostedIFrameIntegrationProps =
  AcceptHostedCommonIntegrationProps & AcceptHostedIFrameCallbackProps;

type Message = {
  code: string;
  text: string;
};

type AccountType =
  | 'Visa'
  | 'Mastercard'
  | 'Discover'
  | 'AmericanExpress'
  | 'DinersClub'
  | 'JCB'
  | 'eCheck';

export type AcceptHostedTransactionResponse = {
  refId?: string;
  messages: {
    resultCode: 'Ok' | 'Error';
    message: Message[];
  };
  transactionResponse: {
    responseCode: '1' | '2' | '3' | '4';
    authCode: string;
    avsResultCode:
      | 'A'
      | 'B'
      | 'E'
      | 'G'
      | 'N'
      | 'P'
      | 'R'
      | 'S'
      | 'U'
      | 'W'
      | 'X'
      | 'Y'
      | 'Z';
    cvvResultCode: 'M' | 'N' | 'P' | 'S' | 'U';
    cavvResultCode:
      | '0'
      | '1'
      | '2'
      | '3'
      | '4'
      | '5'
      | '6'
      | '7'
      | '8'
      | '9'
      | 'A'
      | 'B';
    transId: string;
    refTransID: string;
    transHash: string;
    testRequest: string;
    accountNumber: 'XXXX1111';
    accountType: AccountType;
    messages: { code: string; description: string }[];
    errors: {
      errorCode: string;
      errorText: string;
    }[];
    splitTenderPayments: {
      splitTenderPayment: {
        transId: string;
        responseCode: '1' | '2' | '3' | '4';
        responseToCustomer: string;
        authCode: string;
        accountNumber: string;
        accountType: AccountType;
      };
      requestAmount: string;
      approvedAmount: string;
      balanceOnCard: string;
    }[];
    userFields: {
      userField: {
        name: string;
        value: string;
      };
    }[];
    transHashSha2: string;
    SupplementalDataQualificationIndicator: number;
    networkTransId: string;
  };
  profileResponse: {
    messages: {
      resultCode: 'Ok' | 'Error';
      message: Message[];
    };
    customerProfileId: string;
    customerPaymentProfileIdList: {
      numericString: string;
    };
    customerShippingProfileIdList: {
      numericString: string;
    };
  };
};
