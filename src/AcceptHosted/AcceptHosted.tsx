import RedirectIntegration from './RedirectIntegration';
import {
  IFrameIntegration,
  IFrameIntegrationButton,
  IFrameContainer,
  IFrame,
  IFrameBackdrop,
} from './IFrameIntegration';
import { AcceptHostedProps, AcceptHostedComposition } from '../types';

const AcceptHosted: AcceptHostedComposition = (props: AcceptHostedProps) => {
  const postUrl =
    props.environment === 'PRODUCTION'
      ? 'https://accept.authorize.net/payment/payment'
      : 'https://test.authorize.net/payment/payment';

  if (props.integration === 'redirect') {
    return (
      <RedirectIntegration formToken={props.formToken} postUrl={postUrl}>
        {props.children}
      </RedirectIntegration>
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
      >
        {props.children}
      </IFrameIntegration>
    );
  }
  return null;
};

AcceptHosted.Button = IFrameIntegrationButton;
AcceptHosted.IFrameContainer = IFrameContainer;
AcceptHosted.IFrameBackdrop = IFrameBackdrop;
AcceptHosted.IFrame = IFrame;

export default AcceptHosted;
