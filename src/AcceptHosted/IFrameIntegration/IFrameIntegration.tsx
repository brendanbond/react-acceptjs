import React from 'react';

import {
  AcceptHostedTransactionResponse,
  AcceptHostedIFrameIntegrationProps,
  CompoundComponentCommonProps,
  CompoundComponentWithChildrenProps,
  IFrameIntegrationContext,
} from '../../types';
import { parseQueryString } from './helpers';
import { defaultBackdropStyle, defaultContainerStyle } from './styles';
import useWindowSize from '../../hooks/useWindowSize';

const IFrameIntegrationContext =
  React.createContext<IFrameIntegrationContext | null>(null);

export const useIFrameIntegrationContext = () => {
  const context = React.useContext(IFrameIntegrationContext);
  if (!context) {
    throw new Error(
      `AcceptHosted compound components cannot be rendered outside the AcceptHosted component`
    );
  }
  return context;
};

export const IFrameIntegration = ({
  formToken,
  postUrl,
  onTransactionResponse,
  onCancel,
  onSuccessfulSave,
  onResize,
  children,
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

  const contextValue = {
    popupIsShown,
    popupFormRef,
    popupRef,
    iFrameRef,
    formToken,
    postUrl,
    handleShowPopup,
    handleClosePopup,
  };

  // const centerPopup = () => {
  //   if (popupRef.current) {
  //     popupRef.current.style.left = '50%';
  //     popupRef.current.style.top = '50%';
  //     const left = -Math.floor(popupRef.current.clientWidth / 2);
  //     const top = -Math.floor(popupRef.current.clientHeight / 2);
  //     popupRef.current.style.marginLeft = `${left.toString()}px`;
  //     popupRef.current.style.marginTop = `${top.toString()}px`;
  //     popupRef.current.style.zIndex = '2';
  //     if (popupRef.current.offsetLeft < 16) {
  //       popupRef.current.style.left = '16px';
  //       popupRef.current.style.right = '16px';
  //       popupRef.current.style.marginLeft = '0px';
  //     }
  //     if (popupRef.current.offsetTop < 16) {
  //       popupRef.current.style.top = '16px';
  //       popupRef.current.style.marginTop = '0px';
  //     }
  //   }
  // };

  // React.useEffect(() => {
  //   if (popupIsShown) {
  //     centerPopup();
  //   }
  // }, [popupIsShown]);

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
                if (iFrameRef.current && popupRef.current) {
                  iFrameRef.current.style.width = '100%';
                  iFrameRef.current.style.height = `${h.toString()}px`;
                  popupRef.current.style.height = `${h.toString()}px`;
                  // centerPopup();
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
    <IFrameIntegrationContext.Provider value={contextValue}>
      {children}
    </IFrameIntegrationContext.Provider>
  );
};

export const IFrameIntegrationButton = ({
  children,
  className,
}: CompoundComponentWithChildrenProps) => {
  const { postUrl, handleShowPopup, formToken, popupIsShown } =
    useIFrameIntegrationContext();
  return (
    <form
      method="post"
      action={postUrl}
      id="formAuthorizeNetPopup"
      name="formAuthorizeNetPopup"
      target="iframeAuthorizeNet"
      onSubmit={handleShowPopup}
    >
      <input type="hidden" id="popupToken" name="token" value={formToken} />
      <button disabled={popupIsShown} className={className}>
        {children}
      </button>
    </form>
  );
};

export const IFrameContainer = ({
  children,
  className,
  style,
}: CompoundComponentWithChildrenProps) => {
  const { popupIsShown, popupRef } = useIFrameIntegrationContext();
  const windowSize = useWindowSize();
  const [offsetWidth, setOffsetWidth] = React.useState(0);
  const [offsetHeight, setOffsetHeight] = React.useState(0);

  // React.useEffect(() => {
  //   if (popupIsShown) {
  //     debugger;
  //   }
  // }, [popupIsShown]);

  React.useEffect(() => {
    setOffsetWidth(Math.floor((popupRef.current?.clientWidth || 0) / 2));
    setOffsetHeight(Math.floor((popupRef.current?.clientHeight || 0) / 2));
  }, [popupRef]);

  return (
    <div
      className={className}
      ref={popupRef}
      style={
        className
          ? { display: popupIsShown ? '' : 'none' }
          : {
              ...defaultContainerStyle,
              ...style,
              display: popupIsShown ? '' : 'none',
              width: windowSize.width
                ? windowSize.width > 576
                  ? '70%'
                  : '300px'
                : '300px',
              height: '90%',
              marginLeft: `-${offsetWidth}px`,
              marginTop: `-${offsetHeight}px`,
            }
      }
    >
      {children}
    </div>
  );
};

export const IFrameBackdrop = ({
  className,
  style,
}: CompoundComponentCommonProps) => {
  const { popupIsShown } = useIFrameIntegrationContext();

  return (
    <div
      className={className}
      style={
        className
          ? { display: popupIsShown ? '' : 'none' }
          : {
              ...defaultBackdropStyle,
              ...style,
              display: popupIsShown ? '' : 'none',
            }
      }
    />
  );
};

export const IFrame = ({ className, style }: CompoundComponentCommonProps) => {
  return (
    <iframe
      name="iframeAuthorizeNet"
      id="iframeAuthorizeNet"
      frameBorder="0"
      scrolling="no"
      width="100%"
      height="100%"
      className={className}
      style={className ? {} : style}
    ></iframe>
  );
};
