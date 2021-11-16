import * as React from 'react';

import {
  HostedFormProps,
  HostedFormResponseHandlerFn,
  ErrorMessage,
} from './types';
import useAcceptJs from './hooks/useAcceptJs';

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
  errorTextStyle,
  containerStyle,
  disabled,
}: HostedFormProps) => {
  const { loading, error } = useAcceptJs({ authData, environment });
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
    if (!error && !loading && !window.responseHandler)
      window.responseHandler = responseHandler;
    if (error)
      setErrors(
        'There was a problem loading the Accept.JS script. Please try again.'
      );
  }, [loading, error, window.responseHandler]);

  return (
    <div style={containerStyle}>
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
        disabled={error || loading || disabled}
      >
        {buttonText}
      </button>

      {errors &&
        (typeof errors === 'string' ? (
          <div style={errorTextStyle}>{errors}</div>
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
