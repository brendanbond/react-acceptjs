import { DispatchDataFn, HostedFormResponseHandlerFn } from './types';

declare global {
  interface Window {
    Accept: {
      dispatchData: DispatchDataFn;
    };
    responseHandler: HostedFormResponseHandlerFn;
  }
}
