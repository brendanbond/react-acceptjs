import * as React from 'react';

import {
  HostedFormProps,
  HostedFormResponseHandlerFn,
  ErrorMessage,
} from './types';
import useScript from './useScript';

const HostedForm = ({
  environment = 'SANDBOX',
  authData,
  billingAddressOptions = { show: true, required: true },
  formButtonText = 'Pay',
  formHeaderText = 'Pay',
  paymentOptions = { showCreditCard: true, showBankAccount: false },
  onSubmit,
  buttonStyle,
  errorTextStyle,
}: HostedFormProps) => {
  const scriptUrl =
    environment === 'PRODUCTION'
      ? 'https://js.authorize.net/v3/AcceptUI.js'
      : 'https://jstest.authorize.net/v3/AcceptUI.js';
  const [scriptLoaded, scriptError] = useScript(scriptUrl);
  const [errors, setErrors] = React.useState<string | ErrorMessage[] | null>(
    null
  );

  const responseHandler: HostedFormResponseHandlerFn = React.useCallback(
    (response) => {
      if (response.messages.resultCode === 'Error') {
        setErrors(response.messages.message);
      } else {
        onSubmit(response);
      }
    },
    []
  );

  React.useEffect(() => {
    if (!scriptError && scriptLoaded && !window.responseHandler)
      window.responseHandler = responseHandler;
    if (scriptError)
      setErrors(
        'There was a problem loading the Accept.JS script. Please try again.'
      );
  }, [scriptLoaded, scriptError, window.responseHandler]);

  return (
    <div>
      <button
        type="button"
        style={buttonStyle}
        className="AcceptUI"
        data-billingaddressoptions={JSON.stringify(billingAddressOptions)}
        data-apiloginid={authData.apiLoginID}
        data-clientkey={authData.clientKey}
        data-acceptuiformbtntxt={formButtonText}
        data-acceptuiformheadertxt={formHeaderText}
        data-paymentoptions={JSON.stringify(paymentOptions)}
        data-responsehandler="responseHandler"
        disabled={scriptError || !scriptLoaded}
      >
        Pay
      </button>
      {errors &&
        (typeof errors === 'string' ? (
          <div>{errors}</div>
        ) : (
          (errors as ErrorMessage[]).map((error) => (
            <div
              style={errorTextStyle}
            >{`Error (${error.code}): ${error.text}`}</div>
          ))
        ))}
    </div>
  );
};

export default HostedForm;
