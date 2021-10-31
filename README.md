# react-acceptjs

> A modern React implementation of Authorize.net&#x27;s Accept.JS library for easily submitting payments to the Authorize.net platform.

[![NPM](https://img.shields.io/npm/v/react-acceptjs.svg)](https://www.npmjs.com/package/react-acceptjs) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
# install with npm
npm install --save react-acceptjs

# install with yarn
yarn add react-acceptjs
```

## Quick Start

Per the Authorize.net's [Accept.js documentation](https://developer.authorize.net/api/reference/features/acceptjs.html), there are three options for sending secure payment data to the Authorize.net platform (rather than transmitting sensitive credit card data to your server) without interacting directly with the API.

1. Host your own payment form and use the `dispatchData()` function exposed by the `useAcceptJs()` hook. This function returns a payment nonce which can be used by your server to process a payment in place of CC or bank account data.

```tsx
import React from 'react';

import { useAcceptJs } from 'react-acceptjs';

const authData = {
  apiLoginID: 'YOUR AUTHORIZE.NET API LOGIN ID',
  clientKey: 'YOUR AUTHORIZE.NET PUBLIC CLIENT KEY',
};

interface BasicCardInfo {
  cardNumber: string;
  cardCode: string;
  expMonth: string;
  expYear: string;
}

const PaymentForm = () => {
  const { dispatchData, loading, error } = useAcceptJs({ authData });
  const [cardData, setCardData] = React.useState<BasicCardInfo>({
    cardNumber: '',
    expMonth: '',
    expYear: '',
    cardCode: '',
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Dispatch CC data to Authorize.net and receive payment nonce for use on your server
    const response = await dispatchData({ cardData });
    console.log('Received response:', response);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="cardNumber"
        value={cardData.cardNumber}
        onChange={(event) =>
          setCardData({ ...cardData, cardNumber: event.target.value })
        }
      />
      <input
        type="text"
        name="expMonth"
        value={cardData.expMonth}
        onChange={(event) =>
          setCardData({ ...cardData, expMonth: event.target.value })
        }
      />
      <input
        type="text"
        name="expYear"
        value={cardData.expYear}
        onChange={(event) =>
          setCardData({ ...cardData, expYear: event.target.value })
        }
      />
      <input
        type="text"
        name="cardCode"
        value={cardData.cardCode}
        onChange={(event) =>
          setCardData({ ...cardData, cardCode: event.target.value })
        }
      />
      <button type="submit" disabled={loading || error}>
        Pay
      </button>
    </form>
  );
};
```

2. Embed the hosted, mobile-optimized payment information form provided by Accept.js into your page via the `HostedForm` component. This component exposes a button which, when clicked, will trigger a lightbox modal containing the hosted Accept.js form. You'll still receive the payment nonce for use on your server similar to option #1.

```tsx
import React from 'react';

import { HostedForm } from 'react-acceptjs';

const authData = {
  apiLoginID: 'YOUR AUTHORIZE.NET API LOGIN ID',
  clientKey: 'YOUR AUTHORIZE.NET PUBLIC CLIENT KEY',
};

const App = () => {
  const handleSubmit = (opaqueData) => {
    console.log('Received response:', opaqueData);
  };
  return <HostedForm authData={authData} onSubmit={handleSubmit} />;
};
```

## API Reference

`const { dispatchData, loading, error } = useAcceptJs({ environment, authData });`

**Arguments:**

- authData : _{ clientKey: string; apiLoginId: string; } (required)_ - your Authorize.net client key and API login ID
- environment : _'SANDBOX' | 'PRODUCTION' (optional, defaults to 'SANDBOX')_ - whether you're running a sandbox or production Authorize.net account

**Return Value:**

- dispatchData : _(paymentData: { PaymentData }) => Promise<DispatchDataResponse>_ - the `dispatchData()` function sends your payment form's payment information to Authorize.net in exchange for a payment nonce for use on your server. If you're transmitting credit card data, the `PaymentData` type consists of:

```ts
type PaymentData = {
  cardData: {
    cardNumber: string;
    expMonth: string;
    expYear: string;
    cardCode: string;
  };
};
```

If you're transmitting bank account data, the `PaymentData` type will instead consist of:

```ts
type PaymentData = {
  bankData: {
    accountNumber: string;
    routingNumber: string;
    nameOnAccount: string;
    accountType: 'checking' | 'savings' | 'businessChecking';
  };
};
```

The `dispatchData()` function will return a value of type `DispatchDataResponse,` which will consist of either your payment nonce (referred to as `opaqueData`) for use in processing the transaction or an error message:

```ts
type DispatchDataResponse = {
  opaqueData: {
    dataDescriptor: string;
    dataValue: string;
  };
  messages: {
    resultCode: 'Ok' | 'Error';
    message: ErrorMessage[];
  };
};
```

- loading : _boolean_ - a boolean value that indicates whether the Accept.js library is currently loading
- error: _boolean_ - a boolean value that indicates whether an error has occured while loading the Accept.js library

`<HostedForm authData={authData} onSubmit={handleSubmit} />;`

**Props**

- authData : _{ clientKey: string; apiLoginId: string; } (required)_ - your Authorize.net client key and API login ID
- onSubmit: _(response: HostedFormDispatchDataFnResponse) => void (required)_ - the function that will receive and handle the response from Authorize.net (which, if successful, will include the payment nonce as well as certain encrypted CC information)
- environment : _'SANDBOX' | 'PRODUCTION' (optional, defaults to 'SANDBOX')_ - whether you're running a sandbox or production Authorize.net account
- billingAddressOptions : _{ show: boolean; required: boolean } (optional, defaults to {show: true, required: true})_ - what billing information the hosted form will display and require
- formButtonText : _string (optional, defaults to "Pay")_ - the text that the payment button will display
- formHeaderText : _string (optional, defaults to "Pay")_ - the text that the hosted form will display as a header
- paymentOptions : _{ showCreditCard: boolean, showBankAccount: boolean } (optional, defaults to { showCreditCard: true, showBankAccount: false })_ - what payment options the hosted form will provide
- buttonStyle : _React.CSSProperties (optional, defaults to null)_ - a style object for the payment button
- errorTextStyle : _React.CSSProperties (optional, defaults to null)_ - a style object for the error text that displays under the payment button on error

## License

MIT © [brendanbond](https://github.com/brendanbond)
