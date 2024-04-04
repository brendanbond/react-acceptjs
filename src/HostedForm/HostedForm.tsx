import * as React from 'react';

import {
  HostedFormProps,
  HostedFormResponseHandlerFn,
  ErrorMessage,
} from '../types';
import useDynamicScript from '../hooks/useDynamicScript';

const HostedForm = ({
  authData,
  onSubmit,
  environment = 'SANDBOX',
  billingAddressOptions = { show: true, required: true },
  buttonText = 'Pay',
  formButtonText = 'Pay',
  formHeaderText = 'Pay',
  paymentOptions = { showCreditCard: true, showBankAccount: false },
  buttonStyle,
  buttonClassName,
  errorTextStyle,
  errorTextClassName,
  containerStyle,
  containerClassName,
  disabled,
}: HostedFormProps) => {
  const [loading, setLoading] = React.useState(true);
  const scriptUrl =
    environment === 'PRODUCTION'
      ? 'https://js.authorize.net/v3/AcceptUI.js'
      : 'https://jstest.authorize.net/v3/AcceptUI.js';
  const [scriptLoaded, scriptError] = useDynamicScript(scriptUrl);

  React.useEffect(() => {
    if (scriptLoaded || scriptError) {
      setLoading(false);
    }
  }, [scriptLoaded, scriptError]);
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
    [onSubmit]
  );

  React.useEffect(() => {
    if (!scriptError && !loading) {
      window.responseHandler = responseHandler;
    }
    if (scriptError)
      setErrors(
        'There was a problem loading the Accept.JS script. Please try again.'
      );
  }, [loading, scriptError, responseHandler]);

  return (
    <div
      style={containerStyle}
      className={containerClassName ? containerClassName : undefined}
    >
      <button
        type="button"
        style={buttonStyle}
        className={buttonClassName ? `AcceptUI ${buttonClassName}` : 'AcceptUI'}
        data-billingaddressoptions={JSON.stringify(billingAddressOptions)}
        data-apiloginid={authData.apiLoginID}
        data-clientkey={authData.clientKey}
        data-acceptuiformbtntxt={formButtonText}
        data-acceptuiformheadertxt={formHeaderText}
        data-paymentoptions={JSON.stringify(paymentOptions)}
        data-responsehandler="responseHandler"
        disabled={scriptError || loading || disabled}
      >
        {buttonText}
      </button>

      {errors && (
        <div style={errorTextStyle} className={errorTextClassName ?? ''}>
          {typeof errors === 'string'
            ? errors
            : errors.map((error, index) => (
                <div key={`error-${index}`}>
                  `Error (${error.code}): ${error.text})`
                </div>
              ))}
        </div>
      )}
    </div>
  );
};

export default HostedForm;
