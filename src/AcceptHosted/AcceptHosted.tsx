import * as React from 'react';
import RedirectIntegration from './RedirectIntegration';
import IFrameIntegration from './IFrameIntegration';
import { AcceptHostedProps } from '../types';

const AcceptHosted = (props: AcceptHostedProps) => {
  const postUrl =
    props.environment === 'PRODUCTION'
      ? 'https://accept.authorize.net/payment/payment'
      : 'https://test.authorize.net/payment/payment';

  if (props.integration === 'redirect') {
    return (
      <RedirectIntegration
        formToken={props.formToken}
        postUrl={postUrl}
        buttonText={props.buttonText || 'Continue'}
      />
    );
  }
  if (props.integration === 'iframe') {
    return (
      <IFrameIntegration
        formToken={props.formToken}
        postUrl={postUrl}
        onTransactionResponse={props.onTransactionResponse}
        onCancel={props.onCancel}
        onResize={props.onResize}
        onSuccessfulSave={props.onSuccessfulSave}
      />
    );
  }
  return null;
};

export default AcceptHosted;
