import { useState, useEffect } from 'react';

import useScript from './useScript';
import {
  PaymentData,
  DispatchDataResponse,
  SecureData,
  AcceptJsHookConfig,
} from './types';

const useAcceptJs = ({
  environment = 'SANDBOX',
  authData,
}: AcceptJsHookConfig) => {
  const [loading, setLoading] = useState(true);
  const scriptUrl =
    environment === 'PRODUCTION'
      ? 'https://js.authorize.net/v1/Accept.js'
      : 'https://jstest.authorize.net/v1/Accept.js';
  const [scriptLoaded, scriptError] = useScript(scriptUrl);

  useEffect(() => {
    if (scriptLoaded || scriptError) {
      setLoading(false);
    }
  }, [scriptLoaded, scriptError]);

  const dispatchData = (paymentData: PaymentData) => {
    const payload: SecureData = paymentData.cardData
      ? { cardData: paymentData.cardData, authData }
      : { bankData: paymentData.bankData, authData };
    return new Promise<DispatchDataResponse>((resolve, reject) => {
      if (window) {
        window.Accept.dispatchData(
          payload,
          (response: DispatchDataResponse) => {
            if (response.messages.resultCode === 'Ok') {
              resolve(response);
            }
            reject(response);
          }
        );
      }
    });
  };
  return { dispatchData, loading, error: scriptError };
};

export default useAcceptJs;
