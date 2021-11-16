import * as React from 'react';

import {
  AcceptHostedTransactionResponse,
  AcceptHostedIFrameIntegrationProps,
} from '../../types';
import { parseQueryString } from './helpers';
import {
  authorizeNetPopupScreenStyle,
  authorizeNetPopupBottomStyle,
  authorizeNetPopupCloseLinkStyle,
  authorizeNetPopupCloseStyle,
  authorizeNetPopupInnerStyle,
  authorizeNetPopupLogoStyle,
  authorizeNetPopupOuterStyle,
  authorizeNetPopupStyle,
  authorizeNetPopupTopStyle,
} from './styles';

const IFrameIntegration = ({
  formToken,
  postUrl,
  onTransactionResponse,
  onCancel,
  onSuccessfulSave,
  onResize,
}: AcceptHostedIFrameIntegrationProps) => {
  const [popupIsShown, setPopupIsShown] = React.useState(false);
  const popupFormRef = React.useRef<HTMLFormElement>(null);
  const popupRef = React.useRef<HTMLDivElement>(null);
  const iFrameRef = React.useRef<HTMLIFrameElement>(null);

  const handleShowPopup = () => {
    setPopupIsShown(true);
  };

  const handleClosePopup = () => {
    setPopupIsShown(false);
  };

  const centerPopup = () => {
    if (popupRef.current) {
      popupRef.current.style.left = '50%';
      popupRef.current.style.top = '50%';
      const left = -Math.floor(popupRef.current.clientWidth / 2);
      const top = -Math.floor(popupRef.current.clientHeight / 2);
      popupRef.current.style.marginLeft = `${left.toString()}px`;
      popupRef.current.style.marginTop = `${top.toString()}px`;
      popupRef.current.style.zIndex = '2';
      if (popupRef.current.offsetLeft < 16) {
        popupRef.current.style.left = '16px';
        popupRef.current.style.marginLeft = '0px';
      }
      if (popupRef.current.offsetTop < 16) {
        popupRef.current.style.top = '16px';
        popupRef.current.style.marginTop = '0px';
      }
    }
  };

  React.useEffect(() => {
    if (popupIsShown) {
      centerPopup();
    }
  }, [popupIsShown]);

  React.useEffect(() => {
    if (!window.AuthorizeNetIFrame) {
      window.AuthorizeNetIFrame = {
        onReceiveCommunication: (querystr) => {
          const params = parseQueryString(querystr);
          switch (params['action']) {
            case 'successfulSave':
              if (onSuccessfulSave) onSuccessfulSave();
              handleClosePopup();
              break;
            case 'cancel':
              if (onCancel) onCancel();
              handleClosePopup();
              break;
            case 'transactResponse':
              const response = params['response'] as string;
              let parsedResponse: AcceptHostedTransactionResponse;
              if (response) {
                parsedResponse = JSON.parse(response);
                onTransactionResponse(parsedResponse);
              } else {
                console.error(
                  'Did not receive a transaction response despite receiving a transactResponse action!'
                );
              }
              handleClosePopup();
              break;
            case 'resizeWindow':
              const width = params['width'] as string;
              const height = params['height'] as string;
              if (width && height) {
                const w = parseInt(width);
                const h = parseInt(height);
                if (iFrameRef.current) {
                  iFrameRef.current.style.width = `${w.toString()}px`;
                  iFrameRef.current.style.height = `${h.toString()}px`;
                  centerPopup();
                }
                if (onResize) onResize(w, h);
              }
              break;
            default:
              break;
          }
        },
      };
    }
  });

  return (
    <div>
      <form
        method="post"
        action={postUrl}
        id="formAuthorizeNetPopup"
        name="formAuthorizeNetPopup"
        target="iframeAuthorizeNet"
        ref={popupFormRef}
        onSubmit={handleShowPopup}
      >
        <input type="hidden" id="popupToken" name="token" value={formToken} />
        <div>
          Trigger Accept Transaction
          <button disabled={popupIsShown}>Open AuthorizeNetPopup</button>
        </div>
      </form>
      <div
        id="divAuthorizeNetPopupScreen"
        style={{
          ...authorizeNetPopupScreenStyle,
          display: popupIsShown ? '' : 'none',
        }}
      />
      <div
        ref={popupRef}
        style={{
          ...authorizeNetPopupStyle,
          display: popupIsShown ? '' : 'none',
        }}
      >
        <div
          className="AuthorizeNetPopupOuter"
          style={authorizeNetPopupOuterStyle}
        >
          <div
            className="AuthorizeNetPopupTop"
            style={authorizeNetPopupTopStyle}
          >
            <div
              className="AuthorizeNetPopupClose"
              style={authorizeNetPopupCloseStyle}
            >
              <a
                onClick={handleClosePopup}
                title="Close"
                style={authorizeNetPopupCloseLinkStyle}
              >
                {' '}
              </a>
            </div>
          </div>
          <div
            className="AuthorizeNetPopupInner"
            style={authorizeNetPopupInnerStyle}
          >
            <iframe
              name="iframeAuthorizeNet"
              id="iframeAuthorizeNet"
              frameBorder="0"
              ref={iFrameRef}
            ></iframe>
          </div>
          <div
            className="AuthorizeNetPopupBottom"
            style={authorizeNetPopupBottomStyle}
          >
            <div
              className="AuthorizeNetPopupLogo"
              style={authorizeNetPopupLogoStyle}
              title="Powered by Authorize.net"
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IFrameIntegration;
