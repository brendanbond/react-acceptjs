# react-acceptjs

> A lightweight modern React implementation of Authorize.net&#x27;s [Accept.JS library](https://developer.authorize.net/api/reference/features/acceptjs.html) for easily submitting payments to the Authorize.net platform.

[![NPM](https://img.shields.io/npm/v/react-acceptjs.svg)](https://www.npmjs.com/package/react-acceptjs) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
# install with npm
npm install --save react-acceptjs

# install with yarn
yarn add react-acceptjs
```

## Getting Started

Per Authorize.net's [Accept.js documentation](https://developer.authorize.net/api/reference/features/acceptjs.html), there are three options for sending secure payment data to the Authorize.net platform (rather than transmitting sensitive credit card data to your server). You can follow along by building and running the example app located in the `example` directory.

**Please note that Accept.js and Authorize.net require an HTTPS connection.**

1. Host your own payment form and use the `dispatchData()` function exposed by the `useAcceptJs()` hook. This function returns a payment nonce which can be used by your server to process a payment in place of CC or bank account data.

   ```tsx
   import { useAcceptJs } from 'react-acceptjs';

   const authData = {
     apiLoginID: 'YOUR AUTHORIZE.NET API LOGIN ID',
     clientKey: 'YOUR AUTHORIZE.NET PUBLIC CLIENT KEY',
   };

   type BasicCardInfo = {
     cardNumber: string;
     cardCode: string;
     month: string;
     year: string;
   };

   const App = () => {
     const { dispatchData, loading, error } = useAcceptJs({ authData });
     const [cardData, setCardData] = React.useState<BasicCardInfo>({
       cardNumber: '',
       month: '',
       year: '',
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
           name="month"
           value={cardData.month}
           onChange={(event) =>
             setCardData({ ...cardData, month: event.target.value })
           }
         />
         <input
           type="text"
           name="year"
           value={cardData.year}
           onChange={(event) =>
             setCardData({ ...cardData, year: event.target.value })
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

   export default App;
   ```

2. Embed the hosted, mobile-optimized payment information form provided by Accept.js into your page via the `HostedForm` component. This component renders a button which, when clicked, will trigger a lightbox modal containing the hosted Accept.js form. You'll still receive the payment nonce for use on your server similar to option #1.

   ```tsx
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

   export default App;
   ```

3. Use [Accept Hosted](https://developer.authorize.net/api/reference/features/accept_hosted.html), Authorize.net's fully hosted payment solution that you can redirect your customers to or embed as an iFrame within your page. First, your server will make a request to the [`getHostedPaymentPageRequest`](https://developer.authorize.net/api/reference/index.html#accept-suite-get-an-accept-payment-page) API and receive a form token in return. Next, you'll pass this form token to the `<AcceptHosted />` component. Rather than return a payment nonce for use on your server, Authorize.net will handle the entire transaction process based on options you specify in the `getHostedPaymentPageRequest` API call and return a response indicating success or failure and transaction information.

   1. Redirect your customers to the Accept Hosted form:

      ```tsx
      import { AcceptHosted } from 'react-acceptjs';

      const App = ({ formToken }: { formToken: string | null }) => {
        return formToken ? (
          <AcceptHosted formToken={formToken} integration="redirect">
            Continue to Redirect
          </AcceptHosted>
        ) : (
          <div>
            You must have a form token. Have you made a call to the
            getHostedPaymentPageRequestAPI?
          </div>
        );
      };

      export default App;
      ```

   2. Embed the Accept Hosted form as in iFrame lightbox modal:

      1. You'll need to host an JavaScript page that can receive messages from the Accept Hosted iFrame on the same domain as your app with the code below. You should pass this URL as the `hostedPaymentIFrameCommunicatorUrl` option in the `getHostedPaymentPageRequest` request you make to receive your form token. For example, in a React app created with [Create-React-App](https://github.com/facebook/create-react-app), you could put this file into the `public/` directory in order to be accessible to Accept Hosted, or place the `<script />` tag directly into the `public/index.html` file. Just be sure that the URL that you pass to `getHostedPaymentPageRequest` matches where this script is hosted.

         ```html
         <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
         <html xmlns="http://www.w3.org/1999/xhtml">
           <head>
             <title>Iframe Communicator</title>
             <script type="text/javascript">
               //<![CDATA[
               function callParentFunction(str) {
                 if (
                   str &&
                   str.length > 0 &&
                   window.parent &&
                   window.parent.parent &&
                   window.parent.parent.AuthorizeNetIFrame &&
                   window.parent.parent.AuthorizeNetIFrame
                     .onReceiveCommunication
                 ) {
                   // Errors indicate a mismatch in domain between the page containing the iframe and this page.
                   window.parent.parent.AuthorizeNetIFrame.onReceiveCommunication(
                     str
                   );
                 }
               }

               function receiveMessage(event) {
                 if (event && event.data) {
                   callParentFunction(event.data);
                 }
               }

               if (window.addEventListener) {
                 window.addEventListener('message', receiveMessage, false);
               } else if (window.attachEvent) {
                 window.attachEvent('onmessage', receiveMessage);
               }

               if (window.location.hash && window.location.hash.length > 1) {
                 callParentFunction(window.location.hash.substring(1));
               }
               //]]/>
             </script>
             <meta name="robots" content="noindex,nofollow" />
           <body></body>
         </html>
         ```

      2. Now you can use the `<AcceptHosted />` component.

         ```tsx
         const App = ({ formToken }: { formToken: string | null }) => {
           return formToken ? (
             <AcceptHosted
               formToken={formToken}
               integration="iframe"
               onTransactionResponse={(response) =>
                 setResponse(JSON.stringify(response, null, 2) + '\n')
               }
             >
               <AcceptHosted.Button className="btn btn-primary">
                 Continue to IFrame
               </AcceptHosted.Button>
               <AcceptHosted.IFrameBackdrop />
               <AcceptHosted.IFrameContainer>
                 <AcceptHosted.IFrame />
               </AcceptHosted.IFrameContainer>
             </AcceptHosted>
           ) : (
             <div>
               You must have a form token. Have you made a call to the
               getHostedPaymentPageRequestAPI?
             </div>
           );
         };

         export default App;
         ```

      3. A note on styling: a goal of this library is to invert control of the UI to the developer. Each of the `<AcceptHosted />` compound compontents (`<Button />`, `<IFrameBackdrop />`, `<IFrameContainer />`, and `<IFrame />`) have both `className` and `style` object props, allowing the default styles to be overridden. _At this moment, this is not recommended._

## API Reference

### Hook

```ts
const { dispatchData, loading, error } = useAcceptJs({ environment, authData });
```

**Description**

A React hook that loads the appropriate Accept.js script and exposes the `dispatchData()` function for retrieving a payment nonce for use on your server.

**Arguments:**

- <code><b>authData</b> : <em>{ clientKey: string; apiLoginId: string; }</em></code> - Required. Your Authorize.net client key and API login ID.
- <code><b>environment</b> : <em>'SANDBOX' | 'PRODUCTION'</em></code> - Optional, defaults to `'SANDBOX'`. Indicates whether you are running a sandbox or a production Authorize.net account.

**Return Value:**

- <code><b>dispatchData</b> : <em>(paymentData: { PaymentData }) => Promise\<DispatchDataResponse\></em></code> - Sends your payment form's payment information to Authorize.net in exchange for a payment nonce for use on your server. If you're transmitting credit card data, the `PaymentData` type will consist of:

```ts
type PaymentData = {
  cardData: {
    cardNumber: string;
    month: string;
    year: string;
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

### Components

**&lt;HostedForm /&gt;**

```tsx
<HostedForm authData={authData} onSubmit={handleSubmit} />
```

**Description**

A React component that loads the appropriate Accept.js script and renders a button that will trigger a hosted PCI-DSS SAQ A compliant form that, when submitted, will return a payment nonce for use on your server.

**Props**

- <code><b>authData</b> : <em>{ clientKey: string; apiLoginId: string; }</em></code> - Required. Your Authorize.net client key and API login ID.
- <code><b>onSubmit</b> : <em>(response: HostedFormDispatchDataFnResponse) => void</em></code> - Required. The function that will receive and handle the response from Authorize.net (which, if successful, will include the payment nonce as well as certain encrypted CC information).
- <code><b>environment</b> : <em>'SANDBOX' | 'PRODUCTION'</em></code> - Optional, defaults to `'SANDBOX'`. Indicates whether you're running a sandbox or production Authorize.net account.
- <code><b>billingAddressOptions</b> : <em>{ show: boolean; required: boolean }</em></code> - Optional, defaults to `{ show: true, required: true }`. Indicates whether the hosted form will display and/or require billing information.
- <code><b>buttonText</b> : <em>string</em></code> - Optional, defaults to `"Pay"`. The text that will appear on the button rendered by the component.
- <code><b>formButtonText</b> : <em>string</em></code> - Optional, defaults to `"Pay"`. The text that will appear on the hosted payment form's submit button.
- <code><b>formHeaderText</b> : <em>string</em></code> - Optional, defaults to `"Pay"`. The text that will appear as a header on the hosted payment form.
- <code><b>paymentOptions</b> : <em>{ showCreditCard: boolean, showBankAccount: boolean }</em></code> - Optional, defaults to `{ showCreditCard: true, showBankAccount: false }`. What payment options the hosted form will provide.
- <code><b>buttonStyle</b> : <em>React.CSSProperties</em></code> - Optional, defaults to `undefined`. A style object for the payment button.
- <code><b>errorTextStyle</b> : <em>React.CSSProperties</em></code> - Optional, defaults to `undefined`. A style object for the error text that displays under the payment button on error.
- <code><b>containerStyle</b> : <em>React.CSSProperties</em></code> - Optional, defaults to `undefined`. A style object for the `\<div /\>` that contains the rendered button and error text.

**&lt;AcceptHosted /&gt;**

```tsx
<AcceptHosted formToken={formToken} integraton="redirect">
  {children}
</AcceptHosted>
```

```tsx
<AcceptHosted
  formToken={formToken}
  integration="iframe"
  onTransactionResponse={handleTransactionResponse}
/>
```

**Description**

A React component that will render Authorize.net's fully hosted PCI-DSS SAQ A compliant payment solution. Can be rendered either as a redirect (i.e. the user clicks a button and is redirected to the form page) or as an embedded iFrame on your payment page.

**Props**

- <code><b>formToken</b> : <em>string</em></code> - Required. The form token returned by the Authorize.net `getHostedPaymentPageRequest` API. See above for details.
- <code><b>integration</b> : <em>'iframe' | 'redirect'</em></code> - Required. How the hosted payment form is rendered and displayed to the user (i.e. as a redirect or as an embedded iframe).
- <code><b>onTransactionResponse</b> : <em>(response: AcceptHostedTransactionResponse) => void;</em></code> - Required ("iframe" initegration). Callback function for a successful transaction response from Authorize.net. Please note that you must set <code>showReceipt</code> to false in the <code>hostedPaymentReturnOptions</code> of the <code>getHostedPaymentPageRequest</code> API call to receive a transaction response.
- <code><b>environment</b> : <em>'SANDBOX' | 'PRODUCTION'</em></code> - Optional, defaults to `'SANDBOX'`. Indicates whether you're running a sandbox or production Authorize.net account.
- <code><b>onCancel</b> : <em>() => void;</em></code> - Optional ("iframe" integration). Callback function for a user-initiated cancel event (i.e. the user clicks the "Cancel" button on the hosted form).
- <code><b>onSuccessfulSave</b> : <em>() => void</em></code> - Optional ("iframe" integration). For "iframe" integration only. Callback function for a "successful save," which may be deprecated as the Authorize.net documentation doesn't specify what this is.
- <code><b>onResize</b> : <em>(width: number, height: number) => void</em></code> - Optional ("iframe" integration). For "iframe" integration only. Callback function for a "resize" event, in which Authorize.net will suggest a new width and height for the embedded iFrame.
- <code><b>children</b> : <em>React.ReactNode</em></code> - Required ("redirect" integration). The content of the button that will trigger the redirect to the hosted payment form.
- <code><b>children</b> : <em>React.ReactNode</em></code> - Required ("iframe" integration). The content of the button that will trigger the iframe that contains the hosted payment form, as well as the components that style and layout the iframe lightbox (see below).

```tsx
<AcceptHosted.Button>
  Continue to IFrame
</AcceptHosted.Button>
<AcceptHosted.IFrameBackdrop />
<AcceptHosted.IFrameContainer>
  <AcceptHosted.IFrame />
</AcceptHosted.IFrameContainer>
```

**Description**

The compound components that control the layout/styling of the embedded iFrame. `<AcceptHosted.Button /`> will render the button that will trigger the lightbox modal, `<AcceptHosted.IFrameBackdrop />` will render the backdrop behind the lightbox, `<AcceptHosted.IFrameContainer />` wraps the iFrame content, and `<AcceptHosted.IFrame />` contains the iFrame itself. These components cannot be rendered outside of an `<AcceptHosted />` component.

## Alternatives

For a similar library with opinionated styles, check out [react-authorizenet](https://github.com/j-em/react-authorize-net).
## License

MIT © [brendanbond](https://github.com/brendanbond)
