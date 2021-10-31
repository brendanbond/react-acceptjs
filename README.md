# react-acceptjs

> A modern React implementation of Authorize.net&#x27;s [Accept.JS library](https://developer.authorize.net/api/reference/features/acceptjs.html) for easily submitting payments to the Authorize.net platform.

[![NPM](https://img.shields.io/npm/v/react-acceptjs.svg)](https://www.npmjs.com/package/react-acceptjs) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
# install with npm
npm install --save react-acceptjs

# install with yarn
yarn add react-acceptjs
```

## Quick Start

Per Authorize.net's [Accept.js documentation](https://developer.authorize.net/api/reference/features/acceptjs.html), there are three options for sending secure payment data to the Authorize.net platform (rather than transmitting sensitive credit card data to your server).

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
  const handleSubmit = (response) => {
    console.log('Received response:', response);
  };
  return <HostedForm authData={authData} onSubmit={handleSubmit} />;
};
```

3. Use [Accept Hosted](https://developer.authorize.net/api/reference/features/accept_hosted.html), Authorize.net's fully hosted payment solution that you can redirect your customers to or embed as an iFrame within your page.

## API Reference

### Hook

```ts
const { dispatchData, loading, error } = useAcceptJs({ environment, authData });
```

**Arguments:**

- <code><b>authData</b> : <em>{ clientKey: string; apiLoginId: string; }</em></code> - Required. Your Authorize.net client key and API login ID.
- <code><b>environment</b> : <em>'SANDBOX' | 'PRODUCTION'</em></code> - Optional, defaults to `'SANDBOX'`. Indicates whether you are running a sandbox or a production Authorize.net account.

**Return Value:**

- <code><b>dispatchData</b> : <em>(paymentData: { PaymentData }) => Promise\<DispatchDataResponse\></em></code> - Sends your payment form's payment information to Authorize.net in exchange for a payment nonce for use on your server. If you're transmitting credit card data, the `PaymentData` type will consist of:

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

- <code><b>loading</b> : <em>boolean</em></code> - Indicates whether the Accept.js library is currently loading.
- <code><b>error</b> : <em>boolean</em></code> - Indicates whether an error has occured while loading the Accept.js library.

### Component

```tsx
<HostedForm authData={authData} onSubmit={handleSubmit} />
```

**Props**

- <code><b>authData</b> : <em>{ clientKey: string; apiLoginId: string; }</em></code> - Required. Your Authorize.net client key and API login ID.
- <code><b>onSubmit</b> : <em>(response: HostedFormDispatchDataFnResponse) => void</em></code> - Required. The function that will receive and handle the response from Authorize.net (which, if successful, will include the payment nonce as well as certain encrypted CC information).
- <code><b>environment</b> : <em>'SANDBOX' | 'PRODUCTION'</em></code> - Optional, defaults to `'SANDBOX'`. Indicates whether you're running a sandbox or production Authorize.net account.
- <code><b>billingAddressOptions</b> : <em>{ show: boolean; required: boolean }</em></code> - Optional, defaults to `{ show: true, required: true }`. Indicates whether the hosted form will display and/or require billing information.
- <code><b>formButtonText</b> : <em>string</em></code> - Optional, defaults to `"Pay"`. The text that the payment button will display.
- <code><b>formHeaderText</b> : <em>string</em></code> - Optional, defaults to `"Pay"`. The text that the hosted form will display as a header.
- <code><b>paymentOptions</b> : <em>{ showCreditCard: boolean, showBankAccount: boolean }</em></code> - Optional, defaults to `{ showCreditCard: true, showBankAccount: false }`. What payment options the hosted form will provide.
- <code><b>buttonStyle</b> : <em>React.CSSProperties</em></code> - Optional, defaults to `undefined`. A style object for the payment button.
- <code><b>errorTextStyle</b> : <em>React.CSSProperties</em></code> - Optional, defaults to `undefined`. A style object for the error text that displays under the payment button on error.

## License

MIT © [brendanbond](https://github.com/brendanbond)
